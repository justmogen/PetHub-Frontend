/**
 * Category and Breed API Service
 * Handles category and breed-related API calls
 */

import { api, transformResponse } from "../baseApi";
import { API_CONFIG } from "../config";
import type { Category, Breed, ApiResponse } from "../types";

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all categories
    getCategories: builder.query<Category[], void>({
      query: () => API_CONFIG.ENDPOINTS.CATEGORIES,
      transformResponse: (response: ApiResponse<Category[]>) =>
        transformResponse(response),
      providesTags: [{ type: "Category", id: "LIST" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.LONG / 1000,
    }),

    // Get active categories only
    getActiveCategories: builder.query<Category[], void>({
      query: () => `${API_CONFIG.ENDPOINTS.CATEGORIES}?is_active=true`,
      transformResponse: (response: ApiResponse<Category[]>) =>
        transformResponse(response),
      providesTags: [{ type: "Category", id: "ACTIVE" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.LONG / 1000,
    }),

    // Get all breeds
    getBreeds: builder.query<Breed[], { category?: string }>({
      query: ({ category } = {}) => {
        const url = API_CONFIG.ENDPOINTS.BREEDS;
        return category ? `${url}?category=${category}` : url;
      },
      transformResponse: (response: ApiResponse<Breed[]>) =>
        transformResponse(response),
      providesTags: (result, error, { category }) => [
        { type: "Breed", id: category ? `CATEGORY_${category}` : "LIST" },
      ],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.LONG / 1000,
    }),

    // Get single breed by ID
    getBreedById: builder.query<Breed, string>({
      query: (id) => API_CONFIG.ENDPOINTS.BREED_DETAIL(id),
      transformResponse: (response: ApiResponse<Breed>) =>
        transformResponse(response),
      providesTags: (result, error, id) => [{ type: "Breed", id }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.LONG / 1000,
    }),

    // Get popular breeds
    getPopularBreeds: builder.query<Breed[], { limit?: number }>({
      query: ({ limit = 10 } = {}) =>
        `${API_CONFIG.ENDPOINTS.BREEDS}?ordering=popularity_rank&limit=${limit}`,
      transformResponse: (response: ApiResponse<Breed[]>) =>
        transformResponse(response),
      providesTags: [{ type: "Breed", id: "POPULAR" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),

    // Search breeds
    searchBreeds: builder.query<Breed[], { query: string }>({
      query: ({ query }) => `${API_CONFIG.ENDPOINTS.BREEDS}?search=${query}`,
      transformResponse: (response: ApiResponse<Breed[]>) =>
        transformResponse(response),
      providesTags: [{ type: "Breed", id: "SEARCH" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.SHORT / 1000,
    }),

    // Get breeds by characteristics
    getBreedsByCharacteristics: builder.query<
      Breed[],
      {
        size?: "small" | "medium" | "large" | "giant";
        energy_level?: number;
        good_with_children?: boolean;
        apartment_friendly?: boolean;
      }
    >({
      query: (filters) => {
        const searchParams = new URLSearchParams();

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });

        return `${API_CONFIG.ENDPOINTS.BREEDS}?${searchParams.toString()}`;
      },
      transformResponse: (response: ApiResponse<Breed[]>) =>
        transformResponse(response),
      providesTags: [{ type: "Breed", id: "FILTERED" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetCategoriesQuery,
  useGetActiveCategoriesQuery,
  useGetBreedsQuery,
  useGetBreedByIdQuery,
  useGetPopularBreedsQuery,
  useSearchBreedsQuery,
  useGetBreedsByCharacteristicsQuery,
  useLazyGetBreedsQuery,
  useLazySearchBreedsQuery,
} = categoryApi;

// Export types for convenience
export type { Category, Breed };
