"use client";

import { useTransactions } from
  "@/features/transactions/hooks/useTransactions";

export function RecentTransactions() {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = useTransactions();

  if (isPending) {
    return <p>Loading transactions...</p>;
  }

  if (isError) {
    return (
      <div role="alert">
        <p>Failed to load transactions.</p>
        <button onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    );
  }

  if (!data?.length) {
    return <p>No transactions found.</p>;
  }

  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="mb-5 text-lg font-semibold">
        Recent Transactions
      </h2>

      <div className="space-y-4">
        {data.map((transaction) => (
          <div
            key={transaction.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div>
              <p className="font-medium">
                {transaction.description}
              </p>

              <p className="text-sm text-slate-500">
                {new Date(
                  transaction.createdAt
                ).toLocaleDateString("vi-VN")}
              </p>

              <p className="text-xs text-slate-500">
                {transaction.status}
              </p>
            </div>

            <p
              className={
                transaction.amount >= 0
                  ? "font-semibold text-green-600"
                  : "font-semibold text-red-600"
              }
            >
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: transaction.currency,
              }).format(transaction.amount)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}