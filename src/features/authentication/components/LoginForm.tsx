"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useLogin } from "../hooks/useLogin";
import {
  loginSchema,
  type LoginFormValues,
} from "../schemas/login.schema";

export function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit = (
    values: LoginFormValues,
  ) => {
    loginMutation.mutate(values, {
      onSuccess(data) {
        sessionStorage.setItem(
          "challengeId",
          data.challengeId,
        );

        router.push("/verify-otp");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>

        <input
          {...register("email")}
          type="email"
          placeholder="example@novabank.com"
        />

        {errors.email && (
          <p>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label>Password</label>

        <input
          {...register("password")}
          type="password"
          placeholder="********"
        />

        {errors.password && (
          <p>{errors.password.message}</p>
        )}
      </div>

      {loginMutation.isError && (
        <p>Đăng nhập thất bại.</p>
      )}

      <button
        type="submit"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending
          ? "Signing in..."
          : "Login"}
      </button>
    </form>
  );
}