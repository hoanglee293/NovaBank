"use client";

import { Suspense, useCallback, useMemo } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import { TransactionFilters } from
  "@/features/transactions/components/TransactionFilters";

import { TransactionTable } from
  "@/features/transactions/components/TransactionTable";

import { exportTransactionsCsv } from
  "@/features/transactions/utils/export-csv";

import { TransactionPagination } from
  "@/features/transactions/components/TransactionPagination";

import { useTransactions } from
  "@/features/transactions/hooks/useTransactions";

import { parseTransactionQuery } from
  "@/features/transactions/utils/transaction-query";

import type { TransactionFilters as Filters } from
  "@/features/transactions/types/transaction.types";

function TransactionsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryString = searchParams.toString();

  const filters = useMemo(
    () => parseTransactionQuery(
      new URLSearchParams(queryString)
    ),
    [queryString]
  );

  const updateFilters = useCallback(
    (next: Filters) => {
      const params = new URLSearchParams();

      params.set("page", String(next.page));
      params.set("pageSize", String(next.pageSize));
      params.set("sortBy", next.sortBy);
      params.set("sortOrder", next.sortOrder);

      if (next.status) {
        params.set("status", next.status);
      }

      if (next.type) {
        params.set("type", next.type);
      }

      router.replace(
        `${pathname}?${params.toString()}`,
        { scroll: false }
      );
    },
    [pathname, router]
  );

  const {
    data,
    isPending,
    isFetching,
    isPlaceholderData,
    isError,
    refetch,
  } = useTransactions(filters);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Transaction History
        </h1>
        <p className="text-sm text-slate-500">
          Manage and review your transactions
        </p>
      </div>

      <TransactionFilters
        filters={filters}
        onChange={updateFilters}
      />

      <div className="flex justify-end">
  <button
    type="button"
    disabled={!data?.data.length || isFetching || isPlaceholderData}
    onClick={() =>
      exportTransactionsCsv(data?.data ?? [])
    }
    className="rounded-lg bg-blue-600 px-4 py-2 text-white disabled:opacity-50"
  >
    Export current page (CSV)
  </button>
</div>

      {isPending ? (
        <div className="h-80 animate-pulse rounded-xl bg-slate-200" />
      ) : isError ? (
        <div role="alert" className="rounded-xl border bg-white p-6">
          <p>Unable to load transactions.</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-3 text-blue-600"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <div
            className={isPlaceholderData ? "opacity-60" : ""}
            aria-busy={isFetching}
          >
            <TransactionTable
              transactions={data?.data ?? []}
            />
          </div>

          {isFetching && (
            <p className="text-sm text-slate-500" role="status">
              Updating transactions...
            </p>
          )}

          <TransactionPagination
            page={filters.page}
            totalPages={data?.pagination.totalPages ?? 0}
            disabled={isPlaceholderData || isFetching}
            onPageChange={(page) =>
              updateFilters({ ...filters, page })
            }
          />
        </>
      )}
    </div>
  );
}

export default function TransactionsPage() {
  return (
    <Suspense fallback={<p>Loading transactions...</p>}>
      <TransactionsContent />
    </Suspense>
  );
}