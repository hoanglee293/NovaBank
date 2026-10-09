"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useSpending } from
  "../hooks/useSpending";

export function SpendingAnalytics() {
  const {
    data,
    isPending,
    isError,
    refetch,
  } = useSpending();

  if (isPending) {
    return (
      <div className="h-72 animate-pulse rounded-xl bg-slate-200" />
    );
  }

  if (isError) {
    return (
      <div role="alert">
        <p>Unable to load spending data.</p>
        <button onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    );
  }

  if (!data?.length) {
    return <p>No spending data available.</p>;
  }

  return (
    <section className="rounded-xl border bg-white p-6">
      <h2 className="mb-5 text-lg font-semibold">
        Spending Analytics
      </h2>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis
              tickFormatter={(value: number) =>
                `${value / 1000000}M`
              }
            />

            <Tooltip
              formatter={(value) =>
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(Number(value ?? 0))
              }
            />

            <Bar
              dataKey="amount"
              fill="#2563eb"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}