
import { randomUUID } from "node:crypto";

import type {
  TransferInput,
  TransferPreview,
  TransferRecord,
} from "@/features/transfers/types/transfer.types";

import { transferStore } from "./transfer-store";

export class TransferError extends Error {
  constructor(
    public code: string,
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "TransferError";
  }
}

function validateTransfer(
  input: TransferInput,
  userId: string
): TransferPreview {
  const source = transferStore.accounts.get(
    input.sourceAccountId
  );

  const destination = transferStore.accounts.get(
    input.destinationAccountId
  );

  if (!source || !destination) {
    throw new TransferError(
      "ACCOUNT_NOT_FOUND",
      404,
      "Account not found"
    );
  }

  if (
    source.ownerId !== userId ||
    destination.ownerId !== userId
  ) {
    throw new TransferError(
      "FORBIDDEN",
      403,
      "Account access denied"
    );
  }

  if (
    source.id === destination.id ||
    !Number.isSafeInteger(input.amount) ||
    input.amount <= 0 ||
    input.amount > 500_000_000
  ) {
    throw new TransferError(
      "INVALID_TRANSFER",
      400,
      "Invalid transfer details"
    );
  }

  const fee = 0;
  const totalDebit = input.amount + fee;

  if (source.balance < totalDebit) {
    throw new TransferError(
      "INSUFFICIENT_FUNDS",
      409,
      "Insufficient available balance"
    );
  }

  return {
    ...input,
    currency: "VND",
    fee,
    totalDebit,
  };
}

export function previewTransfer(
  input: TransferInput,
  userId: string
): TransferPreview {
  return validateTransfer(input, userId);
}

export function initiateTransfer(
  input: TransferInput,
  userId: string,
  idempotencyKey: string
): TransferRecord {
  const key = `${userId}:${idempotencyKey}`;

  const existingId = transferStore.idempotency.get(key);

  if (existingId) {
    const existing = transferStore.transfers.get(existingId);

    if (!existing) {
      throw new TransferError(
        "TRANSFER_NOT_FOUND",
        500,
        "Transfer record missing"
      );
    }

    const samePayload =
      existing.sourceAccountId === input.sourceAccountId &&
      existing.destinationAccountId === input.destinationAccountId &&
      existing.amount === input.amount &&
      existing.description === input.description;

    if (!samePayload) {
      throw new TransferError(
        "IDEMPOTENCY_CONFLICT",
        409,
        "Idempotency key used with different payload"
      );
    }

    return existing;
  }

  const preview = validateTransfer(input, userId);

  const now = Date.now();

  const transfer: TransferRecord = {
    ...preview,
    id: randomUUID(),
    userId,
    status: "PENDING_OTP",
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(
      now + 5 * 60 * 1000
    ).toISOString(),
  };

  transferStore.transfers.set(transfer.id, transfer);
  transferStore.idempotency.set(key, transfer.id);

  return transfer;
}

export function getTransferByKey(
  userId: string,
  idempotencyKey: string
): TransferRecord | null {
  const key = `${userId}:${idempotencyKey}`;

  const transferId = transferStore.idempotency.get(key);

  if (!transferId) return null;

  return transferStore.transfers.get(transferId) ?? null;
}
