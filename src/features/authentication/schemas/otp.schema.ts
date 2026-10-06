import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .regex(
      /^\d{6}$/,
      "OTP phải gồm đúng 6 chữ số",
    ),
});

export type OTPFormValues =
  z.infer<typeof otpSchema>;