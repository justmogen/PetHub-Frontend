import { useState, useMemo } from "react";
import { FilterState } from "@/components/PetFilters";

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  image: string;
  location: string;
  isVaccinated?: boolean;
  isVetChecked?: boolean;
  isGoodWithKids?: boolean;
  category: string;
}

export const usePetFilters = (pets: Pet[]) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: 100000,
    isVaccinated: false,
    isVetChecked: false,
    isGoodWithKids: false,
    isMicrochipped: false,
  });

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      // Age filter
      if (filters.age) {
        const petAgeInMonths = parseAgeToMonths(pet.age);
        const ageRange = parseAgeRange(filters.age);
        if (!isAgeInRange(petAgeInMonths, ageRange)) {
          return false;
        }
      }

      // Breed filter
      if (
        filters.breed &&
        !pet.breed.toLowerCase().includes(filters.breed.toLowerCase())
      ) {
        return false;
      }

      // Location filter
      if (
        filters.location &&
        !pet.location.toLowerCase().includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // Health filters
      if (filters.isVaccinated && !pet.isVaccinated) {
        return false;
      }

      if (filters.isVetChecked && !pet.isVetChecked) {
        return false;
      }

      if (filters.isGoodWithKids && !pet.isGoodWithKids) {
        return false;
      }

      return true;
    });
  }, [pets, filters]);

  const clearFilters = () => {
    setFilters({
      priceRange: 100000,
      isVaccinated: false,
      isVetChecked: false,
      isGoodWithKids: false,
      isMicrochipped: false,
    });
  };

  return {
    filters,
    setFilters,
    filteredPets,
    clearFilters,
    totalCount: pets.length,
    filteredCount: filteredPets.length,
  };
};

// Helper functions
const parseAgeToMonths = (age: string): number => {
  const match = age.match(/(\d+)\s*(month|year)/i);
  if (!match) return 0;

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase();

  return unit === "year" ? value * 12 : value;
};

const parseAgeRange = (range: string): { min: number; max: number } => {
  switch (range) {
    case "0-3":
      return { min: 0, max: 3 };
    case "3-6":
      return { min: 3, max: 6 };
    case "6-12":
      return { min: 6, max: 12 };
    case "1-2":
      return { min: 12, max: 24 };
    case "2+":
      return { min: 24, max: Infinity };
    default:
      return { min: 0, max: Infinity };
  }
};

const isAgeInRange = (
  ageInMonths: number,
  range: { min: number; max: number }
): boolean => {
  return ageInMonths >= range.min && ageInMonths <= range.max;
};
