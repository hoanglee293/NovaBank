import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { verifyAccessToken } from "@/mocks/auth/mock-token";
import { mockUsers } from "@/mocks/auth/mock-users";

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
          "Authorization header is missing.",
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
        code:
          "INVALID_AUTHORIZATION",

        message:
          "Invalid authorization header.",
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
          "INVALID_ACCESS_TOKEN",

        message:
          "Access token is invalid or expired.",
      },
      {
        status: 401,
      },
    );
  }

  const user =
    mockUsers.find(
      (item) =>
        item.id ===
        payload.userId,
    );

  if (!user) {
    return NextResponse.json(
      {
        code: "USER_NOT_FOUND",

        message:
          "User does not exist.",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(
    {
      id: user.id,

      fullName:
        user.fullName,

      email: user.email,

      role: user.role,
    },
    {
      status: 200,
    },
  );
}
