"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

import { getCurrentUser } from "@/features/authentication/api/get-current-user";
import { refreshSession } from "@/features/authentication/api/refresh-session";
import { tokenManager } from "@/services/auth/token-manager";
import { useAuthStore } from "@/stores/auth.store";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const initialized = useRef(false);

  const setUser =
    useAuthStore(
      (state) => state.setUser,
    );

  const clearAuth =
    useAuthStore(
      (state) => state.clearAuth,
    );

  useEffect(() => {
    // Prevent duplicate initialization
    // during development StrictMode.
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    async function initializeAuth() {
      try {
        // Browser automatically sends
        // HttpOnly refresh cookie.
        const refreshResponse =
          await refreshSession();

        tokenManager.setToken(
          refreshResponse.accessToken,
        );

        const user =
          await getCurrentUser();

        setUser(user);
      } catch {
        tokenManager.clearToken();

        clearAuth();
      }
    }

    void initializeAuth();
  }, [setUser, clearAuth]);

  return children;
}