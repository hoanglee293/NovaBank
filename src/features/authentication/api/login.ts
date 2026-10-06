import { apiClient } from "@/services/api/client";

import type {
  LoginPayload,
  LoginResponse,
} from "../types/auth.types";

export async function login(
  payload: LoginPayload,
): Promise<LoginResponse> {
  const response =
    await apiClient.post<LoginResponse>(
      "/auth/login",
      payload,
    );

  return response.data;
}