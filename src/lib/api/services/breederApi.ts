/**
 * Breeder API Service
 * Handles all breeder-related API calls with caching and error handling
 */

import { api, transformResponse } from "../baseApi";
import { API_CONFIG } from "../config";
import type {
  Breeder,
  BreederFilters,
  BreederBadge,
  PaginatedResponse,
  ApiResponse,
} from "../types";

export const breederApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all breeders with optional filters
    getBreeders: builder.query<
      PaginatedResponse<Breeder>,
      BreederFilters & { page?: number; limit?: number }
    >({
      query: (params = {}) => {
        const searchParams = new URLSearchParams();

        // Add pagination parameters
        if (params.page) searchParams.append("page", String(params.page));
        if (params.limit) searchParams.append("limit", String(params.limit));

        // Add filter parameters
        Object.entries(params).forEach(([key, value]) => {
          if (
            value !== undefined &&
            value !== null &&
            !["page", "limit"].includes(key)
          ) {
            searchParams.append(key, String(value));
          }
        });

        const queryString = searchParams.toString();
        return queryString
          ? `${API_CONFIG.ENDPOINTS.BREEDERS}?${queryString}`
          : API_CONFIG.ENDPOINTS.BREEDERS;
      },
      transformResponse,
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({
                type: "Breeder" as const,
                id,
              })),
              { type: "Breeder", id: "LIST" },
            ]
          : [{ type: "Breeder", id: "LIST" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),

    // Get single breeder by ID
    getBreederById: builder.query<Breeder, string>({
      query: (id) => API_CONFIG.ENDPOINTS.BREEDER_DETAIL(id),
      transformResponse: (response: ApiResponse<Breeder>) =>
        transformResponse(response),
      providesTags: (result, error, id) => [{ type: "Breeder", id }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.LONG / 1000,
    }),

    // Get breeder verification status
    getBreederVerification: builder.query<
      {
        status: string;
        badges: BreederBadge[];
        verification_date?: string;
        documents: { name: string; url: string; verified: boolean }[];
      },
      string
    >({
      query: (id) => API_CONFIG.ENDPOINTS.BREEDER_VERIFICATION(id),
      transformResponse: (
        response: ApiResponse<{
          status: string;
          badges: BreederBadge[];
          verification_date?: string;
          documents: { name: string; url: string; verified: boolean }[];
        }>
      ) => transformResponse(response),
      providesTags: (result, error, id) => [
        { type: "Breeder", id: `VERIFICATION_${id}` },
      ],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.LONG / 1000,
    }),

    // Search breeders
    searchBreeders: builder.query<
      PaginatedResponse<Breeder>,
      { query: string; filters?: BreederFilters }
    >({
      query: ({ query, filters = {} }) => {
        const searchParams = new URLSearchParams();
        searchParams.append("search", query);

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });

        return `${API_CONFIG.ENDPOINTS.BREEDERS}?${searchParams.toString()}`;
      },
      transformResponse,
      providesTags: [{ type: "Breeder", id: "SEARCH" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.SHORT / 1000,
    }),

    // Get breeder statistics
    getBreederStats: builder.query<
      {
        total_pets: number;
        available_pets: number;
        sold_pets: number;
        avg_rating: number;
        total_reviews: number;
        response_time: number;
        success_rate: number;
      },
      string
    >({
      query: (id) => `${API_CONFIG.ENDPOINTS.BREEDER_DETAIL(id)}/stats`,
      transformResponse: (
        response: ApiResponse<{
          total_pets: number;
          available_pets: number;
          sold_pets: number;
          avg_rating: number;
          total_reviews: number;
          response_time: number;
          success_rate: number;
        }>
      ) => transformResponse(response),
      providesTags: (result, error, id) => [
        { type: "Breeder", id: `STATS_${id}` },
      ],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetBreedersQuery,
  useGetBreederByIdQuery,
  useGetBreederVerificationQuery,
  useSearchBreedersQuery,
  useGetBreederStatsQuery,
  useLazyGetBreedersQuery,
  useLazySearchBreedersQuery,
} = breederApi;

// Export types for convenience
export type { Breeder, BreederFilters, BreederBadge };
