
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
