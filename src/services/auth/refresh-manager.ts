import { refreshSession } from "@/features/authentication/api/refresh-session";
import { tokenManager } from "@/services/auth/token-manager";

let refreshPromise:
  Promise<string> | null = null;

export function getNewAccessToken():
  Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshSession()
      .then((response) => {
        const newAccessToken =
          response.accessToken;

        tokenManager.setToken(
          newAccessToken,
        );

        return newAccessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}