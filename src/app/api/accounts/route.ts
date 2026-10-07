import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { verifyAccessToken } from "@/mocks/auth/mock-token";

export async function GET(
  request: NextRequest,
) {
  const authorization =
    request.headers.get(
      "authorization",
    );

  if (!authorization) {
    return NextResponse.json(
      {
        code: "UNAUTHORIZED",

        message:
          "Authorization required.",
      },
      {
        status: 401,
      },
    );
  }

  const [
    scheme,
    token,
  ] = authorization.split(" ");

  if (
    scheme !== "Bearer" ||
    !token
  ) {
    return NextResponse.json(
      {
        code: "UNAUTHORIZED",

        message:
          "Invalid authorization.",
      },
      {
        status: 401,
      },
    );
  }

  const payload =
    verifyAccessToken(token);

  if (!payload) {
    return NextResponse.json(
      {
        code:
          "ACCESS_TOKEN_EXPIRED",

        message:
          "Access token is invalid or expired.",
      },
      {
        status: 401,
      },
    );
  }

  return NextResponse.json(
    [
      {
        id: "account_001",

        accountNumber:
          "1900123456789",

        accountName:
          "NGUYEN VAN A",

        type: "CHECKING",

        balance: 125_500_000,

        availableBalance:
          120_000_000,

        currency: "VND",

        status: "ACTIVE",
      },
    ],
    {
      status: 200,
    },
  );
}