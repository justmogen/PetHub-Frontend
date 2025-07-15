/* eslint-disable */
import { useMemo } from "react";

interface UsePaginationProps {
  items: any[];
  itemsPerPage: number;
  currentPage: number;
}

export const usePagination = ({
  items,
  itemsPerPage,
  currentPage,
}: UsePaginationProps) => {
  return useMemo(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    return {
      totalPages,
      startIndex,
      endIndex,
      paginatedItems,
    };
  }, [items, itemsPerPage, currentPage]);
};
