import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function PetDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
      {/* Back button skeleton */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Skeleton className="h-10 w-20 rounded-lg" />
      </div>

      {/* Main content skeleton */}
      <div className="container mx-auto px-4 pb-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hero Section Skeleton */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main image skeleton */}
            <Card className="overflow-hidden border-brand-primary/10 shadow-xl">
              <Skeleton className="h-96 md:h-[500px] w-full rounded-lg" />
            </Card>

            {/* Thumbnail gallery skeleton */}
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton
                  key={i}
                  className="w-20 h-20 rounded-xl flex-shrink-0"
                />
              ))}
            </div>

            {/* Description skeleton */}
            <Card className="border-brand-primary/10 shadow-lg">
              <CardContent className="p-8 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
                <Skeleton className="h-8 w-48 mb-4 rounded-lg" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info Section Skeleton */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pet basic info skeleton */}
            <Card className="border-brand-primary/10 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
                <div className="flex items-start justify-between">
                  <div>
                    <Skeleton className="h-8 w-32 mb-2 rounded-lg" />
                    <Skeleton className="h-6 w-24 rounded-lg" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-lg" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-10 w-24 rounded-lg" />
                  <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4 rounded-lg" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Skeleton className="h-8 w-full rounded-lg" />
                  <Skeleton className="h-8 w-full rounded-lg" />
                </div>
              </CardContent>
            </Card>

            {/* Breeder info skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </CardContent>
            </Card>

            {/* Health info skeleton */}
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <div className="flex flex-wrap gap-1">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-18" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA skeleton */}
            <Card>
              <CardContent className="p-6 text-center">
                <Skeleton className="h-6 w-32 mx-auto mb-2" />
                <Skeleton className="h-4 w-48 mx-auto mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
