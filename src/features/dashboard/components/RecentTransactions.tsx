"use client";

import Link from "next/link";

import { useTransactions } from
  "@/features/transactions/hooks/useTransactions";

export function RecentTransactions() {
  const { data, isPending, isError } =
    useTransactions({
      page: 1,
      pageSize: 5,
      sortBy: "createdAt",
      sortOrder: "desc",
    });

  if (isPending) {
    return (
      <div className="h-60 animate-pulse rounded-xl bg-slate-200" />
    );
  }

  if (isError) {
    return <p>Unable to load transactions.</p>;
  }

  return (
    <section className="rounded-xl border bg-white p-6">
      <div className="mb-5 flex justify-between">
        <h2 className="text-lg font-semibold">
          Recent Transactions
        </h2>

        <Link
          href="/transactions"
          className="text-sm text-blue-600"
        >
          View all
        </Link>
      </div>

      <div className="space-y-4">
        {data?.data.map((item) => (
          <div
            key={item.id}
            className="flex justify-between gap-4 border-b pb-3"
          >
            <div>
              <p className="font-medium">
                {item.description}
              </p>
              <p className="text-xs text-slate-500">
                {new Date(item.createdAt).toLocaleDateString("vi-VN")}
              </p>
            </div>

            <p className="font-semibold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: item.currency,
              }).format(item.amount)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}