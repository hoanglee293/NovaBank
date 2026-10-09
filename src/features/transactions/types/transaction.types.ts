export type TransactionStatus =
  | "SUCCESS"
  | "PENDING"
  | "FAILED";

export interface Transaction {
  id: string;
  accountId: string;
  description: string;
  amount: number;
  currency: "VND";
  status: TransactionStatus;
  createdAt: string;
}