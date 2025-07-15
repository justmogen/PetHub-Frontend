"use client";

import { useState } from "react";
import { PetFilters } from "@/components/pets/PetFilters";
import { PetGrid } from "@/components/pets/PetGrid";
import { PetSortHeader } from "@/components/pets/PetSortHeader";
import { usePetFilters } from "@/hooks/usePetFilters";
import { usePetSorting } from "@/hooks/usePetSorting";
import { usePagination } from "@/hooks/usePagination";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function PetListingContainer() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Initialize filters and hooks
  const { filters, updateFilters, clearFilters } = usePetFilters();
  const { sortBy, setSortBy } = usePetSorting();
  const { currentPage, itemsPerPage } = usePagination();

  // Handle mobile filter toggle
  const handleMobileFilterToggle = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  const handleApplyMobileFilters = () => {
    setShowMobileFilters(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Find Your Perfect Pet
              </h1>
              <p className="text-muted-foreground mt-1">
                Browse through thousands of pets available for adoption
              </p>
            </div>

            {/* Mobile filter button */}
            <div className="md:hidden">
              <Button
                variant="outline"
                size="sm"
                onClick={handleMobileFilterToggle}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop filters sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-4">
              <PetFilters
                filters={filters}
                onFiltersChange={updateFilters}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 min-w-0">
            {/* Sort header */}
            <PetSortHeader
              sortBy={sortBy}
              onSortChange={setSortBy}
              filters={filters}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
            />

            {/* Pet grid */}
            <PetGrid filters={filters} sortBy={sortBy} />
          </div>
        </div>
      </div>

      {/* Mobile filters sheet */}
      <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
        <SheetContent side="left" className="w-full sm:w-80">
          <SheetHeader>
            <SheetTitle>Filter Pets</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <PetFilters
              filters={filters}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
              onApplyFilters={handleApplyMobileFilters}
              isMobile={true}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
