"use client";

import {
  useEffect,
  type ReactNode,
} from "react";

import { useRouter } from "next/navigation";

import { BankingSidebar } from
  "@/components/layout/BankingSidebar";

import { BankingHeader } from
  "@/components/layout/BankingHeader";

import { SessionManager } from
  "@/features/authentication/components/SessionManager";

import { useAuthStore } from
  "@/stores/auth.store";

interface Props {
  children: ReactNode;
}

export default function BankingLayout({
  children,
}: Props) {
  const router = useRouter();

  const status = useAuthStore(
    (state) => state.status
  );

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div>Checking session...</div>;
  }

  if (status !== "authenticated") {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <SessionManager />

      <BankingSidebar />

      <div className="min-w-0 flex-1">
        <BankingHeader />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}