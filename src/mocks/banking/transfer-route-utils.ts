
import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { ZodError } from "zod";

import { verifyAccessToken } from
  "@/mocks/auth/mock-token";

import { transferSchema } from
  "@/features/transfers/schemas/transfer.schema";

import { TransferError } from "./transfer-service";

export function getAuthenticatedUserId(
  request: NextRequest
): string {
  const authorization = request.headers.get(
    "authorization"
  );

  const token = authorization
    ?.match(/^Bearer (.+)$/)?.[1];

  const payload = token
    ? verifyAccessToken(token)
    : null;

  if (!payload) {
    throw new TransferError(
      "UNAUTHORIZED",
      401,
      "Authentication required"
    );
  }

  return payload.userId;
}

export async function parseTransferBody(
  request: NextRequest
) {
  const body: unknown = await request.json();
  return transferSchema.parse(body);
}

export function handleTransferError(error: unknown) {
  if (error instanceof TransferError) {
    return NextResponse.json(
      {
        code: error.code,
        message: error.message,
      },
      { status: error.statusCode }
    );
  }

  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        code: "VALIDATION_ERROR",
        message: "Invalid transfer information",
        issues: error.issues,
      },
      { status: 400 }
    );
  }

  if (error instanceof SyntaxError) {
    return NextResponse.json(
      {
        code: "INVALID_JSON",
        message: "Invalid JSON body",
      },
      { status: 400 }
    );
  }

  console.error("Transfer API error:", error);

  return NextResponse.json(
    {
      code: "INTERNAL_ERROR",
      message: "Unable to process transfer",
    },
    { status: 500 }
  );
}
