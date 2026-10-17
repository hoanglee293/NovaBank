import { OTPForm } from "@/features/authentication/components/OTPForm";

export default function VerifyOTPPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            NovaBank
          </h1>

          <h2 className="mt-2 text-base font-medium text-slate-700">
            Verify OTP
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Enter the verification code to continue.
          </p>
        </header>

        <OTPForm />
      </section>
    </main>
  );
}
