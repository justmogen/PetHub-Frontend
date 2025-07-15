"use client";

import { useGetPetsQuery } from "@/lib/api/services/petApi";
import { PetCard } from "@/components/cards/PetCard";
import { PetGridSkeleton } from "./PetGridSkeleton";
import { EmptyState } from "./EmptyState";
import { PaginationControls } from "./PaginationControls";
import { usePagination } from "@/hooks/usePagination";
import type { PetFilters, PetSearchParams } from "@/lib/api/types";
import type { SortOption } from "@/hooks/usePetSorting";

interface PetGridProps {
  filters: PetFilters;
  sortBy: SortOption;
}

export function PetGrid({ filters, sortBy }: PetGridProps) {
  const { currentPage, itemsPerPage, setCurrentPage } = usePagination();

  // Convert filters to search params
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

  const searchParams: PetSearchParams = {
    ...filters,
    page: currentPage,
    limit: itemsPerPage,
    ordering: getOrdering(sortBy),
  };

  const { data, isLoading, error } = useGetPetsQuery(searchParams);

  if (isLoading) {
    return <PetGridSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-gradient-to-br from-error-50 to-error-100 rounded-lg p-8 max-w-md mx-auto border border-error-200">
          <div className="w-16 h-16 bg-error-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-error-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-error-700 mb-2">
            Unable to Load Pets
          </h3>
          <p className="text-error-600">
            Sorry, we couldn&apos;t load the pets. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  if (!data || data.data.length === 0) {
    return <EmptyState filters={filters} />;
  }

  return (
    <div className="space-y-6">
      {/* Pet Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.data.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>

      {/* Pagination */}
      {data.meta.total > itemsPerPage && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={Math.ceil(data.meta.total / itemsPerPage)}
          onPageChange={setCurrentPage}
          totalResults={data.meta.total}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
}
