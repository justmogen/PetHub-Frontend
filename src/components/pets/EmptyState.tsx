import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Search } from "lucide-react";
import type { PetFilters } from "@/lib/api/types";

interface EmptyStateProps {
  filters: PetFilters;
}

export function EmptyState({ filters }: EmptyStateProps) {
  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && value !== "" && value !== false
  );

  return (
    <div className="flex justify-center items-center py-16">
      <Card className="w-full max-w-md border-brand-primary/10 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
        <CardContent className="flex flex-col items-center text-center p-8">
          <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6">
            {hasActiveFilters ? (
              <Search className="w-10 h-10 text-brand-primary" />
            ) : (
              <Heart className="w-10 h-10 text-brand-primary" />
            )}
          </div>

          <h3 className="text-xl font-bold text-brand-primary mb-3">
            {hasActiveFilters
              ? "No pets match your filters"
              : "No pets available"}
          </h3>

          <p className="text-muted-foreground mb-6 text-base">
            {hasActiveFilters
              ? "Try adjusting your search criteria to find more pets."
              : "Check back later for new pets, or adjust your search criteria."}
          </p>

          {hasActiveFilters && (
            <Button
              onClick={() => (window.location.href = "/pets")}
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-medium py-2 rounded-lg transition-colors"
            >
              Clear all filters
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
