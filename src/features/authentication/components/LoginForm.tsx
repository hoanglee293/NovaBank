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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email
        </label>

        <input
          {...register("email")}
          id="email"
          type="email"
          placeholder="example@novabank.com"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />

        {errors.email && (
          <p className="mt-2 text-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Password
        </label>

        <input
          {...register("password")}
          id="password"
          type="password"
          placeholder="********"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
        />

        {errors.password && (
          <p className="mt-2 text-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      {loginMutation.isError && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Đăng nhập thất bại.
        </p>
      )}

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loginMutation.isPending
          ? "Signing in..."
          : "Login"}
      </button>
    </form>
  );
}
