"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useTransactionDetail } from
  "@/features/transactions/hooks/useTransactionDetail";

export default function TransactionDetailPage() {
  const params = useParams<{
    transactionId: string;
  }>();

  const { data, isPending, isError, refetch } =
    useTransactionDetail(params.transactionId);

  if (isPending) {
    return <p>Loading transaction detail...</p>;
  }

  if (isError || !data) {
    return (
      <div role="alert">
        <p>Unable to load transaction detail.</p>
        <button onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/transactions"
        className="text-blue-600"
      >
        ← Back to transactions
      </Link>

      <section className="rounded-xl border bg-white p-6">
        <h1 className="mb-6 text-2xl font-bold">
          Transaction Detail
        </h1>

        <dl className="space-y-4">
          {[
            ["Transaction ID", data.id],
            ["Description", data.description],
            ["Account", `****${data.accountId.slice(-4)}`],
            ["Type", data.type],
            ["Status", data.status],
            ["Date", new Date(data.createdAt).toLocaleString("vi-VN")],
            [
              "Amount",
              new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: data.currency,
              }).format(data.amount),
            ],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between gap-4 border-b pb-3"
            >
              <dt className="text-slate-500">{label}</dt>
              <dd className="text-right font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}