import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { verifyAccessToken } from
  "@/mocks/auth/mock-token";

export async function GET(
  request: NextRequest
) {
  const authorization =
    request.headers.get("authorization");

  const match = authorization?.match(
    /^Bearer (.+)$/
  );

  const payload = match
    ? verifyAccessToken(match[1])
    : null;

  if (!payload) {
    return NextResponse.json(
      { code: "ACCESS_TOKEN_EXPIRED" },
      { status: 401 }
    );
  }

  return NextResponse.json([
    {
      id: "txn_001",
      accountId: "account_001",
      description: "Salary",
      amount: 25000000,
      currency: "VND",
      status: "SUCCESS",
      createdAt: "2026-10-01T08:00:00Z",
    },
    {
      id: "txn_002",
      accountId: "account_001",
      description: "Electricity Bill",
      amount: -1200000,
      currency: "VND",
      status: "SUCCESS",
      createdAt: "2026-10-02T10:00:00Z",
    },
    {
      id: "txn_003",
      accountId: "account_001",
      description: "Bank Transfer",
      amount: -3500000,
      currency: "VND",
      status: "PENDING",
      createdAt: "2026-10-03T12:00:00Z",
    },
  ]);
}