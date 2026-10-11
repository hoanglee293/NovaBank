import { apiClient } from
  "@/services/api/client";

import type { Transaction } from
  "../types/transaction.types";

export async function getTransactionDetail(
  transactionId: string
): Promise<Transaction> {
  const { data } = await apiClient.get<Transaction>(
    `/transactions/${encodeURIComponent(transactionId)}`
  );

  return data;
}