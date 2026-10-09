"use client";

import { useQuery } from
  "@tanstack/react-query";

import { getTransactions } from
  "../api/get-transactions";

export function useTransactions() {
  return useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
    staleTime: 30_000,
  });
}