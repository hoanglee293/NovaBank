import { useMutation } from "@tanstack/react-query";

import { verifyOTP } from "../api/verify-otp";

export function useVerifyOTP() {
  return useMutation({
    mutationFn: verifyOTP,
  });
}