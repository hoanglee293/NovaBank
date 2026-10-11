import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { verifyAccessToken } from
  "@/mocks/auth/mock-token";

import { mockTransactions } from
  "@/mocks/banking/transactions";

interface Context {
  params: Promise<{
    transactionId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: Context
) {
  const authorization =
    request.headers.get("authorization");

  const match = authorization?.match(/^Bearer (.+)$/);

  const payload = match
    ? verifyAccessToken(match[1])
    : null;

  if (!payload) {
    return NextResponse.json(
      { code: "ACCESS_TOKEN_EXPIRED" },
      { status: 401 }
    );
  }

  const { transactionId } = await context.params;

  const transaction = mockTransactions.find(
    (item) => item.id === transactionId
  );

  if (!transaction) {
    return NextResponse.json(
      { code: "TRANSACTION_NOT_FOUND" },
      { status: 404 }
    );
  }

  return NextResponse.json(transaction);
}