import { randomUUID } from "crypto";

import type {
  MockChallenge,
  MockRefreshSession,
} from "@/mocks/types/mock-auth.types";

const challenges =
  new Map<string, MockChallenge>();

const refreshSessions =
  new Map<
    string,
    MockRefreshSession
  >();

const OTP_LIFETIME =
  5 * 60 * 1000;

const REFRESH_TOKEN_LIFETIME =
  24 * 60 * 60 * 1000;

export function createChallenge(
  userId: string,
): MockChallenge {
  const challengeId =
    randomUUID();

  const challenge: MockChallenge = {
    challengeId,

    userId,

    // Mock OTP
    otp: "123456",

    expiresAt:
      Date.now() +
      OTP_LIFETIME,
  };

  challenges.set(
    challengeId,
    challenge,
  );

  return challenge;
}

export function verifyChallenge(
  challengeId: string,
  otp: string,
): MockChallenge | null {
  const challenge =
    challenges.get(challengeId);

  if (!challenge) {
    return null;
  }

  if (
    challenge.expiresAt <
    Date.now()
  ) {
    challenges.delete(
      challengeId,
    );

    return null;
  }

  if (challenge.otp !== otp) {
    return null;
  }

  // OTP chỉ được dùng một lần
  challenges.delete(
    challengeId,
  );

  return challenge;
}

export function createRefreshSession(
  userId: string,
): MockRefreshSession {
  const refreshToken =
    `refresh_${randomUUID()}`;

  const session: MockRefreshSession = {
    refreshToken,

    userId,

    expiresAt:
      Date.now() +
      REFRESH_TOKEN_LIFETIME,
  };

  refreshSessions.set(
    refreshToken,
    session,
  );

  return session;
}

export function getRefreshSession(
  refreshToken: string,
): MockRefreshSession | null {
  const session =
    refreshSessions.get(
      refreshToken,
    );

  if (!session) {
    return null;
  }

  if (
    session.expiresAt <
    Date.now()
  ) {
    refreshSessions.delete(
      refreshToken,
    );

    return null;
  }

  return session;
}

export function revokeRefreshSession(
  refreshToken: string,
): void {
  refreshSessions.delete(
    refreshToken,
  );
}