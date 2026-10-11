import type {
  TransactionFilters,
  TransactionStatus,
  TransactionType,
  SortField,
  SortOrder,
} from "../types/transaction.types";

export function parseTransactionQuery(
  params: URLSearchParams
): TransactionFilters {
  const rawPage = Number(params.get("page") ?? 1);
  const rawPageSize = Number(
    params.get("pageSize") ?? 10
  );

  const rawStatus = params.get("status");
  const rawType = params.get("type");
  const rawSortBy = params.get("sortBy");
  const rawSortOrder = params.get("sortOrder");

  return {
    page:
      Number.isInteger(rawPage) && rawPage > 0
        ? rawPage
        : 1,

    pageSize:
      Number.isInteger(rawPageSize) &&
      rawPageSize >= 1 &&
      rawPageSize <= 100
        ? rawPageSize
        : 10,

    status: ["SUCCESS", "PENDING", "FAILED"].includes(
      rawStatus ?? ""
    )
      ? (rawStatus as TransactionStatus)
      : undefined,

    type: ["CREDIT", "DEBIT"].includes(
      rawType ?? ""
    )
      ? (rawType as TransactionType)
      : undefined,

    sortBy: ["createdAt", "amount"].includes(
      rawSortBy ?? ""
    )
      ? (rawSortBy as SortField)
      : "createdAt",

    sortOrder: ["asc", "desc"].includes(
      rawSortOrder ?? ""
    )
      ? (rawSortOrder as SortOrder)
      : "desc",
  };
}