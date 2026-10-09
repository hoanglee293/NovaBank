"use client";

import { useQuery } from
  "@tanstack/react-query";

import { getSpending } from
  "../api/get-spending";

export function useSpending() {
  return useQuery({
    queryKey: ["dashboard", "spending"],
    queryFn: getSpending,
    staleTime: 60_000,
  });
}