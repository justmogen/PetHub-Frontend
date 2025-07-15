import { useMemo } from "react";
import { parseAgeToMonths } from "@/utils/petFilters";

interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  price: string;
  image: string;
  isVaccinated?: boolean;
  isVetChecked?: boolean;
  isGoodWithKids?: boolean;
  location: string;
  category: string;
  description: string;
}

export const usePetSorting = (pets: Pet[], sortBy: string) => {
  return useMemo(() => {
    return [...pets].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return 0; // Default order
        case "age":
          return parseAgeToMonths(a.age) - parseAgeToMonths(b.age);
        case "price-low":
          const priceA = parseInt(a.price.replace(/[^\d]/g, ""));
          const priceB = parseInt(b.price.replace(/[^\d]/g, ""));
          return priceA - priceB;
        case "price-high":
          const priceA2 = parseInt(a.price.replace(/[^\d]/g, ""));
          const priceB2 = parseInt(b.price.replace(/[^\d]/g, ""));
          return priceB2 - priceA2;
        default:
          return 0;
      }
    });
  }, [pets, sortBy]);
};
