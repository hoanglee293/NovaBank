import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { getRefreshSession } from "@/mocks/auth/mock-session";
import { createAccessToken } from "@/mocks/auth/mock-token";
import { mockUsers } from "@/mocks/auth/mock-users";

const REFRESH_COOKIE_NAME =
  "novabank_refresh_token";

export async function POST(
  request: NextRequest,
) {
  const refreshToken =
    request.cookies.get(
      REFRESH_COOKIE_NAME,
    )?.value;

  if (!refreshToken) {
    return NextResponse.json(
      {
        code: "NO_REFRESH_TOKEN",

        message:
          "Refresh token is missing.",
      },
      {
        status: 401,
      },
    );
  }

  const session =
    getRefreshSession(
      refreshToken,
    );

  if (!session) {
    const response =
      NextResponse.json(
        {
          code:
            "INVALID_REFRESH_TOKEN",

          message:
            "Session has expired.",
        },
        {
          status: 401,
        },
      );

    response.cookies.delete(
      REFRESH_COOKIE_NAME,
    );

    return response;
  }

  const user =
    mockUsers.find(
      (item) =>
        item.id === session.userId,
    );

  if (!user) {
    return NextResponse.json(
      {
        code: "USER_NOT_FOUND",

        message:
          "User does not exist.",
      },
      {
        status: 401,
      },
    );
  }

  const accessToken =
    createAccessToken(user.id);

  return NextResponse.json(
    {
      accessToken,

      expiresIn: 10 * 60,
    },
    {
      status: 200,
    },
  );
}
