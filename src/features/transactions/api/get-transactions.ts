import { apiClient } from
  "@/services/api/client";

import type {
  Transaction,
  TransactionFilters,
  PaginatedResponse,
} from "../types/transaction.types";

export async function getTransactions(
  filters: TransactionFilters
): Promise<PaginatedResponse<Transaction>> {
  const { data } = await apiClient.get<
    PaginatedResponse<Transaction>
  >("/transactions", {
    params: filters,
  });

  return data;
}