import { publicApiClient } from "@/services/api/public-client";

import type {
  LoginPayload,
  LoginResponse,
} from "../types/auth.types";

export async function login(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const response =
    await publicApiClient.post<LoginResponse>(
      "/auth/login",
      payload,
    );

  return response.data;
}
