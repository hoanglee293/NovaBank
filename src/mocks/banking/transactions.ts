import type {
  Transaction,
  TransactionStatus,
} from "@/features/transactions/types/transaction.types";

const descriptions = [
  "Salary Payment",
  "Electricity Bill",
  "Online Shopping",
  "Bank Transfer",
  "Restaurant Payment",
  "Mobile Topup",
];

const statuses: TransactionStatus[] = [
  "SUCCESS",
  "SUCCESS",
  "SUCCESS",
  "PENDING",
  "FAILED",
];

export const mockTransactions: Transaction[] =
  Array.from({ length: 120 }, (_, index) => {
    const isCredit = index % 4 === 0;

    return {
      id: `txn_${String(index + 1).padStart(4, "0")}`,
      accountId: "account_001",
      description:
        descriptions[index % descriptions.length],
      amount: isCredit
        ? (index + 1) * 150000
        : -(index + 1) * 75000,
      currency: "VND",
      type: isCredit ? "CREDIT" : "DEBIT",
      status: statuses[index % statuses.length],
      createdAt: new Date(
        Date.UTC(2026, 9, 1) -
          index * 86400000
      ).toISOString(),
    };
  });