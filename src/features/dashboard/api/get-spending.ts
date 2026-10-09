import { apiClient } from
  "@/services/api/client";

import type { SpendingItem } from
  "../types/dashboard.types";

export async function getSpending():
  Promise<SpendingItem[]> {
  const { data } =
    await apiClient.get<SpendingItem[]>(
      "/dashboard/spending"
    );

  return data;
}