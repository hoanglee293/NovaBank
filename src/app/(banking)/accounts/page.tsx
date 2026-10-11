"use client";

import Link from "next/link";

import { useAccounts } from
  "@/features/accounts/hooks/useAccounts";

export default function AccountsPage() {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = useAccounts();

  if (isPending) {
    return <p>Loading accounts...</p>;
  }

  if (isError) {
    return (
      <div role="alert">
        <p>Unable to load accounts.</p>
        <button onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        My Accounts
      </h1>

      {!data?.length && (
        <p>No accounts found.</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {data?.map((account) => (
          <Link
            key={account.id}
            href={`/accounts/${encodeURIComponent(account.id)}`}
            className="rounded-xl border bg-white p-6 transition hover:shadow-md"
          >
            <p className="text-sm text-slate-500">
              {account.type}
            </p>

            <h2 className="mt-2 text-xl font-semibold">
              {account.accountName}
            </h2>

            <p className="mt-3 text-sm">
              ****{account.accountNumber.slice(-4)}
            </p>

            <p className="mt-4 text-2xl font-bold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: account.currency,
              }).format(account.availableBalance)}
            </p>

            <span className="mt-3 inline-block text-blue-600">
              View details →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}