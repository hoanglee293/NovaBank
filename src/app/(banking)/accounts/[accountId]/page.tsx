"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { useAccountDetail } from
  "@/features/accounts/hooks/useAccountDetail";

export default function AccountDetailPage() {
  const { accountId } = useParams<{
    accountId: string;
  }>();

  const {
    data,
    isPending,
    isError,
    refetch,
  } = useAccountDetail(accountId);

  if (isPending) {
    return <p>Loading account...</p>;
  }

  if (isError || !data) {
    return (
      <div role="alert">
        <p>Unable to load account.</p>
        <button onClick={() => void refetch()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/accounts"
        className="text-blue-600"
      >
        ← Back to accounts
      </Link>

      <section className="rounded-xl border bg-white p-6">
        <h1 className="text-2xl font-bold">
          Account Details
        </h1>

        <p className="mt-4 text-slate-500">
          {data.accountName}
        </p>

        <p className="mt-2 text-sm">
          Account: ****{data.accountNumber.slice(-4)}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-slate-500">
              Current Balance
            </p>
            <p className="text-xl font-bold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: data.currency,
              }).format(data.balance)}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Available Balance
            </p>
            <p className="text-xl font-bold">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: data.currency,
              }).format(data.availableBalance)}
            </p>
          </div>
        </div>

        <p className="mt-6 text-sm">
          Status: {data.status}
        </p>
      </section>
    </div>
  );
}