
import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { initiateTransfer } from
  "@/mocks/banking/transfer-service";

import {
  getAuthenticatedUserId,
  parseTransferBody,
  handleTransferError,
} from "@/mocks/banking/transfer-route-utils";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const userId = getAuthenticatedUserId(request);

    const idempotencyKey = request.headers.get(
      "Idempotency-Key"
    );

    if (
      !idempotencyKey ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        idempotencyKey
      )
    ) {
      return NextResponse.json(
        {
          code: "INVALID_IDEMPOTENCY_KEY",
          message: "Valid UUID idempotency key required",
        },
        { status: 400 }
      );
    }

    const input = await parseTransferBody(request);

    const transfer = initiateTransfer(
      input,
      userId,
      idempotencyKey
    );

    return NextResponse.json(
      { transfer },
      { status: 201 }
    );
  } catch (error) {
    return handleTransferError(error);
  }
}
