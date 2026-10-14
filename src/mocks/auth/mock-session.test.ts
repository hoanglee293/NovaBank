// @vitest-environment node

import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.useRealTimers();
});

describe("mock OTP challenges", () => {
  it("verifies an OTP created before the session module reloads", async () => {
    const loginSession = await import("./mock-session");
    const challenge = loginSession.createChallenge("usr_001");

    vi.resetModules();
    const otpSession = await import("./mock-session");

    expect(
      otpSession.verifyChallenge(challenge.challengeId, "123456"),
    ).toEqual(challenge);
    expect(
      otpSession.verifyChallenge(challenge.challengeId, "123456"),
    ).toBeNull();
  });

  it("rejects a wrong OTP while allowing another attempt", async () => {
    const session = await import("./mock-session");
    const challenge = session.createChallenge("usr_001");

    expect(
      session.verifyChallenge(challenge.challengeId, "000000"),
    ).toBeNull();
    expect(
      session.verifyChallenge(challenge.challengeId, "123456"),
    ).toEqual(challenge);
  });

  it("rejects missing and expired challenges even with the mock OTP", async () => {
    vi.useFakeTimers();
    const session = await import("./mock-session");
    const challenge = session.createChallenge("usr_001");

    expect(session.verifyChallenge("missing-challenge", "123456")).toBeNull();

    vi.advanceTimersByTime(5 * 60 * 1000 + 1);

    expect(
      session.verifyChallenge(challenge.challengeId, "123456"),
    ).toBeNull();
  });
});

describe("mock tokens after OTP verification", () => {
  it("keeps refresh sessions across reloads and still allows revocation", async () => {
    const otpSession = await import("./mock-session");
    const refreshSession = otpSession.createRefreshSession("usr_001");

    vi.resetModules();
    const reloadedSession = await import("./mock-session");

    expect(
      reloadedSession.getRefreshSession(refreshSession.refreshToken),
    ).toEqual(refreshSession);

    reloadedSession.revokeRefreshSession(refreshSession.refreshToken);

    expect(
      reloadedSession.getRefreshSession(refreshSession.refreshToken),
    ).toBeNull();
  });

  it("keeps access tokens across reloads without extending their expiry", async () => {
    vi.useFakeTimers();
    const otpTokens = await import("./mock-token");
    const token = otpTokens.createAccessToken("usr_001");

    vi.resetModules();
    const reloadedTokens = await import("./mock-token");

    expect(reloadedTokens.verifyAccessToken(token)?.userId).toBe("usr_001");

    vi.advanceTimersByTime(10 * 60 * 1000 + 1);

    expect(reloadedTokens.verifyAccessToken(token)).toBeNull();
  });
});
