import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { getNewAccessToken } from "@/services/auth/refresh-manager";
import { tokenManager } from "@/services/auth/token-manager";

interface RetryAxiosRequestConfig
  extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,

  timeout: 10_000,

  withCredentials: true,

  headers: {
    "Content-Type": "application/json",
  },
});

// ================================
// REQUEST INTERCEPTOR
// ================================

apiClient.interceptors.request.use(
  (config) => {
    const token =
      tokenManager.getToken();

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// ================================
// RESPONSE INTERCEPTOR
// ================================

apiClient.interceptors.response.use(
  (response) => response,

  async (
    error: AxiosError,
  ) => {
    const originalRequest =
      error.config as
        | RetryAxiosRequestConfig
        | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isUnauthorized =
      error.response?.status === 401;

    const hasNotRetried =
      !originalRequest._retry;

    if (
      isUnauthorized &&
      hasNotRetried
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken =
          await getNewAccessToken();

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return apiClient(
          originalRequest,
        );
      } catch (refreshError) {
        tokenManager.clearToken();

        return Promise.reject(
          refreshError,
        );
      }
    }

    return Promise.reject(error);
  },
);