"use client";

import type {
  TransactionFilters as Filters,
  TransactionStatus,
  TransactionType,
  SortField,
  SortOrder,
} from "../types/transaction.types";

interface Props {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export function TransactionFilters({
  filters,
  onChange,
}: Props) {
  return (
    <div className="grid gap-4 rounded-xl border bg-white p-4 md:grid-cols-4">
      <label className="space-y-1">
        <span className="text-sm">Status</span>

        <select
          className="w-full rounded-lg border p-2"
          value={filters.status ?? ""}
          onChange={(event) =>
            onChange({
              ...filters,
              page: 1,
              status: event.target.value
                ? (event.target.value as TransactionStatus)
                : undefined,
            })
          }
        >
          <option value="">All</option>
          <option value="SUCCESS">Success</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>
      </label>

      <label className="space-y-1">
        <span className="text-sm">Type</span>

        <select
          className="w-full rounded-lg border p-2"
          value={filters.type ?? ""}
          onChange={(event) =>
            onChange({
              ...filters,
              page: 1,
              type: event.target.value
                ? (event.target.value as TransactionType)
                : undefined,
            })
          }
        >
          <option value="">All</option>
          <option value="CREDIT">Credit</option>
          <option value="DEBIT">Debit</option>
        </select>
      </label>

      <label className="space-y-1">
        <span className="text-sm">Sort by</span>

        <select
          className="w-full rounded-lg border p-2"
          value={filters.sortBy}
          onChange={(event) =>
            onChange({
              ...filters,
              page: 1,
              sortBy: event.target.value as SortField,
            })
          }
        >
          <option value="createdAt">Date</option>
          <option value="amount">Amount</option>
        </select>
      </label>

      <label className="space-y-1">
        <span className="text-sm">Order</span>

        <select
          className="w-full rounded-lg border p-2"
          value={filters.sortOrder}
          onChange={(event) =>
            onChange({
              ...filters,
              page: 1,
              sortOrder: event.target.value as SortOrder,
            })
          }
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </label>
    </div>
  );
}