/**
 * Pet API Service
 * Handles all pet-related API calls with caching and error handling
 */

import { api, transformResponse } from "../baseApi";
import { API_CONFIG } from "../config";
import type {
  Pet,
  PetFilters,
  PetSearchParams,
  PaginatedResponse,
  ApiResponse,
} from "../types";

export const petApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all pets with optional filters
    getPets: builder.query<PaginatedResponse<Pet>, PetSearchParams | undefined>(
      {
        query: (params) => {
          const searchParams = new URLSearchParams();

          // Add pagination parameters
          if (params?.page) searchParams.append("page", String(params.page));
          if (params?.limit) searchParams.append("limit", String(params.limit));
          if (params?.ordering)
            searchParams.append("ordering", params.ordering);

          // Add search parameters
          if (params?.search) searchParams.append("search", params.search);
          if (params?.breed) searchParams.append("breed", params.breed);
          if (params?.location)
            searchParams.append("location", params.location);
          if (params?.min_price)
            searchParams.append("min_price", String(params.min_price));
          if (params?.max_price)
            searchParams.append("max_price", String(params.max_price));
          if (params?.age_range)
            searchParams.append("age_range", params.age_range);
          if (params?.gender) searchParams.append("gender", params.gender);
          if (params?.breeder_id)
            searchParams.append("breeder_id", params.breeder_id);
          if (params?.is_available !== undefined)
            searchParams.append("is_available", String(params.is_available));
          if (params?.is_featured !== undefined)
            searchParams.append("is_featured", String(params.is_featured));

          return `${API_CONFIG.ENDPOINTS.PETS}?${searchParams.toString()}`;
        },
        transformResponse: (response: ApiResponse<PaginatedResponse<Pet>>) =>
          transformResponse(response),
        providesTags: (result) =>
          result
            ? [
                ...result.data.map((pet: Pet) => ({
                  type: "Pet" as const,
                  id: pet.id,
                })),
                { type: "Pet", id: "LIST" },
              ]
            : [{ type: "Pet", id: "LIST" }],
      }
    ),

    // Get a single pet by ID
    getPetById: builder.query<Pet, string>({
      query: (id) => API_CONFIG.ENDPOINTS.PET_DETAIL(id),
      transformResponse: (response: ApiResponse<Pet>) =>
        transformResponse(response),
      providesTags: (_result, _error, id) => [{ type: "Pet", id }],
    }),

    // Get featured pets
    getFeaturedPets: builder.query<Pet[], { limit?: number } | undefined>({
      query: (params) =>
        `${API_CONFIG.ENDPOINTS.PET_FEATURED}?limit=${params?.limit || 6}`,
      transformResponse: (response: ApiResponse<Pet[]>) =>
        transformResponse(response),
      providesTags: (result) =>
        result
          ? [
              ...result.map((pet: Pet) => ({
                type: "Pet" as const,
                id: pet.id,
              })),
              { type: "Pet", id: "FEATURED" },
            ]
          : [{ type: "Pet", id: "FEATURED" }],
    }),

    // Search pets
    searchPets: builder.query<
      PaginatedResponse<Pet>,
      { query: string; filters?: PetFilters }
    >({
      query: ({ query, filters = {} }) => {
        const searchParams = new URLSearchParams();
        searchParams.append("search", query);

        // Add filter parameters
        if (filters.breed) searchParams.append("breed", filters.breed);
        if (filters.min_price)
          searchParams.append("min_price", String(filters.min_price));
        if (filters.max_price)
          searchParams.append("max_price", String(filters.max_price));
        if (filters.age_range)
          searchParams.append("age_range", filters.age_range);
        if (filters.gender) searchParams.append("gender", filters.gender);
        if (filters.location) searchParams.append("location", filters.location);
        if (filters.breeder_id)
          searchParams.append("breeder_id", filters.breeder_id);
        if (filters.is_available !== undefined)
          searchParams.append("is_available", String(filters.is_available));
        if (filters.is_featured !== undefined)
          searchParams.append("is_featured", String(filters.is_featured));

        return `${API_CONFIG.ENDPOINTS.PET_SEARCH}?${searchParams.toString()}`;
      },
      transformResponse: (response: ApiResponse<PaginatedResponse<Pet>>) =>
        transformResponse(response),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((pet: Pet) => ({
                type: "Pet" as const,
                id: pet.id,
              })),
              { type: "Pet", id: "SEARCH" },
            ]
          : [{ type: "Pet", id: "SEARCH" }],
    }),

    // Get similar pets
    getSimilarPets: builder.query<Pet[], { petId: string; limit?: number }>({
      query: ({ petId, limit = 4 }) =>
        `${API_CONFIG.ENDPOINTS.PET_DETAIL(petId)}/similar?limit=${limit}`,
      transformResponse: (response: ApiResponse<Pet[]>) =>
        transformResponse(response),
      providesTags: (result, _error, { petId }) => [
        ...(result?.map((pet: Pet) => ({ type: "Pet" as const, id: pet.id })) ||
          []),
        { type: "Pet", id: `SIMILAR_${petId}` },
      ],
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetPetsQuery,
  useGetPetByIdQuery,
  useGetFeaturedPetsQuery,
  useSearchPetsQuery,
  useLazySearchPetsQuery,
  useGetSimilarPetsQuery,
} = petApi;
