import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { revokeRefreshSession } from "@/mocks/auth/mock-session";

const REFRESH_COOKIE_NAME =
  "novabank_refresh_token";

export async function POST(
  request: NextRequest,
) {
  const refreshToken =
    request.cookies.get(
      REFRESH_COOKIE_NAME,
    )?.value;

  if (refreshToken) {
    revokeRefreshSession(
      refreshToken,
    );
  }

  const response =
    NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
      },
    );

  response.cookies.delete(
    REFRESH_COOKIE_NAME,
  );

  return response;
}
