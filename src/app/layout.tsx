"use client";

import { useRouter } from "next/navigation";
import {
  useEffect,
  type ReactNode,
} from "react";

import { useAuthStore } from "@/stores/auth.store";

interface BankingLayoutProps {
  children: ReactNode;
}

export default function BankingLayout({
  children,
}: BankingLayoutProps) {
  const router = useRouter();

  const status =
    useAuthStore(
      (state) => state.status,
    );

  useEffect(() => {
    if (
      status === "unauthenticated"
    ) {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div>
        Checking session...
      </div>
    );
  }

  if (
    status === "unauthenticated"
  ) {
    return null;
  }

  return <>{children}</>;
}