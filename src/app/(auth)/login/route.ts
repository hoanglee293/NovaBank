import { NextResponse } from "next/server";

import { createChallenge } from "@/mocks/auth/mock-session";
import { mockUsers } from "@/mocks/auth/mock-users";

interface LoginRequest {
  email?: string;

  password?: string;
}

export async function POST(
  request: Request,
) {
  try {
    const body =
      (await request.json()) as LoginRequest;

    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          code: "INVALID_REQUEST",

          message:
            "Email and password are required.",
        },
        {
          status: 400,
        },
      );
    }

    const user = mockUsers.find(
      (item) =>
        item.email === email &&
        item.password === password,
    );

    if (!user) {
      return NextResponse.json(
        {
          code: "INVALID_CREDENTIALS",

          message:
            "Email or password is incorrect.",
        },
        {
          status: 401,
        },
      );
    }

    const challenge =
      createChallenge(user.id);

    return NextResponse.json(
      {
        challengeId:
          challenge.challengeId,

        otpRequired: true,
      },
      {
        status: 200,
      },
    );
  } catch {
    return NextResponse.json(
      {
        code: "INTERNAL_ERROR",

        message:
          "Unable to process login.",
      },
      {
        status: 500,
      },
    );
  }
}