"use client";

import Link from "next/link";

import type { Transaction } from
  "../types/transaction.types";

interface Props {
  transactions: Transaction[];
}

export function TransactionTable({
  transactions,
}: Props) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
        No transactions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="p-4">Date</th>
            <th className="p-4">Description</th>
            <th className="p-4">Type</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Amount</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr
              key={transaction.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-4">
                {new Date(
                  transaction.createdAt
                ).toLocaleDateString("vi-VN")}
              </td>

              <td className="p-4">
                {transaction.description}
              </td>

              <td className="p-4">
                {transaction.type}
              </td>

              <td className="p-4">
                <span
                  className={`rounded-full px-2 py-1 text-xs ${
                    transaction.status === "SUCCESS"
                      ? "bg-green-100 text-green-700"
                      : transaction.status === "FAILED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {transaction.status}
                </span>
              </td>

              <td className="p-4 text-right font-semibold">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: transaction.currency,
                }).format(transaction.amount)}
              </td>

              <td className="p-4">
                <Link
                  href={`/transactions/${encodeURIComponent(transaction.id)}`}
                  className="text-blue-600 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}