"use client";

import { useCallback } from "react";

import { useLogout } from "../hooks/useLogout";
import { useSessionTimeout } from "../hooks/useSessionTimeout";

const SESSION_TIMEOUT =
  15 * 60 * 1000;

export function SessionManager() {
  const { logout } = useLogout();

  const handleTimeout =
    useCallback(() => {
      void logout();
    }, [logout]);

  useSessionTimeout({
    timeout: SESSION_TIMEOUT,
    onTimeout: handleTimeout,
  });

  return null;
}