import { publicApiClient } from "@/services/api/public-client";

export async function logout():
  Promise<void> {
  await publicApiClient.post(
    "/auth/logout",
  );
}