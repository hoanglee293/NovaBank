"use client";

import { useEffect } from "react";

interface UseSessionTimeoutOptions {
  timeout: number;
  onTimeout: () => void;
}

export function useSessionTimeout({
  timeout,
  onTimeout,
}: UseSessionTimeoutOptions) {
  useEffect(() => {
    let timer: ReturnType<
      typeof setTimeout
    >;

    const resetTimer = () => {
      clearTimeout(timer);

      timer = setTimeout(
        onTimeout,
        timeout,
      );
    };

    const events = [
      "mousedown",
      "keydown",
      "touchstart",
      "scroll",
    ];

    events.forEach((event) => {
      window.addEventListener(
        event,
        resetTimer,
      );
    });

    resetTimer();

    return () => {
      clearTimeout(timer);

      events.forEach((event) => {
        window.removeEventListener(
          event,
          resetTimer,
        );
      });
    };
  }, [timeout, onTimeout]);
}