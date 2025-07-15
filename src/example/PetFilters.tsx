import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { dummyPets } from "@/services/dummyData";

export interface FilterState {
  age?: string;
  breed?: string;
  gender?: string;
  priceRange: number;
  location?: string;
  isVaccinated: boolean;
  isVetChecked: boolean;
  isGoodWithKids: boolean;
  isMicrochipped: boolean;
}

interface PetFiltersProps {
  category: string;
  onFiltersChange: (filters: FilterState) => void;
  onApplyFilters?: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const PetFilters = ({
  category,
  onFiltersChange,
  onApplyFilters,
  onClearFilters,
}: PetFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: 100000,
    isVaccinated: false,
    isVetChecked: false,
    isGoodWithKids: false,
    isMicrochipped: false,
  });

  const getBreedOptions = () => {
    // Get unique breeds from dummy data based on category
    const categoryPets =
      category === "all"
        ? dummyPets
        : dummyPets.filter((pet) => pet.category.slug === category);
    const breeds = [...new Set(categoryPets.map((pet) => pet.breed))].sort();
    return breeds;
  };

  const getLocationOptions = () => {
    // Get unique locations from dummy data
    const locations = [...new Set(dummyPets.map((pet) => pet.location))].sort();
    return locations;
  };

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleHealthFilterChange = (
    key: keyof Pick<
      FilterState,
      "isVaccinated" | "isVetChecked" | "isGoodWithKids" | "isMicrochipped"
    >
  ) => {
    updateFilter(key, !filters[key]);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      priceRange: 100000,
      isVaccinated: false,
      isVetChecked: false,
      isGoodWithKids: false,
      isMicrochipped: false,
    };
    setFilters(clearedFilters);
    onClearFilters();
  };

  const handleApplyFilters = () => {
    if (onApplyFilters) {
      onApplyFilters(filters);
    } else {
      onFiltersChange(filters);
    }
  };

  // Auto-apply filters when they change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange(filters);
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, onFiltersChange]);

  return (
    <Card className="p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          Clear All
        </Button>
      </div>

      {/* Age Filter */}
      <div className="mb-6">
        <Label className="text-sm font-semibold mb-2 block">Age</Label>
        <Select
          value={filters.age}
          onValueChange={(value) => updateFilter("age", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-3">0-3 months</SelectItem>
            <SelectItem value="3-6">3-6 months</SelectItem>
            <SelectItem value="6-12">6-12 months</SelectItem>
            <SelectItem value="1-2">1-2 years</SelectItem>
            <SelectItem value="2+">2+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Breed Filter */}
      <div className="mb-6">
        <Label className="text-sm font-semibold mb-2 block">Breed</Label>
        <Select
          value={filters.breed}
          onValueChange={(value) => updateFilter("breed", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select breed" />
          </SelectTrigger>
          <SelectContent>
            {getBreedOptions().map((breed) => (
              <SelectItem key={breed} value={breed.toLowerCase()}>
                {breed}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Gender Filter */}
      <div className="mb-6">
        <Label className="text-sm font-semibold mb-2 block">Gender</Label>
        <Select
          value={filters.gender}
          onValueChange={(value) => updateFilter("gender", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <Label className="text-sm font-semibold mb-2 block">
          Max Price: KES {filters.priceRange.toLocaleString()}
        </Label>
        <Slider
          value={[filters.priceRange]}
          onValueChange={(value) => updateFilter("priceRange", value[0])}
          max={100000}
          step={5000}
          className="mt-2"
        />
      </div>

      {/* Health & Certification */}
      <div className="mb-6">
        <Label className="text-sm font-semibold mb-3 block">
          Health & Certification
        </Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vaccinated"
              checked={filters.isVaccinated}
              onCheckedChange={() => handleHealthFilterChange("isVaccinated")}
            />
            <Label htmlFor="vaccinated" className="text-sm">
              Vaccinated
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="vetChecked"
              checked={filters.isVetChecked}
              onCheckedChange={() => handleHealthFilterChange("isVetChecked")}
            />
            <Label htmlFor="vetChecked" className="text-sm">
              Vet Checked
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="goodWithKids"
              checked={filters.isGoodWithKids}
              onCheckedChange={() => handleHealthFilterChange("isGoodWithKids")}
            />
            <Label htmlFor="goodWithKids" className="text-sm">
              Good with Kids
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="microchipped"
              checked={filters.isMicrochipped}
              onCheckedChange={() => handleHealthFilterChange("isMicrochipped")}
            />
            <Label htmlFor="microchipped" className="text-sm">
              Microchipped
            </Label>
          </div>
        </div>
      </div>

      {/* Location Filter */}
      <div className="mb-6">
        <Label className="text-sm font-semibold mb-2 block">Location</Label>
        <Select
          value={filters.location}
          onValueChange={(value) => updateFilter("location", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {getLocationOptions().map((location) => (
              <SelectItem key={location} value={location.toLowerCase()}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleApplyFilters}
        className="w-full bg-[#E07A5F] hover:bg-[#d4654a] text-white"
      >
        Apply Filters
      </Button>
    </Card>
  );
};

export default PetFilters;
