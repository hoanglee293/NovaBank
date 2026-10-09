import { apiClient } from
  "@/services/api/client";

import type { Transaction } from
  "../types/transaction.types";

export async function getTransactions():
  Promise<Transaction[]> {
  const { data } =
    await apiClient.get<Transaction[]>(
      "/transactions"
    );

  return data;
}