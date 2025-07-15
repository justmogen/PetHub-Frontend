/**
 * Health Records API Service
 * Handles health and vaccination records for pets
 */

import { api, transformResponse } from "../baseApi";
import { API_CONFIG } from "../config";
import type {
  HealthRecord,
  VaccinationRecord,
  PaginatedResponse,
  ApiResponse,
} from "../types";

export const healthApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get health records for a pet
    getHealthRecords: builder.query<
      PaginatedResponse<HealthRecord>,
      {
        petId: string;
        record_type?: HealthRecord["record_type"];
        is_public?: boolean;
      }
    >({
      query: ({ petId, record_type, is_public }) => {
        const searchParams = new URLSearchParams();
        searchParams.append("pet_id", petId);
        if (record_type) searchParams.append("record_type", record_type);
        if (is_public !== undefined)
          searchParams.append("is_public", String(is_public));

        return `${
          API_CONFIG.ENDPOINTS.HEALTH_RECORDS
        }?${searchParams.toString()}`;
      },
      transformResponse,
      providesTags: (result, error, { petId }) => [
        { type: "HealthRecord", id: `PET_${petId}` },
      ],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),

    // Get single health record
    getHealthRecordById: builder.query<HealthRecord, string>({
      query: (id) => `${API_CONFIG.ENDPOINTS.HEALTH_RECORDS}/${id}`,
      transformResponse: (response: ApiResponse<HealthRecord>) =>
        transformResponse(response),
      providesTags: (result, error, id) => [{ type: "HealthRecord", id }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.LONG / 1000,
    }),

    // Get vaccination records for a pet
    getVaccinationRecords: builder.query<
      PaginatedResponse<VaccinationRecord>,
      {
        petId: string;
        is_current?: boolean;
      }
    >({
      query: ({ petId, is_current }) => {
        const searchParams = new URLSearchParams();
        searchParams.append("pet_id", petId);
        if (is_current !== undefined)
          searchParams.append("is_current", String(is_current));

        return `${
          API_CONFIG.ENDPOINTS.VACCINATIONS
        }?${searchParams.toString()}`;
      },
      transformResponse,
      providesTags: (result, error, { petId }) => [
        { type: "VaccinationRecord", id: `PET_${petId}` },
      ],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),

    // Get single vaccination record
    getVaccinationRecordById: builder.query<VaccinationRecord, string>({
      query: (id) => `${API_CONFIG.ENDPOINTS.VACCINATIONS}/${id}`,
      transformResponse: (response: ApiResponse<VaccinationRecord>) =>
        transformResponse(response),
      providesTags: (result, error, id) => [{ type: "VaccinationRecord", id }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.LONG / 1000,
    }),

    // Get current vaccinations for a pet
    getCurrentVaccinations: builder.query<VaccinationRecord[], string>({
      query: (petId) =>
        `${API_CONFIG.ENDPOINTS.VACCINATIONS}?pet_id=${petId}&is_current=true`,
      transformResponse: (response: ApiResponse<VaccinationRecord[]>) =>
        transformResponse(response),
      providesTags: (result, error, petId) => [
        { type: "VaccinationRecord", id: `CURRENT_${petId}` },
      ],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),

    // Get upcoming vaccination due dates
    getUpcomingVaccinations: builder.query<
      VaccinationRecord[],
      {
        petId?: string;
        days_ahead?: number;
      }
    >({
      query: ({ petId, days_ahead = 30 }) => {
        const searchParams = new URLSearchParams();
        if (petId) searchParams.append("pet_id", petId);
        searchParams.append("days_ahead", String(days_ahead));

        return `${
          API_CONFIG.ENDPOINTS.VACCINATIONS
        }/upcoming?${searchParams.toString()}`;
      },
      transformResponse: (response: ApiResponse<VaccinationRecord[]>) =>
        transformResponse(response),
      providesTags: [{ type: "VaccinationRecord", id: "UPCOMING" }],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.SHORT / 1000,
    }),

    // Get health certificate for a pet
    getHealthCertificate: builder.query<
      {
        pet_id: string;
        certificate_url: string;
        issued_date: string;
        valid_until: string;
        veterinarian: string;
        clinic: string;
        status: "valid" | "expired" | "pending";
      },
      string
    >({
      query: (petId) =>
        `${API_CONFIG.ENDPOINTS.HEALTH_RECORDS}/certificate/${petId}`,
      transformResponse: (
        response: ApiResponse<{
          pet_id: string;
          certificate_url: string;
          issued_date: string;
          valid_until: string;
          veterinarian: string;
          clinic: string;
          status: "valid" | "expired" | "pending";
        }>
      ) => transformResponse(response),
      providesTags: (result, error, petId) => [
        { type: "HealthRecord", id: `CERTIFICATE_${petId}` },
      ],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),

    // Get health summary for a pet (public info for buyers)
    getHealthSummary: builder.query<
      {
        pet_id: string;
        health_status: "excellent" | "good" | "fair" | "poor";
        vaccination_status: "up_to_date" | "partial" | "overdue";
        last_checkup: string;
        next_vaccination_due?: string;
        health_certificates: number;
        vaccination_count: number;
        has_health_guarantee: boolean;
      },
      string
    >({
      query: (petId) =>
        `${API_CONFIG.ENDPOINTS.HEALTH_RECORDS}/summary/${petId}`,
      transformResponse: (
        response: ApiResponse<{
          total_records: number;
          vaccinations_up_to_date: boolean;
          last_checkup: string;
          next_vaccination_due: string;
          health_status: "excellent" | "good" | "fair" | "poor";
          recent_issues: string[];
        }>,
        meta: object | undefined,
        arg: string
      ) => {
        const data = transformResponse(response);
        // Transform the backend response to match the expected format
        return {
          pet_id: arg, // Use the petId from the argument
          health_status: data.health_status,
          vaccination_status: data.vaccinations_up_to_date
            ? "up_to_date"
            : "overdue",
          last_checkup: data.last_checkup,
          next_vaccination_due: data.next_vaccination_due,
          health_certificates: data.total_records,
          vaccination_count: data.recent_issues.length, // Use issues count as placeholder
          has_health_guarantee:
            data.health_status === "excellent" || data.health_status === "good",
        };
      },
      providesTags: (result, error, petId) => [
        { type: "HealthRecord", id: `SUMMARY_${petId}` },
      ],
      keepUnusedDataFor: API_CONFIG.CACHE_TIME.MEDIUM / 1000,
    }),
  }),
});

// Export hooks for use in components
export const {
  useGetHealthRecordsQuery,
  useGetHealthRecordByIdQuery,
  useGetVaccinationRecordsQuery,
  useGetVaccinationRecordByIdQuery,
  useGetCurrentVaccinationsQuery,
  useGetUpcomingVaccinationsQuery,
  useGetHealthCertificateQuery,
  useGetHealthSummaryQuery,
  useLazyGetHealthRecordsQuery,
  useLazyGetVaccinationRecordsQuery,
} = healthApi;

// Export types for convenience
export type { HealthRecord, VaccinationRecord };
