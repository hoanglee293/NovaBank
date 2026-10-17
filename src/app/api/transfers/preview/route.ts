
import {
  type NextRequest,
  NextResponse,
} from "next/server";

import { previewTransfer } from
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

    const input = await parseTransferBody(request);

    const preview = previewTransfer(input, userId);

    return NextResponse.json(preview);
  } catch (error) {
    return handleTransferError(error);
  }
}
