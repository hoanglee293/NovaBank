"use client";

import { useQuery } from "@tanstack/react-query";

import { getTransactionDetail } from
  "../api/get-transaction-detail";

export function useTransactionDetail(
  transactionId: string
) {
  return useQuery({
    queryKey: ["transactions", "detail", transactionId],
    queryFn: () => getTransactionDetail(transactionId),
    enabled: Boolean(transactionId),
  });
}