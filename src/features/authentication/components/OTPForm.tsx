"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { tokenManager } from "@/services/auth/token-manager";
import { useAuthStore } from "@/stores/auth.store";

import { useVerifyOTP } from "../hooks/useVerifyOTP";
import {
  otpSchema,
  type OTPFormValues,
} from "../schemas/otp.schema";

export function OTPForm() {
  const router = useRouter();

  const setUser =
    useAuthStore((state) => state.setUser);

  const verifyMutation =
    useVerifyOTP();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = (
    values: OTPFormValues,
  ) => {
    const challengeId =
      sessionStorage.getItem("challengeId");

    if (!challengeId) {
      router.replace("/login");
      return;
    }

    verifyMutation.mutate(
      {
        challengeId,
        otp: values.otp,
      },
      {
        onSuccess(data) {
          // 1. Lưu access token vào memory
          tokenManager.setToken(
            data.accessToken,
          );

          // 2. Lưu thông tin user
          setUser(data.user);

          // 3. challenge không còn cần nữa
          sessionStorage.removeItem(
            "challengeId",
          );

          // 4. Vào Banking
          router.replace("/dashboard");
        },
      },
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="otp"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          OTP
        </label>

        <input
          {...register("otp")}
          id="otp"
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
          autoComplete="one-time-code"
          aria-invalid={!!errors.otp}
          aria-describedby={errors.otp ? "otp-error" : undefined}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-center font-mono text-2xl text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 aria-invalid:border-red-500 aria-invalid:focus:ring-red-100"
        />

        {errors.otp && (
          <p
            id="otp-error"
            className="mt-2 text-sm text-red-600"
          >
            {errors.otp.message}
          </p>
        )}
      </div>

      {verifyMutation.isError && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          OTP không hợp lệ hoặc đã hết hạn.
        </p>
      )}

      <button
        type="submit"
        disabled={verifyMutation.isPending}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {verifyMutation.isPending
          ? "Verifying..."
          : "Verify OTP"}
      </button>
    </form>
  );
}
