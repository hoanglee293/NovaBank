export type AccountType =
  | "CHECKING"
  | "SAVINGS";

export type AccountStatus =
  | "ACTIVE"
  | "LOCKED"
  | "CLOSED";

export interface BankAccount {
  id: string;

  accountNumber: string;

  accountName: string;

  type: AccountType;

  balance: number;

  availableBalance: number;

  currency: "VND" | "USD";

  status: AccountStatus;
}