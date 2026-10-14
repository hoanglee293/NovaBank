
"use client";

import { useMemo } from "react";

import { useAccounts } from
  "@/features/accounts/hooks/useAccounts";

import type { TransferFormValues } from
  "../schemas/transfer.schema";

import {
  formatCurrency,
  maskAccountNumber,
} from "../utils/transfer.utils";

interface TransferReviewProps {
  transfer: TransferFormValues;
  onBack: () => void;
  onConfirm: () => void;
  isSubmitting?: boolean;
}

export function TransferReview({
  transfer,
  onBack,
  onConfirm,
  isSubmitting = false,
}: TransferReviewProps) {
  const {
    data: accounts = [],
    isPending,
    isError,
  } = useAccounts();

  const sourceAccount = useMemo(
    () =>
      accounts.find(
        (account) =>
          account.id === transfer.sourceAccountId
      ),
    [accounts, transfer.sourceAccountId]
  );

  const destinationAccount = useMemo(
    () =>
      accounts.find(
        (account) =>
          account.id === transfer.destinationAccountId
      ),
    [accounts, transfer.destinationAccountId]
  );

  const transferFee = 0;
  const totalDebit = transfer.amount + transferFee;

  const insufficientBalance =
    !!sourceAccount &&
    totalDebit > sourceAccount.availableBalance;

  if (isPending) {
    return <p>Loading account information...</p>;
  }

  if (isError || !sourceAccount || !destinationAccount) {
    return (
      <div className="space-y-4">
        <p role="alert" className="text-red-600">
          Unable to verify account information.
        </p>

        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border px-4 py-2"
        >
          Back to Transfer Form
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-slate-500">
          Transfer Amount
        </p>

        <h2 className="mt-2 text-3xl font-bold">
          {formatCurrency(transfer.amount)}
        </h2>

        <p className="mt-2 text-sm text-green-600">
          No transfer fee
        </p>
      </div>

      <div className="space-y-4 rounded-xl bg-slate-50 p-5">
        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            From Account
          </span>

          <span className="text-right font-medium">
            {maskAccountNumber(
              sourceAccount.accountNumber
            )}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            To Account
          </span>

          <span className="text-right font-medium">
            {maskAccountNumber(
              destinationAccount.accountNumber
            )}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            Description
          </span>

          <span className="max-w-[60%] break-words text-right">
            {transfer.description || "—"}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-slate-500">
            Transfer Fee
          </span>

          <span>{formatCurrency(transferFee)}</span>
        </div>

        <hr />

        <div className="flex justify-between font-bold">
          <span>Total Debit</span>
          <span>{formatCurrency(totalDebit)}</span>
        </div>
      </div>

      {insufficientBalance && (
        <p role="alert" className="text-sm text-red-600">
          Insufficient available balance.
          Please edit your transfer.
        </p>
      )}

      <div className="space-y-3">
        <button
          type="button"
          disabled={isSubmitting || insufficientBalance}
          onClick={onConfirm}
          className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white disabled:opacity-50"
        >
          Confirm Transfer
        </button>

        <button
          type="button"
          disabled={isSubmitting}
          onClick={onBack}
          className="w-full rounded-lg border p-3"
        >
          Edit Details
        </button>
      </div>
    </div>
  );
}
