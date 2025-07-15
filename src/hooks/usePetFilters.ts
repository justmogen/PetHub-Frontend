import { useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { PetFilters } from "@/lib/api/types";

export interface UseFiltersResult {
  filters: PetFilters;
  updateFilters: (newFilters: Partial<PetFilters>) => void;
  clearFilters: () => void;
}

const defaultFilters: PetFilters = {
  min_price: 0,
  max_price: 500000, // Updated for KES
  is_available: true,
};

export function usePetFilters(): UseFiltersResult {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize filters from URL params
  const [filters, setFilters] = useState<PetFilters>(() => {
    const params = new URLSearchParams(searchParams);

    return {
      // String filters
      breed: params.get("breed") || undefined,
      gender: (params.get("gender") as "male" | "female") || undefined,
      age_range:
        (params.get("age_range") as "puppy" | "adult" | "senior") || undefined,
      location: params.get("location") || undefined,
      search: params.get("search") || undefined,

      // Price range
      min_price: params.get("min_price")
        ? parseInt(params.get("min_price")!)
        : defaultFilters.min_price,
      max_price: params.get("max_price")
        ? parseInt(params.get("max_price")!)
        : defaultFilters.max_price,

      // Boolean filters
      is_available: params.get("is_available") !== "false", // Default to true
      is_featured: params.get("is_featured") === "true",

      // Breeder filter
      breeder_id: params.get("breeder_id") || undefined,
    };
  });

  const updateFilters = useCallback(
    (newFilters: Partial<PetFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);

      // Update URL with new filters
      const params = new URLSearchParams();

      // Add string filters
      if (updatedFilters.breed) params.set("breed", updatedFilters.breed);
      if (updatedFilters.gender) params.set("gender", updatedFilters.gender);
      if (updatedFilters.age_range)
        params.set("age_range", updatedFilters.age_range);
      if (updatedFilters.location)
        params.set("location", updatedFilters.location);
      if (updatedFilters.search) params.set("search", updatedFilters.search);
      if (updatedFilters.breeder_id)
        params.set("breeder_id", updatedFilters.breeder_id);

      // Add price range
      if (updatedFilters.min_price !== undefined) {
        params.set("min_price", updatedFilters.min_price.toString());
      }
      if (updatedFilters.max_price !== undefined) {
        params.set("max_price", updatedFilters.max_price.toString());
      }

      // Add boolean filters
      if (updatedFilters.is_available === false)
        params.set("is_available", "false");
      if (updatedFilters.is_featured) params.set("is_featured", "true");

      // Update URL
      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    },
    [filters, pathname, router]
  );

  const clearFilters = useCallback(() => {
    setFilters(defaultFilters);
    router.push(pathname, { scroll: false });
  }, [pathname, router]);

  return {
    filters,
    updateFilters,
    clearFilters,
  };
}
