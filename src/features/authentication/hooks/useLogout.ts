"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logout } from "@/features/authentication/api/logout";
import { tokenManager } from "@/services/auth/token-manager";
import { useAuthStore } from "@/stores/auth.store";

export function useLogout() {
  const router = useRouter();

  const queryClient =
    useQueryClient();

  const clearAuth =
    useAuthStore(
      (state) => state.clearAuth,
    );

  async function handleLogout() {
    try {
      await logout();
    } finally {
      tokenManager.clearToken();

      clearAuth();

      queryClient.clear();

      sessionStorage.removeItem(
        "challengeId",
      );

      router.replace("/login");
    }
  }

  return {
    logout: handleLogout,
  };
}