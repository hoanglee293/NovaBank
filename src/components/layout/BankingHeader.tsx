"use client";

import { LogoutButton } from
  "@/features/authentication/components/LogoutButton";

import { useAuthStore } from "@/stores/auth.store";

export function BankingHeader() {
  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Welcome back, {user?.fullName}
        </h2>

        <p className="text-sm text-slate-500">
          Manage your finances securely
        </p>
      </div>

      <LogoutButton />
    </header>
  );
}