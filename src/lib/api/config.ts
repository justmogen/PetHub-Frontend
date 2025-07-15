/**
 * API Configuration
 * Centralized configuration for all API endpoints and settings
 */

export const API_CONFIG = {
  // Base URLs
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  API_VERSION: "/api/v1",

  // Endpoints
  ENDPOINTS: {
    // Pet endpoints
    PETS: "/pets",
    PET_DETAIL: (id: string) => `/pets/${id}`,
    PET_SEARCH: "/pets/search",
    PET_FEATURED: "/pets/featured",

    // Breeder endpoints
    BREEDERS: "/breeders",
    BREEDER_DETAIL: (id: string) => `/breeders/${id}`,
    BREEDER_PETS: (id: string) => `/breeders/${id}/pets`,
    BREEDER_VERIFICATION: (id: string) => `/breeders/${id}/verification`,

    // Interest/Inquiry endpoints
    INTERESTS: "/interests",
    INTEREST_DETAIL: (id: string) => `/interests/${id}`,
    INTEREST_SUBMIT: "/interests/submit",

    // Category endpoints
    CATEGORIES: "/categories",
    BREEDS: "/breeds",
    BREED_DETAIL: (id: string) => `/breeds/${id}`,

    // Health endpoints
    HEALTH_RECORDS: "/health-records",
    VACCINATIONS: "/vaccinations",

    // Admin endpoints
    ADMIN_DASHBOARD: "/admin/dashboard",
  },

  // Request configuration
  TIMEOUT: 30000, // 30 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // 1 second

  // Cache configuration
  CACHE_TIME: {
    SHORT: 5 * 60 * 1000, // 5 minutes
    MEDIUM: 15 * 60 * 1000, // 15 minutes
    LONG: 60 * 60 * 1000, // 1 hour
  },

  // Headers
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
} as const;

/**
 * Build full API URL
 */
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${API_CONFIG.API_VERSION}${endpoint}`;
};

/**
 * Environment-specific configurations
 */
export const getEnvironmentConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const isProduction = process.env.NODE_ENV === "production";

  return {
    isDevelopment,
    isProduction,
    enableLogging: isDevelopment,
    enableRetry: true,
    maxRetryAttempts: isDevelopment ? 1 : API_CONFIG.RETRY_ATTEMPTS,
  };
};
