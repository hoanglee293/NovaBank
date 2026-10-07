import { publicApiClient } from "@/services/api/public-client";

import type { RefreshResponse } from "@/features/authentication/types/auth.types";

export async function refreshSession():
  Promise<RefreshResponse> {
  const response =
    await publicApiClient.post<RefreshResponse>(
      "/auth/refresh",
    );

  return response.data;
}