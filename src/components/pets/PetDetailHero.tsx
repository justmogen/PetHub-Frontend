"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react";
import type { Pet } from "@/lib/api/types";

interface PetDetailHeroProps {
  pet: Pet;
}

export function PetDetailHero({ pet }: PetDetailHeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const images =
    pet.images && pet.images.length > 0
      ? pet.images.map((img) => img.url)
      : [pet.primary_image || "/placeholder-pet.jpg"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-6">
      {/* Image Gallery */}
      <Card className="overflow-hidden border-brand-primary/10 shadow-xl">
        <div className="relative h-96 md:h-[500px] bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
          <Image
            src={images[currentImageIndex]}
            alt={pet.name}
            fill
            className="object-cover rounded-lg"
            priority
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

          {/* Image Navigation */}
          {images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-brand-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border-brand-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </>
          )}

          {/* Top Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsLiked(!isLiked)}
              className="bg-white/90 hover:bg-white border-brand-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isLiked ? "fill-red-500 text-red-500" : "hover:text-red-500"
                }`}
              />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="bg-white/90 hover:bg-white border-brand-primary/20 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Health Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {pet.vaccinations && pet.vaccinations.length > 0 && (
              <Badge className="text-white border-0 shadow-lg text-xs font-semibold bg-emerald-500/95 backdrop-blur-sm">
                <Shield className="w-3 h-3 mr-1" />
                Vaccinated
              </Badge>
            )}
            {pet.health_records && pet.health_records.length > 0 && (
              <Badge className="text-white border-0 shadow-lg text-xs font-semibold bg-blue-500/95 backdrop-blur-sm">
                <Stethoscope className="w-3 h-3 mr-1" />
                Health Records
              </Badge>
            )}
            <Badge className="text-white border-0 shadow-lg text-xs font-semibold bg-purple-500/95 backdrop-blur-sm">
              <Users className="w-3 h-3 mr-1" />
              Kid-Friendly
            </Badge>
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </Card>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                index === currentImageIndex
                  ? "border-brand-primary shadow-lg ring-2 ring-brand-primary/20"
                  : "border-transparent hover:border-brand-primary/50 hover:shadow-md"
              }`}
            >
              <Image
                src={image}
                alt={`${pet.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Pet Description */}
      <Card className="border-brand-primary/10 shadow-lg">
        <CardContent className="p-8 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
          <h2 className="text-3xl font-bold mb-6 text-brand-primary">
            About {pet.name}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg">
            {pet.description ||
              `Meet ${pet.name}, a wonderful ${pet.breed} looking for a loving home. This adorable companion is ready to bring joy and love to your family.`}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
