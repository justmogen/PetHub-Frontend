/**
 * Admin API Service
 * Handles admin dashboard for your business
 */

import { api, transformResponse } from "../baseApi";
import { API_CONFIG } from "../config";
import type { AdminDashboard, AdminActivity, ApiResponse } from "../types";

export const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get admin dashboard data
    getAdminDashboard: builder.query<
      AdminDashboard,
      { period?: "week" | "month" | "year" }
    >({
      query: ({ period = "month" } = {}) =>
        `${API_CONFIG.ENDPOINTS.ADMIN_DASHBOARD}?period=${period}`,
      transformResponse: (response: ApiResponse<AdminDashboard>) =>
        transformResponse(response),
      providesTags: [{ type: "Dashboard", id: "MAIN" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.SHORT / 1000,
    }),

    // Get recent activities for dashboard
    getRecentActivities: builder.query<AdminActivity[], { limit?: number }>({
      query: ({ limit = 10 } = {}) =>
        `${API_CONFIG.ENDPOINTS.ADMIN_DASHBOARD}/activities?limit=${limit}`,
      transformResponse: (response: ApiResponse<AdminActivity[]>) =>
        transformResponse(response),
      providesTags: [{ type: "Dashboard", id: "ACTIVITIES" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.SHORT / 1000,
    }),
  }),
});

// Export hooks for use in components
export const { useGetAdminDashboardQuery, useGetRecentActivitiesQuery } =
  adminApi;

// Export types for convenience
export type { AdminDashboard, AdminActivity };
