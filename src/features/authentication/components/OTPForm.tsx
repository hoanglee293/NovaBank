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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>OTP</label>

        <input
          {...register("otp")}
          inputMode="numeric"
          maxLength={6}
          placeholder="000000"
        />

        {errors.otp && (
          <p>{errors.otp.message}</p>
        )}
      </div>

      {verifyMutation.isError && (
        <p>
          OTP không hợp lệ hoặc đã hết hạn.
        </p>
      )}

      <button
        type="submit"
        disabled={verifyMutation.isPending}
      >
        {verifyMutation.isPending
          ? "Verifying..."
          : "Verify OTP"}
      </button>
    </form>
  );
}