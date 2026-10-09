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
    { month: "May", amount: 8200000 },
    { month: "Jun", amount: 12500000 },
    { month: "Jul", amount: 9800000 },
    { month: "Aug", amount: 14200000 },
    { month: "Sep", amount: 11500000 },
    { month: "Oct", amount: 16400000 },
  ]);
}