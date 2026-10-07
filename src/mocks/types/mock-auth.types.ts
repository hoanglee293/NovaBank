export type MockUserRole =
  | "CUSTOMER"
  | "PREMIUM_CUSTOMER"
  | "ADMIN";

export interface MockUser {
  id: string;

  fullName: string;

  email: string;

  password: string;

  role: MockUserRole;
}

export interface MockChallenge {
  challengeId: string;

  userId: string;

  otp: string;

  expiresAt: number;
}

export interface MockRefreshSession {
  refreshToken: string;

  userId: string;

  expiresAt: number;
}