"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Search, X } from "lucide-react";
import type { PetFilters } from "@/lib/api/types";

interface PetFiltersProps {
  filters: PetFilters;
  onFiltersChange: (filters: Partial<PetFilters>) => void;
  onClearFilters: () => void;
  onApplyFilters?: () => void;
  isMobile?: boolean;
}

// Static filter options - in a real app, these might come from API
const BREED_OPTIONS = [
  "Labrador Retriever",
  "Golden Retriever",
  "German Shepherd",
  "Bulldog",
  "Poodle",
  "Beagle",
  "Rottweiler",
  "Yorkshire Terrier",
  "Dachshund",
  "Siberian Husky",
];

const LOCATION_OPTIONS = [
  "Nairobi, Kenya",
  "Mombasa, Kenya",
  "Kisumu, Kenya",
  "Nakuru, Kenya",
  "Eldoret, Kenya",
  "Thika, Kenya",
  "Malindi, Kenya",
  "Kitale, Kenya",
  "Garissa, Kenya",
  "Kakamega, Kenya",
  "Nyeri, Kenya",
  "Machakos, Kenya",
];

export function PetFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  onApplyFilters,
  isMobile = false,
}: PetFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(filters.search || "");
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.min_price || 0,
    filters.max_price || 500000, // Increased max for KES
  ]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onFiltersChange({ search: value || undefined });
  };

  const handlePriceChange = (value: number[]) => {
    const range = value as [number, number];
    setPriceRange(range);
    onFiltersChange({
      min_price: range[0],
      max_price: range[1],
    });
  };

  const handleSelectChange = (field: keyof PetFilters, value: string) => {
    onFiltersChange({
      [field]: value === "all" ? undefined : value,
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.breed) count++;
    if (filters.gender) count++;
    if (filters.age_range) count++;
    if (filters.location) count++;
    if (filters.search) count++;
    if (filters.is_featured) count++;
    if (filters.min_price !== 0 || filters.max_price !== 500000) count++;
    return count;
  };

  return (
    <Card className="sticky top-4 bg-gradient-to-br from-card to-card/90 border-brand-primary-200/20 shadow-lg backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-brand-primary-800 flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-brand-primary-500 to-brand-secondary-500 rounded-full"></div>
            Filter Pets
          </CardTitle>
          {getActiveFiltersCount() > 0 && (
            <Badge
              variant="secondary"
              className="text-xs bg-brand-primary-100 text-brand-primary-700 border-brand-primary-200"
            >
              {getActiveFiltersCount()} active
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label
            htmlFor="search"
            className="text-sm font-medium text-brand-primary-700"
          >
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-primary-400 h-4 w-4" />
            <Input
              id="search"
              placeholder="Search by name, breed..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-9 border-brand-primary-200 focus:border-brand-primary-400 focus:ring-brand-primary-200"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSearchChange("")}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-brand-primary-500 hover:text-brand-primary-700 hover:bg-brand-primary-50"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <Separator className="bg-brand-primary-100" />

        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-brand-primary-700">
            Price Range
          </Label>
          <div className="px-3 py-2 bg-brand-primary-50/30 rounded-lg">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={500000}
              min={0}
              step={5000}
              className="w-full [&_[role=slider]]:bg-brand-primary-500 [&_[role=slider]]:border-brand-primary-600"
            />
            <div className="flex justify-between text-sm text-brand-primary-600 mt-2 font-medium">
              <span>KES {priceRange[0].toLocaleString()}</span>
              <span>KES {priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Separator className="bg-brand-primary-100" />

        {/* Breed */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-brand-primary-700">
            Breed
          </Label>
          <Select
            value={filters.breed || "all"}
            onValueChange={(value) => handleSelectChange("breed", value)}
          >
            <SelectTrigger className="border-brand-primary-200 focus:border-brand-primary-400 focus:ring-brand-primary-200">
              <SelectValue placeholder="Any breed" />
            </SelectTrigger>
            <SelectContent className="border-brand-primary-200 bg-white shadow-lg">
              <SelectItem value="all">Any breed</SelectItem>
              {BREED_OPTIONS.map((breed) => (
                <SelectItem
                  key={breed}
                  value={breed}
                  className="focus:bg-brand-primary-50 hover:bg-brand-primary-50"
                >
                  {breed}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Gender */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-brand-primary-700">
            Gender
          </Label>
          <Select
            value={filters.gender || "all"}
            onValueChange={(value) => handleSelectChange("gender", value)}
          >
            <SelectTrigger className="border-brand-primary-200 focus:border-brand-primary-400 focus:ring-brand-primary-200">
              <SelectValue placeholder="Any gender" />
            </SelectTrigger>
            <SelectContent className="border-brand-primary-200 bg-white shadow-lg">
              <SelectItem value="all">Any gender</SelectItem>
              <SelectItem
                value="male"
                className="focus:bg-brand-primary-50 hover:bg-brand-primary-50"
              >
                Male
              </SelectItem>
              <SelectItem
                value="female"
                className="focus:bg-brand-primary-50 hover:bg-brand-primary-50"
              >
                Female
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age Range */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-brand-primary-700">
            Age Range
          </Label>
          <Select
            value={filters.age_range || "all"}
            onValueChange={(value) => handleSelectChange("age_range", value)}
          >
            <SelectTrigger className="border-brand-primary-200 focus:border-brand-primary-400 focus:ring-brand-primary-200">
              <SelectValue placeholder="Any age" />
            </SelectTrigger>
            <SelectContent className="border-brand-primary-200 bg-white shadow-lg">
              <SelectItem value="all">Any age</SelectItem>
              <SelectItem
                value="puppy"
                className="focus:bg-brand-primary-50 hover:bg-brand-primary-50"
              >
                Puppy (0-1 year)
              </SelectItem>
              <SelectItem
                value="adult"
                className="focus:bg-brand-primary-50 hover:bg-brand-primary-50"
              >
                Adult (1-7 years)
              </SelectItem>
              <SelectItem
                value="senior"
                className="focus:bg-brand-primary-50 hover:bg-brand-primary-50"
              >
                Senior (7+ years)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-brand-primary-700">
            Location
          </Label>
          <Select
            value={filters.location || "all"}
            onValueChange={(value) => handleSelectChange("location", value)}
          >
            <SelectTrigger className="border-brand-primary-200 focus:border-brand-primary-400 focus:ring-brand-primary-200">
              <SelectValue placeholder="Any location" />
            </SelectTrigger>
            <SelectContent className="border-brand-primary-200 bg-white shadow-lg">
              <SelectItem value="all">Any location</SelectItem>
              {LOCATION_OPTIONS.map((location) => (
                <SelectItem
                  key={location}
                  value={location}
                  className="focus:bg-brand-primary-50 hover:bg-brand-primary-50"
                >
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-brand-primary-100" />

        {/* Filter Actions */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="flex-1 border-brand-primary-200 text-brand-primary-700 hover:bg-brand-primary-50 hover:border-brand-primary-300"
          >
            Clear All
          </Button>
          {isMobile && onApplyFilters && (
            <Button
              onClick={onApplyFilters}
              className="flex-1 bg-gradient-to-r from-brand-primary-500 to-brand-secondary-500 hover:from-brand-primary-600 hover:to-brand-secondary-600 text-white font-medium"
            >
              Apply Filters
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
