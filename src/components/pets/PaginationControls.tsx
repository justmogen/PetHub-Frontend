import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  itemsPerPage: number;
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  itemsPerPage,
}: PaginationControlsProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
      const end = Math.min(totalPages, start + maxVisible - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (start > 1) {
        pages.unshift("...");
        pages.unshift(1);
      }

      if (end < totalPages) {
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5 rounded-xl border border-brand-primary/10">
      {/* Results info */}
      <div className="text-sm text-muted-foreground font-medium">
        Showing{" "}
        <span className="font-bold text-brand-primary">{startItem}</span> to{" "}
        <span className="font-bold text-brand-primary">{endItem}</span> of{" "}
        <span className="font-bold text-brand-primary">{totalResults}</span>{" "}
        results
      </div>

      {/* Pagination buttons */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 border-brand-primary/20 hover:bg-brand-primary hover:text-white disabled:opacity-50"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        {getVisiblePages().map((page, index) => (
          <Button
            key={index}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`w-8 h-8 p-0 ${
              page === currentPage
                ? "bg-brand-primary text-white hover:bg-brand-primary/90"
                : "border-brand-primary/20 hover:bg-brand-primary hover:text-white"
            }`}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 border-brand-primary/20 hover:bg-brand-primary hover:text-white disabled:opacity-50"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
