"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";
import { useGetPetsQuery } from "@/lib/api/services/petApi";
import type { PetFilters, PetSearchParams } from "@/lib/api/types";
import type { SortOption } from "@/hooks/usePetSorting";
import { useState } from "react";

interface PetSortHeaderProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  filters: PetFilters;
  currentPage?: number;
  itemsPerPage?: number;
}

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
] as const;

export function PetSortHeader({
  sortBy,
  onSortChange,
  filters,
  currentPage = 1,
  itemsPerPage = 12,
}: PetSortHeaderProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get ordering for API call
  const getOrdering = (sortBy: SortOption): PetSearchParams["ordering"] => {
    switch (sortBy) {
      case "newest":
        return "-created_at";
      case "oldest":
        return "created_at";
      case "price-low":
        return "price";
      case "price-high":
        return "-price";
      default:
        return "-created_at";
    }
  };

  // Get data for results count
  const searchParams: PetSearchParams = {
    ...filters,
    page: currentPage,
    limit: itemsPerPage,
    ordering: getOrdering(sortBy),
  };

  const { data, isLoading } = useGetPetsQuery(searchParams);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.breed) count++;
    if (filters.gender) count++;
    if (filters.age_range) count++;
    if (filters.location) count++;
    if (filters.search) count++;
    if (filters.is_featured) count++;
    if (filters.min_price !== 0 || filters.max_price !== 5000) count++;
    return count;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Results info */}
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-sm text-muted-foreground">
          {isLoading ? (
            "Loading pets..."
          ) : (
            <>
              {data && data.meta.total > 0
                ? `${data.meta.total} pet${
                    data.meta.total !== 1 ? "s" : ""
                  } found`
                : "No pets found"}
            </>
          )}
        </p>

        {getActiveFiltersCount() > 0 && (
          <Badge variant="secondary" className="text-xs">
            {getActiveFiltersCount()} filter
            {getActiveFiltersCount() !== 1 ? "s" : ""} active
          </Badge>
        )}
      </div>

      {/* Sort controls */}
      <div className="flex items-center gap-3">
        {/* View mode toggle */}
        <div className="flex items-center border rounded-md">
          <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="px-3"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="px-3"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        {/* Sort selector */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg">
            {SORT_OPTIONS.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="hover:bg-gray-50"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
