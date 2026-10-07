import { NextResponse } from "next/server";

import {
  createRefreshSession,
  verifyChallenge,
} from "@/mocks/auth/mock-session";

import { createAccessToken } from "@/mocks/auth/mock-token";

import { mockUsers } from "@/mocks/auth/mock-users";

interface VerifyOTPRequest {
  challengeId?: string;

  otp?: string;
}

export async function POST(
  request: Request,
) {
  try {
    const body =
      (await request.json()) as VerifyOTPRequest;

    const {
      challengeId,
      otp,
    } = body;

    if (!challengeId || !otp) {
      return NextResponse.json(
        {
          code: "INVALID_REQUEST",

          message:
            "Challenge ID and OTP are required.",
        },
        {
          status: 400,
        },
      );
    }

    const challenge =
      verifyChallenge(
        challengeId,
        otp,
      );

    if (!challenge) {
      return NextResponse.json(
        {
          code: "INVALID_OTP",

          message:
            "OTP is invalid or expired.",
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
          challenge.userId,
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

    const accessToken =
      createAccessToken(user.id);

    const refreshSession =
      createRefreshSession(
        user.id,
      );

    const response =
      NextResponse.json(
        {
          accessToken,

          // milliseconds
          expiresIn: 10 * 60,

          user: {
            id: user.id,

            fullName:
              user.fullName,

            email: user.email,

            role: user.role,
          },
        },
        {
          status: 200,
        },
      );

    response.cookies.set(
      "novabank_refresh_token",
      refreshSession.refreshToken,
      {
        httpOnly: true,

        secure:
          process.env.NODE_ENV ===
          "production",

        sameSite: "lax",

        path: "/",

        maxAge:
          24 * 60 * 60,
      },
    );

    return response;
  } catch {
    return NextResponse.json(
      {
        code: "INTERNAL_ERROR",

        message:
          "Unable to verify OTP.",
      },
      {
        status: 500,
      },
    );
  }
}