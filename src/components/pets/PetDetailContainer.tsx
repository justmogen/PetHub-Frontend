"use client";

import { useGetPetByIdQuery } from "@/lib/api/services/petApi";
import { PetDetailHero } from "./PetDetailHero";
import { PetDetailInfo } from "./PetDetailInfo";
import { PetDetailSkeleton } from "./PetDetailSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PetDetailContainerProps {
  petId: string;
}

export function PetDetailContainer({ petId }: PetDetailContainerProps) {
  const router = useRouter();
  const { data: pet, isLoading, error } = useGetPetByIdQuery(petId);

  if (isLoading) {
    return <PetDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5 flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-brand-primary/10 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-white"
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
            <h2 className="text-2xl font-bold text-brand-primary mb-3">
              Pet Not Found
            </h2>
            <p className="text-muted-foreground mb-6 text-base">
              Sorry, we couldn&apos;t find the pet you&apos;re looking for. It
              may have been sold or removed.
            </p>
            <Button
              onClick={() => router.push("/pets")}
              className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold py-3 rounded-lg shadow-lg transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Pets
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!pet) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
      {/* Back button */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2 border-brand-primary/20 hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* Pet Detail Content */}
      <div className="container mx-auto px-4 pb-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hero Section */}
          <div className="lg:col-span-2">
            <PetDetailHero pet={pet} />
          </div>

          {/* Info Section */}
          <div className="lg:col-span-1">
            <PetDetailInfo pet={pet} />
          </div>
        </div>
      </div>
    </div>
  );
}
