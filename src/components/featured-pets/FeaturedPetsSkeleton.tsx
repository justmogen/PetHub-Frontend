"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedPetsSkeleton() {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-6 relative z-10">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-[600px] mx-auto" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Image Skeleton */}
                <Skeleton className="h-64 w-full" />

                {/* Content Skeleton */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-5 w-16" />
                  </div>

                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-20 mb-4" />

                  <div className="flex items-center gap-2 mb-4">
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                    <Skeleton className="h-4 w-4 rounded-full" />
                  </div>

                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="text-center">
          <Skeleton className="h-12 w-48 mx-auto mb-8" />

          {/* Stats Skeleton */}
          <div className="flex justify-center gap-8 mb-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="text-center">
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
