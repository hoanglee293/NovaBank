import { apiClient } from
  "@/services/api/client";

import type { BankAccount } from
  "../types/account.types";

export async function getAccountDetail(
  accountId: string
): Promise<BankAccount> {
  const { data } = await apiClient.get<BankAccount>(
    `/accounts/${encodeURIComponent(accountId)}`
  );

  return data;
}