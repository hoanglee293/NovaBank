import { OTPForm } from "@/features/authentication/components/OTPForm";

export default function VerifyOTPPage() {
  return (
    <main>
      <h1>Verify OTP</h1>

      <p>
        Enter the verification code
        to continue.
      </p>

      <OTPForm />
    </main>
  );
}