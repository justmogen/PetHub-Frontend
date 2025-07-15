import { useState, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export interface UsePaginationResult {
  currentPage: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
}

export function usePagination(
  defaultItemsPerPage: number = 12
): UsePaginationResult {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [currentPage, setCurrentPageState] = useState(() => {
    const page = searchParams.get("page");
    return page ? parseInt(page) : 1;
  });

  const [itemsPerPage, setItemsPerPageState] = useState(() => {
    const limit = searchParams.get("limit");
    return limit ? parseInt(limit) : defaultItemsPerPage;
  });

  const setCurrentPage = useCallback(
    (page: number) => {
      setCurrentPageState(page);

      // Update URL with new page
      const params = new URLSearchParams(searchParams);

      if (page > 1) {
        params.set("page", page.toString());
      } else {
        params.delete("page");
      }

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const setItemsPerPage = useCallback(
    (newItemsPerPage: number) => {
      setItemsPerPageState(newItemsPerPage);
      setCurrentPageState(1); // Reset to first page

      // Update URL with new limit
      const params = new URLSearchParams(searchParams);

      if (newItemsPerPage !== defaultItemsPerPage) {
        params.set("limit", newItemsPerPage.toString());
      } else {
        params.delete("limit");
      }
      params.delete("page"); // Reset page

      const newUrl = `${pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    },
    [searchParams, pathname, router, defaultItemsPerPage]
  );

  return {
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
  };
}
