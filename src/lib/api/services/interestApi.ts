/**
 * Interest API Service
 * Handles all interest/inquiry-related API calls for your manual business process
 */

import { api, transformResponse } from "../baseApi";
import { API_CONFIG } from "../config";
import type {
  Interest,
  InterestFormData,
  PaginatedResponse,
  ApiResponse,
} from "../types";

export const interestApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Submit interest form (main functionality for your business)
    submitInterest: builder.mutation<
      { id: string; message: string },
      InterestFormData
    >({
      query: (data) => ({
        url: API_CONFIG.ENDPOINTS.INTEREST_SUBMIT,
        method: "POST",
        body: data,
      }),
      transformResponse: (
        response: ApiResponse<{ id: string; message: string }>
      ) => transformResponse(response),
      invalidatesTags: [
        { type: "Interest", id: "LIST" },
        { type: "Interest", id: "ADMIN_LIST" },
      ],
    }),

    // Get all interests (for admin dashboard)
    getInterests: builder.query<
      PaginatedResponse<Interest>,
      {
        status?: Interest["status"];
        page?: number;
        limit?: number;
        ordering?: string;
      }
    >({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();

        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });

        const queryString = searchParams.toString();
        return queryString
          ? `${API_CONFIG.ENDPOINTS.INTERESTS}?${queryString}`
          : API_CONFIG.ENDPOINTS.INTERESTS;
      },
      transformResponse,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({
                type: "Interest" as const,
                id,
              })),
              { type: "Interest", id: "LIST" },
              { type: "Interest", id: "ADMIN_LIST" },
            ]
          : [{ type: "Interest", id: "LIST" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.SHORT / 1000,
    }),

    // Get single interest by ID
    getInterestById: builder.query<Interest, string>({
      query: (id) => API_CONFIG.ENDPOINTS.INTEREST_DETAIL(id),
      transformResponse: (response: ApiResponse<Interest>) =>
        transformResponse(response),
      providesTags: (result, error, id) => [{ type: "Interest", id }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),

    // Get pending interests (for your daily workflow)
    getPendingInterests: builder.query<
      PaginatedResponse<Interest>,
      { limit?: number }
    >({
      query: ({ limit = 20 } = {}) =>
        `${API_CONFIG.ENDPOINTS.INTERESTS}?status=pending&ordering=-created_at&limit=${limit}`,
      transformResponse,
      providesTags: [{ type: "Interest", id: "PENDING" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.SHORT / 1000,
    }),

    // Get interests by pet ID
    getInterestsByPet: builder.query<
      PaginatedResponse<Interest>,
      { petId: string; limit?: number }
    >({
      query: ({ petId, limit = 10 }) =>
        `${API_CONFIG.ENDPOINTS.INTERESTS}?pet_id=${petId}&ordering=-created_at&limit=${limit}`,
      transformResponse,
      providesTags: (result, error, { petId }) => [
        { type: "Interest", id: `PET_${petId}` },
      ],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),

    // Update interest status (for your workflow management)
    updateInterestStatus: builder.mutation<
      Interest,
      {
        id: string;
        status: Interest["status"];
        admin_notes?: string;
      }
    >({
      query: ({ id, ...data }) => ({
        url: `${API_CONFIG.ENDPOINTS.INTEREST_DETAIL(id)}/status`,
        method: "PATCH",
        body: data,
      }),
      transformResponse: (response: ApiResponse<Interest>) =>
        transformResponse(response),
      invalidatesTags: (result, error, { id }) => [
        { type: "Interest", id },
        { type: "Interest", id: "LIST" },
        { type: "Interest", id: "PENDING" },
        { type: "Interest", id: "ADMIN_LIST" },
      ],
    }),

    // Mark interest as contacted
    markInterestAsContacted: builder.mutation<
      Interest,
      {
        id: string;
        contact_method: "whatsapp" | "email" | "phone";
        notes?: string;
      }
    >({
      query: ({ id, ...data }) => ({
        url: `${API_CONFIG.ENDPOINTS.INTEREST_DETAIL(id)}/contacted`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: ApiResponse<Interest>) =>
        transformResponse(response),
      invalidatesTags: (result, error, { id }) => [
        { type: "Interest", id },
        { type: "Interest", id: "LIST" },
        { type: "Interest", id: "PENDING" },
      ],
    }),

    // Get interest statistics (for your dashboard)
    getInterestStats: builder.query<
      {
        total_interests: number;
        pending_interests: number;
        contacted_interests: number;
        conversion_rate: number;
        avg_response_time: number;
        popular_pets: { pet_name: string; interest_count: number }[];
        daily_interests: { date: string; count: number }[];
      },
      { period?: "week" | "month" | "year" }
    >({
      query: ({ period = "month" } = {}) =>
        `${API_CONFIG.ENDPOINTS.INTERESTS}/stats?period=${period}`,
      transformResponse: (
        response: ApiResponse<{
          total_interests: number;
          pending_interests: number;
          contacted_interests: number;
          conversion_rate: number;
          avg_response_time: number;
          popular_pets: { pet_name: string; interest_count: number }[];
          daily_interests: { date: string; count: number }[];
        }>
      ) => transformResponse(response),
      providesTags: [{ type: "Interest", id: "STATS" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),

    // Get interests by breeder (for breeder dashboard)
    getInterestsByBreeder: builder.query<
      PaginatedResponse<Interest>,
      {
        breederId: string;
        status?: Interest["status"];
        limit?: number;
      }
    >({
      query: ({ breederId, status, limit = 10 }) => {
        const searchParams = new URLSearchParams();
        searchParams.append("breeder_id", breederId);
        if (status) searchParams.append("status", status);
        if (limit) searchParams.append("limit", String(limit));

        return `${API_CONFIG.ENDPOINTS.INTERESTS}?${searchParams.toString()}`;
      },
      transformResponse,
      providesTags: (result, error, { breederId }) => [
        { type: "Interest", id: `BREEDER_${breederId}` },
      ],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),

    // Generate WhatsApp message template
    generateWhatsAppMessage: builder.query<
      { message: string; phone: string },
      string
    >({
      query: (interestId) =>
        `${API_CONFIG.ENDPOINTS.INTEREST_DETAIL(interestId)}/whatsapp-message`,
      transformResponse: (
        response: ApiResponse<{ message: string; phone: string }>
      ) => transformResponse(response),
      keepUnusedDataFor: 0, // Don't cache, generate fresh each time
    }),
  }),
});

// Export hooks for use in components
export const {
  useSubmitInterestMutation,
  useGetInterestsQuery,
  useGetInterestByIdQuery,
  useGetPendingInterestsQuery,
  useGetInterestsByPetQuery,
  useUpdateInterestStatusMutation,
  useMarkInterestAsContactedMutation,
  useGetInterestStatsQuery,
  useGetInterestsByBreederQuery,
  useGenerateWhatsAppMessageQuery,
  useLazyGetInterestsQuery,
  useLazyGetPendingInterestsQuery,
  useLazyGenerateWhatsAppMessageQuery,
} = interestApi;

// Export types for convenience
export type { Interest, InterestFormData };
