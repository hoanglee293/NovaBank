import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { verifyAccessToken } from
  "@/mocks/auth/mock-token";

import { mockTransactions } from
  "@/mocks/banking/transactions";

import type {
  TransactionFilters,
  TransactionStatus,
  TransactionType,
  SortField,
  SortOrder,
} from "@/features/transactions/types/transaction.types";

export async function GET(
  request: NextRequest
) {
  const authorization =
    request.headers.get("authorization");

  const match = authorization?.match(/^Bearer (.+)$/);

  const payload = match
    ? verifyAccessToken(match[1])
    : null;

  if (!payload) {
    return NextResponse.json(
      {
        code: "ACCESS_TOKEN_EXPIRED",
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const params = request.nextUrl.searchParams;

  const pageRaw = Number(params.get("page") ?? 1);
  const sizeRaw = Number(params.get("pageSize") ?? 10);

  if (
    !Number.isInteger(pageRaw) ||
    pageRaw < 1 ||
    !Number.isInteger(sizeRaw) ||
    sizeRaw < 1 ||
    sizeRaw > 100
  ) {
    return NextResponse.json(
      { code: "INVALID_PAGINATION" },
      { status: 400 }
    );
  }

  const status = params.get("status");
  const type = params.get("type");
  const sortBy = params.get("sortBy") ?? "createdAt";
  const sortOrder = params.get("sortOrder") ?? "desc";

  if (
    (status && !["SUCCESS", "PENDING", "FAILED"].includes(status)) ||
    (type && !["CREDIT", "DEBIT"].includes(type)) ||
    !["createdAt", "amount"].includes(sortBy) ||
    !["asc", "desc"].includes(sortOrder)
  ) {
    return NextResponse.json(
      { code: "INVALID_FILTERS" },
      { status: 400 }
    );
  }

  const filters: TransactionFilters = {
    page: pageRaw,
    pageSize: sizeRaw,
    status: status
      ? (status as TransactionStatus)
      : undefined,
    type: type
      ? (type as TransactionType)
      : undefined,
    sortBy: sortBy as SortField,
    sortOrder: sortOrder as SortOrder,
  };

  let result = [...mockTransactions];

  if (filters.status) {
    result = result.filter(
      (item) => item.status === filters.status
    );
  }

  if (filters.type) {
    result = result.filter(
      (item) => item.type === filters.type
    );
  }

  result.sort((a, b) => {
    const aValue =
      filters.sortBy === "createdAt"
        ? new Date(a.createdAt).getTime()
        : a.amount;

    const bValue =
      filters.sortBy === "createdAt"
        ? new Date(b.createdAt).getTime()
        : b.amount;

    const comparison = aValue - bValue;

    if (comparison !== 0) {
      return filters.sortOrder === "asc"
        ? comparison
        : -comparison;
    }

    return a.id.localeCompare(b.id);
  });

  const totalItems = result.length;

  const totalPages = Math.ceil(
    totalItems / filters.pageSize
  );

  const start =
    (filters.page - 1) * filters.pageSize;

  const data = result.slice(
    start,
    start + filters.pageSize
  );

  return NextResponse.json({
    data,
    pagination: {
      page: filters.page,
      pageSize: filters.pageSize,
      totalItems,
      totalPages,
    },
  });
}