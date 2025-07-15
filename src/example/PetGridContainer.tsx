/* eslint-disable */
import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PetCard from "../PetCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FilterState } from "../PetFilters";
import { dummyPets, getLifestyleCategory } from "@/services/dummyData";
import {
  parseAgeToMonths,
  parseAgeRange,
  isAgeInRange,
} from "@/utils/petFilters";
import { usePetSorting } from "@/hooks/usePetSorting";
import { usePagination } from "@/hooks/usePagination";

interface PetGridContainerProps {
  category: string;
  filters: FilterState;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const PetGridContainer = ({
  category,
  filters,
  sortBy,
  setSortBy,
}: PetGridContainerProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const itemsPerPage = 9;

  const breedType = searchParams.get("breed_type");

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, filters, breedType]);

  // Convert and filter pets
  const filteredPets = useMemo(() => {
    const convertedPets = dummyPets.map((pet) => ({
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      age: pet.age,
      image: pet.image,
      isVaccinated: pet.is_vaccinated,
      isVetChecked: pet.is_vet_checked,
      isGoodWithKids: pet.is_good_with_kids,
      location: pet.location,
      category: pet.category.slug,
      price: `KES ${pet.price.toLocaleString()}`,
      description: pet.description,
    }));

    // Apply lifestyle filtering
    let lifestyleFiltered = convertedPets;
    if (breedType) {
      lifestyleFiltered = convertedPets.filter((pet) => {
        const originalPet = dummyPets.find((p) => p.id === pet.id);
        if (!originalPet) return false;

        const lifestyleCategories = getLifestyleCategory(originalPet);
        return lifestyleCategories.includes(breedType);
      });
    }

    // Filter by category
    const categoryFiltered =
      category === "all"
        ? lifestyleFiltered
        : lifestyleFiltered.filter((pet) => pet.category === category);

    // Apply additional filters
    return categoryFiltered.filter((pet) => {
      // Age filter
      if (filters.age) {
        const petAgeInMonths = parseAgeToMonths(pet.age);
        const ageRange = parseAgeRange(filters.age);
        if (!isAgeInRange(petAgeInMonths, ageRange)) return false;
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

      // Price filter
      const petPrice = parseInt(pet.price.replace(/[^\d]/g, ""));
      if (petPrice > filters.priceRange) return false;

      // Health filters
      if (filters.isVaccinated && !pet.isVaccinated) return false;
      if (filters.isVetChecked && !pet.isVetChecked) return false;
      if (filters.isGoodWithKids && !pet.isGoodWithKids) return false;

      return true;
    });
  }, [category, filters, breedType]);

  // Sort pets
  const sortedPets = usePetSorting(filteredPets, sortBy);

  // Pagination
  const { totalPages, paginatedItems: paginatedPets } = usePagination({
    items: sortedPets,
    itemsPerPage,
    currentPage,
  });

  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    paginatedPets,
    totalPages,
    currentPage,
    handlePageChange,
    sortedPets,
  };
};

export default PetGridContainer;
