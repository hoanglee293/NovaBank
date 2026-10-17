
export interface TransferInput {
  sourceAccountId: string;
  destinationAccountId: string;
  amount: number;
  description: string;
}

export type TransferStatus =
  | "PENDING_OTP"
  | "PROCESSING"
  | "SUCCESS"
  | "FAILED"
  | "EXPIRED";

export interface TransferPreview extends TransferInput {
  currency: "VND";
  fee: number;
  totalDebit: number;
}

export interface TransferRecord extends TransferPreview {
  id: string;
  userId: string;
  status: TransferStatus;
  createdAt: string;
  expiresAt: string;
  completedAt?: string;
}

export interface InitiateTransferResponse {
  transfer: TransferRecord;
}

export interface ApiError {
  code: string;
  message: string;
}
