import { randomUUID } from "crypto";

interface AccessTokenPayload {
  userId: string;

  expiresAt: number;
}

const mockTokenGlobal = globalThis as typeof globalThis & {
  novaBankMockAccessTokens?: Map<string, AccessTokenPayload>;
};

const accessTokens =
  (mockTokenGlobal.novaBankMockAccessTokens ??=
    new Map<string, AccessTokenPayload>());

const ACCESS_TOKEN_LIFETIME =
  10 * 60 * 10000;

export function createAccessToken(
  userId: string,
): string {
  const token = `access_${randomUUID()}`;

  accessTokens.set(token, {
    userId,

    expiresAt:
      Date.now() +
      ACCESS_TOKEN_LIFETIME,
  });

  return token;
}

export function verifyAccessToken(
  token: string,
): AccessTokenPayload | null {
  const payload =
    accessTokens.get(token);

  if (!payload) {
    return null;
  }

  if (
    payload.expiresAt <
    Date.now()
  ) {
    accessTokens.delete(token);

    return null;
  }

  return payload;
}

export function revokeAccessToken(
  token: string,
): void {
  accessTokens.delete(token);
}
