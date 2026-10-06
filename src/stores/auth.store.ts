import { create } from "zustand";

import type { User } from "@/features/authentication/types/auth.types";

type AuthStatus =
  | "loading"
  | "authenticated"
  | "unauthenticated";

interface AuthState {
  user: User | null;

  status: AuthStatus;

  setUser: (user: User) => void;

  setLoading: () => void;

  clearAuth: () => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    user: null,

    status: "loading",

    setUser: (user) =>
      set({
        user,
        status: "authenticated",
      }),

    setLoading: () =>
      set({
        status: "loading",
      }),

    clearAuth: () =>
      set({
        user: null,
        status: "unauthenticated",
      }),
  }));