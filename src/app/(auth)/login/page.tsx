import { LoginForm } from "@/features/authentication/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            NovaBank
          </h1>

          <h2 className="mt-2 text-base font-medium text-slate-500">
            Internet Banking
          </h2>
        </header>

        <LoginForm />
      </section>
    </main>
  );
}
