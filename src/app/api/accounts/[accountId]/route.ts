import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { verifyAccessToken } from
  "@/mocks/auth/mock-token";

interface Context {
  params: Promise<{
    accountId: string;
  }>;
}

export async function GET(
  request: NextRequest,
  context: Context
) {
  const match = request.headers
    .get("authorization")
    ?.match(/^Bearer (.+)$/);

  const payload = match
    ? verifyAccessToken(match[1])
    : null;

  if (!payload) {
    return NextResponse.json(
      { code: "ACCESS_TOKEN_EXPIRED" },
      { status: 401 }
    );
  }

  const { accountId } = await context.params;

  // Mock account từ Phase 2.5.
  const account = {
    id: "account_001",
    accountNumber: "1900123456789",
    accountName: "NGUYEN VAN A",
    type: "CHECKING",
    balance: 125500000,
    availableBalance: 120000000,
    currency: "VND",
    status: "ACTIVE",
  };

  if (accountId !== account.id) {
    return NextResponse.json(
      { code: "ACCOUNT_NOT_FOUND" },
      { status: 404 }
    );
  }

  return NextResponse.json(account);
}