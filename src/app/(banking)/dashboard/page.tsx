"use client";

import dynamic from "next/dynamic";

import { AccountSummary } from
  "@/features/dashboard/components/AccountSummary";

import { RecentTransactions } from
  "@/features/dashboard/components/RecentTransactions";

const SpendingAnalytics = dynamic(
  () =>
    import(
      "@/features/dashboard/components/SpendingAnalytics"
    ).then((module) => module.SpendingAnalytics),
  {
    loading: () => (
      <div className="h-72 animate-pulse rounded-xl bg-slate-200" />
    ),
  }
);

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Banking Overview
        </h1>

        <p className="text-sm text-slate-500">
          Your financial overview
        </p>
      </div>

      <AccountSummary />

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentTransactions />

        <SpendingAnalytics />
      </div>
    </div>
  );
}