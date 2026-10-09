"use client";

import { useAccounts } from
  "@/features/accounts/hooks/useAccounts";

export function AccountSummary() {
  const {
    data: accounts,
    isPending,
    isError,
    refetch,
  } = useAccounts();

  if (isPending) {
    return (
      <div className="h-40 animate-pulse rounded-xl bg-slate-200" />
    );
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

  if (!accounts?.length) {
    return <p>No accounts found.</p>;
  }

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {accounts.map((account) => (
        <article
          key={account.id}
          className="rounded-xl border bg-white p-6 shadow-sm"
        >
          <p className="text-sm text-slate-500">
            {account.type} Account
          </p>

          <h3 className="mt-2 text-2xl font-bold">
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: account.currency,
            }).format(account.availableBalance)}
          </h3>

          <p className="mt-4 text-sm text-slate-500">
            Account: ****
            {account.accountNumber.slice(-4)}
          </p>
        </article>
      ))}
    </section>
  );
}