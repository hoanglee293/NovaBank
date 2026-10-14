import { publicApiClient } from "@/services/api/public-client";
// import { apiClient } from "@/services/api/client";
import type {
  AuthResponse,
  VerifyOTPPayload,
} from "../types/auth.types";

export async function verifyOTP(
  payload: VerifyOTPPayload,
): Promise<AuthResponse> {
  const response =
    await publicApiClient.post<AuthResponse>(
      "/auth/verify-otp",
      payload,
    );

  return response.data;
}
