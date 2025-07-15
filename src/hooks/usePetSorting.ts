import { useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export type SortOption =
  | "newest"
  | "oldest"
  | "price-low"
  | "price-high"
  | "name";

export interface UseSortingResult {
  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;
}

export function usePetSorting(): UseSortingResult {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [sortBy, setSortByState] = useState<SortOption>(() => {
    const sort = searchParams.get("sort") as SortOption;
    return sort || "newest";
  });

  const setSortBy = useCallback(
    (newSortBy: SortOption) => {
      setSortByState(newSortBy);

      // Update URL with new sort
      const params = new URLSearchParams(searchParams);

      if (newSortBy !== "newest") {
        params.set("sort", newSortBy);
      } else {
        params.delete("sort");
      }

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return {
    sortBy,
    setSortBy,
  };
}
