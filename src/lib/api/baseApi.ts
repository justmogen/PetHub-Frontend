/**
 * Base API Service using RTK Query
 * Central API configuration with caching, error handling, and retry logic
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { API_CONFIG, getEnvironmentConfig } from "./config";
import type { ApiResponse, ApiError } from "./types";

// Custom base query with enhanced error handling and retry logic
const baseQuery = fetchBaseQuery({
  baseUrl: API_CONFIG.BASE_URL,
  prepareHeaders: (headers) => {
    // Set default headers
    Object.entries(API_CONFIG.DEFAULT_HEADERS).forEach(([key, value]) => {
      headers.set(key, value);
    });

    // Add authentication header when available (for future use)
    // const token = (getState() as RootState).auth.token;
    // if (token) {
    //   headers.set('Authorization', `Bearer ${token}`);
    // }

    return headers;
  },
  timeout: API_CONFIG.TIMEOUT,
});

// Enhanced base query with retry logic and error handling
const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const config = getEnvironmentConfig();
  let result = await baseQuery(args, api, extraOptions);

  // Retry logic for network errors
  if (result.error && config.enableRetry) {
    const { status } = result.error;
    const shouldRetry =
      status === "FETCH_ERROR" ||
      status === "TIMEOUT_ERROR" ||
      (typeof status === "number" && status >= 500);

    if (shouldRetry) {
      let retryCount = 0;

      while (retryCount < config.maxRetryAttempts) {
        // Exponential backoff delay
        const delay = API_CONFIG.RETRY_DELAY * Math.pow(2, retryCount);
        await new Promise((resolve) => setTimeout(resolve, delay));

        result = await baseQuery(args, api, extraOptions);

        if (!result.error) {
          break;
        }

        retryCount++;
      }
    }
  }

  // Log errors in development
  if (config.enableLogging && result.error) {
    console.error("API Error:", {
      args,
      error: result.error,
      meta: result.meta,
    });
  }

  return result;
};

// Transform API responses
const transformResponse = <T>(response: ApiResponse<T>): T => {
  if (!response.success) {
    throw new Error(response.message || "API request failed");
  }
  return response.data;
};

// Transform API errors
const transformErrorResponse = (error: FetchBaseQueryError): ApiError => {
  if ("status" in error) {
    const { status, data } = error;

    if (typeof data === "object" && data !== null) {
      const errorData = data as {
        message?: string;
        code?: string;
        errors?: Record<string, unknown>;
        detail?: string;
      };
      return {
        message: errorData.message || `HTTP ${status} Error`,
        code: errorData.code || String(status),
        details:
          errorData.errors ||
          (errorData.detail ? { detail: errorData.detail } : undefined),
      };
    }

    return {
      message: `HTTP ${status} Error`,
      code: String(status),
    };
  }

  if ("error" in error) {
    const networkError = error as { error?: string };
    return {
      message: networkError.error || "Network error occurred",
      code: "NETWORK_ERROR",
    };
  }

  return {
    message: "Unknown error occurred",
    code: "UNKNOWN_ERROR",
  };
};

// Main API slice
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    "Pet",
    "Breeder",
    "Interest",
    "Category",
    "Breed",
    "HealthRecord",
    "VaccinationRecord",
    "Dashboard",
  ],
  endpoints: () => ({}),
});

// Export the auto-generated hook
export const {
  util: { getRunningQueriesThunk },
} = api;

// Export types for use in other files
export type { ApiResponse, ApiError };
export { transformResponse, transformErrorResponse };
