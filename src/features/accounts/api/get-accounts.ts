import { apiClient } from "@/services/api/client";

import type { BankAccount } from "@/features/accounts/types/account.types";

export async function getAccounts():
  Promise<BankAccount[]> {
  const response =
    await apiClient.get<
      BankAccount[]
    >("/accounts");

  return response.data;
}