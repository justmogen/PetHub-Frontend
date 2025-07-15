import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PetFilters, { FilterState } from "@/components/PetFilters";
import PetGrid from "@/components/PetGrid";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceRange: 100000,
    isVaccinated: false,
    isVetChecked: false,
    isGoodWithKids: false,
    isMicrochipped: false,
  });

  const category = searchParams.get("category") || "all";

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Don't auto-close filters here - let users continue adjusting
  };

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Close mobile filters when Apply button is clicked
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFilters({
      priceRange: 100000,
      isVaccinated: false,
      isVetChecked: false,
      isGoodWithKids: false,
      isMicrochipped: false,
    });
    // Hide mobile filters when filters are cleared
    setShowFilters(false);
  };

  return (
    <div className="min-h-screen bg-[#F4EBD9] overflow-x-hidden">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 md:py-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
                {category === "all"
                  ? "All Pets"
                  : `${category.charAt(0).toUpperCase() + category.slice(1)}`}
              </h1>
              <p className="text-gray-600 mt-1 text-sm md:text-base">
                Find your perfect companion
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <Button
              variant="outline"
              className="md:hidden border-[#E07A5F] text-[#E07A5F] hover:bg-orange-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-6 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Filters Sidebar */}
          <div
            className={`md:w-64 ${showFilters ? "block" : "hidden md:block"}`}
          >
            <PetFilters
              category={category}
              onFiltersChange={handleFiltersChange}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Pet Grid */}
          <div className="flex-1 min-w-0">
            <PetGrid category={category} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
