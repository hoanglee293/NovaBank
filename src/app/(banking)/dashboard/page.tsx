"use client";

import { useAuthStore } from "@/stores/auth.store";

export default function DashboardPage() {
  const user =
    useAuthStore(
      (state) => state.user,
    );

  return (
    <main>
      <h1>NovaBank Dashboard</h1>

      <p>
        Welcome, {user?.fullName}
      </p>

      <p>
        Role: {user?.role}
      </p>
    </main>
  );
}