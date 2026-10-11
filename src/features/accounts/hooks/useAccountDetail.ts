"use client";

import { useQuery } from "@tanstack/react-query";

import { getAccountDetail } from
  "../api/get-account-detail";

export function useAccountDetail(
  accountId: string
) {
  return useQuery({
    queryKey: ["accounts", "detail", accountId],
    queryFn: () => getAccountDetail(accountId),
    enabled: Boolean(accountId),
  });
}