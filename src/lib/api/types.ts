/**
 * TypeScript types for API responses and requests
 * Centralized type definitions for type safety across the application
 */

// Base types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  errors?: Record<string, string[]>;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    pages?: number;
  };
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// Pet related types
export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  age_unit: "months" | "years";
  gender: "male" | "female";
  price: number;
  currency: "KES" | "USD";
  description: string;
  images: PetImage[];
  breeder_id: string;
  breeder: Breeder;
  category: string;
  location: string;
  is_available: boolean;
  is_featured: boolean;
  health_records: HealthRecord[];
  vaccinations: VaccinationRecord[];
  created_at: string;
  updated_at: string;

  // Computed fields
  display_age: string;
  formatted_price: string;
  primary_image: string;
}

export interface PetImage {
  id: string;
  url: string;
  alt_text: string;
  is_primary: boolean;
  order: number;
}

export interface PetFilters {
  breed?: string;
  min_price?: number;
  max_price?: number;
  gender?: "male" | "female";
  age_range?: "puppy" | "adult" | "senior";
  location?: string;
  breeder_id?: string;
  is_available?: boolean;
  is_featured?: boolean;
  search?: string;
}

export interface PetSearchParams extends PetFilters {
  page?: number;
  limit?: number;
  ordering?: "price" | "-price" | "age" | "-age" | "created_at" | "-created_at";
}

// Breeder related types
export interface Breeder {
  id: string;
  name: string;
  business_name?: string;
  email: string;
  phone: string;
  location: string;
  description: string;
  profile_image?: string;
  years_experience: number;
  specializes_in: string[];
  verification_status: "pending" | "verified" | "rejected";
  verification_badges: BreederBadge[];
  rating: number;
  total_reviews: number;
  total_pets_sold: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;

  // Social links
  website?: string;
  facebook?: string;
  instagram?: string;
  whatsapp?: string;
}

export interface BreederBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  awarded_at: string;
}

export interface BreederFilters {
  location?: string;
  specializes_in?: string;
  verification_status?: "verified" | "pending";
  min_rating?: number;
  search?: string;
}

// Interest/Inquiry related types
export interface Interest {
  id: string;
  pet_id: string;
  pet: Pet;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  buyer_location: string;
  message: string;
  status:
    | "pending"
    | "contacted"
    | "negotiating"
    | "accepted"
    | "rejected"
    | "completed";
  preferred_contact_method: "whatsapp" | "email" | "phone";
  budget_range?: string;
  timeline?: string;
  experience_level: "first_time" | "experienced" | "professional";
  created_at: string;
  updated_at: string;

  // Admin fields
  admin_notes?: string;
  contacted_at?: string;
  response_time?: number; // in hours
}

export interface InterestFormData {
  pet_id: string;
  buyer_name: string;
  buyer_email: string;
  buyer_phone: string;
  buyer_location: string;
  message: string;
  preferred_contact_method: "whatsapp" | "email" | "phone";
  budget_range?: string;
  timeline?: string;
  experience_level: "first_time" | "experienced" | "professional";
}

// Health related types
export interface HealthRecord {
  id: string;
  pet_id: string;
  record_type: "checkup" | "vaccination" | "treatment" | "certificate";
  title: string;
  description: string;
  date: string;
  veterinarian: string;
  clinic: string;
  document_url?: string;
  is_public: boolean;
  created_at: string;
}

export interface VaccinationRecord {
  id: string;
  pet_id: string;
  vaccine_name: string;
  vaccine_type: string;
  administered_date: string;
  next_due_date?: string;
  veterinarian: string;
  clinic: string;
  batch_number?: string;
  certificate_url?: string;
  is_current: boolean;
  created_at: string;
}

// Category and Breed types
export interface Category {
  id: string;
  name: string;
  description: string;
  image_url?: string;
  pet_count: number;
  is_active: boolean;
}

export interface Breed {
  id: string;
  name: string;
  category: string;
  description: string;
  characteristics: BreedCharacteristics;
  average_price_range: {
    min: number;
    max: number;
    currency: "KES" | "USD";
  };
  popularity_rank: number;
  image_url?: string;
  is_active: boolean;
}

export interface BreedCharacteristics {
  size: "small" | "medium" | "large" | "giant";
  energy_level: 1 | 2 | 3 | 4 | 5;
  grooming_needs: 1 | 2 | 3 | 4 | 5;
  training_difficulty: 1 | 2 | 3 | 4 | 5;
  good_with_children: boolean;
  good_with_pets: boolean;
  apartment_friendly: boolean;
  life_span: {
    min: number;
    max: number;
  };
}

// Admin/Dashboard types
export interface AdminDashboard {
  total_pets: number;
  active_pets: number;
  total_breeders: number;
  verified_breeders: number;
  pending_interests: number;
  monthly_revenue: number;
  recent_activities: AdminActivity[];
  top_breeders: Breeder[];
  popular_breeds: { breed: string; count: number }[];
}

export interface AdminActivity {
  id: string;
  type: "interest_submitted" | "pet_added" | "breeder_verified";
  description: string;
  timestamp: string;
  related_id?: string;
  amount?: number;
}

// Error types
export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  details?: Record<string, unknown>;
}

// RTK Query meta types
export interface QueryMeta {
  request: Request;
  response: Response;
}

// Common utility types
export type SortOrder = "asc" | "desc";
export type LoadingState = "idle" | "loading" | "succeeded" | "failed";
export type ContactMethod = "whatsapp" | "email" | "phone";
export type Currency = "KES" | "USD";
export type PetStatus = "available" | "reserved" | "sold";
export type BreederStatus = "pending" | "verified" | "rejected" | "suspended";
