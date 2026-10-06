export type UserRole =
  | "CUSTOMER"
  | "PREMIUM_CUSTOMER"
  | "ADMIN";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  challengeId: string;
  otpRequired: boolean;
}

export interface VerifyOTPPayload {
  challengeId: string;
  otp: string;
}

export interface AuthResponse {
  accessToken: string;
  expiresIn: number;
  user: User;
}

export interface RefreshResponse {
  accessToken: string;
  expiresIn: number;
}