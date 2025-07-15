/* eslint-disable */
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import PetCard from "./PetCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { FilterState } from "./PetFilters";
import { usePetSorting } from "@/hooks/usePetSorting";
import { usePagination } from "@/hooks/usePagination";
import LifestyleFilterBanner from "./PetGrid/LifestyleFilterBanner";
import SortHeader from "./PetGrid/SortHeader";
import EmptyState from "./PetGrid/EmptyState";
import PetGridContainer from "./PetGrid/PetGridContainer";

interface PetGridProps {
  category: string;
  filters: FilterState;
}

const PetGrid = ({ category, filters }: PetGridProps) => {
  const [sortBy, setSortBy] = useState("newest");
  const [searchParams] = useSearchParams();
  const breedType = searchParams.get("breed_type");

  // Use the container logic
  const gridData = PetGridContainer({ category, filters, sortBy, setSortBy });

  return (
    <div>
      {/* Lifestyle Filter Banner */}
      {breedType && <LifestyleFilterBanner breedType={breedType} />}

      {/* Sort and Results Header */}
      <SortHeader
        sortBy={sortBy}
        setSortBy={setSortBy}
        startIndex={(gridData.currentPage - 1) * 9}
        endIndex={Math.min(
          gridData.currentPage * 9,
          gridData.sortedPets.length
        )}
        totalResults={gridData.sortedPets.length}
        breedType={breedType}
      />

      {/* Pet Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {gridData.paginatedPets.map((pet) => (
          <Link key={pet.id} to={`/pet/${pet.id}`}>
            <PetCard {...pet} />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {gridData.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (gridData.currentPage > 1) {
                      gridData.handlePageChange(gridData.currentPage - 1);
                    }
                  }}
                  className={
                    gridData.currentPage <= 1
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-[#F4EBD9] hover:text-[#E07A5F]"
                  }
                />
              </PaginationItem>

              {/* Page Numbers */}
              {Array.from(
                { length: Math.min(5, gridData.totalPages) },
                (_, i) => {
                  let pageNum;
                  if (gridData.totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (gridData.currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (gridData.currentPage >= gridData.totalPages - 2) {
                    pageNum = gridData.totalPages - 4 + i;
                  } else {
                    pageNum = gridData.currentPage - 2 + i;
                  }

                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        isActive={pageNum === gridData.currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          gridData.handlePageChange(pageNum);
                        }}
                        className={
                          pageNum === gridData.currentPage
                            ? "bg-[#E07A5F] text-white hover:bg-[#d4654a]"
                            : "hover:bg-[#F4EBD9] hover:text-[#E07A5F]"
                        }
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (gridData.currentPage < gridData.totalPages) {
                      gridData.handlePageChange(gridData.currentPage + 1);
                    }
                  }}
                  className={
                    gridData.currentPage >= gridData.totalPages
                      ? "pointer-events-none opacity-50"
                      : "hover:bg-[#F4EBD9] hover:text-[#E07A5F]"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Empty State */}
      {gridData.sortedPets.length === 0 && <EmptyState breedType={breedType} />}
    </div>
  );
};

export default PetGrid;
