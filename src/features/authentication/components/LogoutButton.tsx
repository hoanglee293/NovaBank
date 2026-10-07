"use client";

import { useState } from "react";

import { useLogout } from "../hooks/useLogout";

export function LogoutButton() {
  const { logout } = useLogout();

  const [isLoading, setIsLoading] =
    useState(false);

  async function handleClick() {
    try {
      setIsLoading(true);

      await logout();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading
        ? "Logging out..."
        : "Logout"}
    </button>
  );
}