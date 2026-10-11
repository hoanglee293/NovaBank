"use client";

import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

import { getTransactions } from
  "../api/get-transactions";

import type { TransactionFilters } from
  "../types/transaction.types";

export function useTransactions(
  filters: TransactionFilters
) {
  return useQuery({
    queryKey: ["transactions", filters],
    queryFn: () => getTransactions(filters),
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    retry: 1,
  });
}