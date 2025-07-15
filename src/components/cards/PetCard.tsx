"use client";

import {
  Heart,
  Shield,
  Stethoscope,
  Users,
  Home,
  PawPrint,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { AdoptionForm } from "../adoptions";
import type { Pet } from "@/lib/api/types";

interface PetCardProps {
  pet: Pet;
}

interface AdoptionFormData {
  name: string;
  phone: string;
  location: string;
  experience: string;
  reason: string;
}

const PetCard = ({ pet }: PetCardProps) => {
  const { toast } = useToast();
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);

  const handleChooseMe = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setShowAdoptionForm(true);
  };

  const handleAdoptionSubmit = (data: AdoptionFormData) => {
    const message = `Hi! I'm ${data.name} from ${data.location}. I'm interested in adopting ${pet.name} (${pet.breed}). 

My details:
📱 Phone: ${data.phone}
🏠 Location: ${data.location}
🐾 Experience: ${data.experience}

Why I want to adopt ${pet.name}:
${data.reason}

I'd love to discuss the adoption process with you. Thank you!`;

    const whatsappUrl = `https://wa.me/254700123456?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Connecting you with the breeder! 🐾",
      description: `Opening WhatsApp to discuss ${pet.name}'s adoption.`,
    });

    setShowAdoptionForm(false);
  };

  return (
    <>
      <Link href={`/pets/${pet.id}`}>
        <Card className="overflow-hidden transition-all duration-500 bg-white border-0 group w-full max-w-sm mx-auto rounded-3xl hover:shadow-xl hover:shadow-brand-primary/20 hover:border-brand-primary/20">
          {/* Image Section */}
          <div className="relative h-48 sm:h-52 overflow-hidden">
            <Image
              src={pet.primary_image || "/placeholder-pet.jpg"}
              alt={pet.name}
              width={400}
              height={300}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/20 to-transparent"></div>

            {/* Heart Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Handle favorite logic here
              }}
              className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
            >
              <Heart className="w-4 h-4 text-gray-600 hover:text-brand-accent transition-colors" />
            </button>

            {/* Health Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {pet.vaccinations && pet.vaccinations.length > 0 && (
                <Badge className="text-white border-0 shadow-md text-xs font-semibold bg-emerald-500/90 backdrop-blur-sm hover:bg-emerald-500">
                  <Shield className="w-3 h-3 mr-1" />
                  Vaccinated
                </Badge>
              )}
              {pet.health_records && pet.health_records.length > 0 && (
                <Badge className="text-white border-0 shadow-md text-xs font-semibold bg-blue-500/90 backdrop-blur-sm hover:bg-blue-500">
                  <Stethoscope className="w-3 h-3 mr-1" />
                  Health Records
                </Badge>
              )}
              <Badge className="text-white border-0 shadow-md text-xs font-semibold bg-purple-500/90 backdrop-blur-sm hover:bg-purple-500">
                <Users className="w-3 h-3 mr-1" />
                Kid-Friendly
              </Badge>
            </div>

            {/* Available Badge */}
            <div className="absolute bottom-4 left-4">
              <Badge className="text-white border-0 shadow-lg px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-brand-primary to-brand-primary/90">
                <PawPrint className="w-3 h-3 mr-1" />
                {pet.is_available ? "Available Now" : "Not Available"}
              </Badge>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            <div className="mb-4">
              <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-brand-primary transition-colors leading-tight">
                {pet.name}
              </h3>
              <p className="text-gray-600 font-medium text-base mb-3">
                {pet.breed}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    🎂 {pet.display_age}
                  </span>
                </div>
                <span className="text-sm text-gray-500 flex items-center">
                  📍 {pet.location}
                </span>
              </div>
              {pet.price && (
                <div className="mt-3">
                  <span className="text-2xl font-bold text-brand-primary">
                    KES {pet.price.toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            {/* Call to Action */}
            <div className="space-y-3">
              <Button
                onClick={handleChooseMe}
                className="w-full text-white rounded-2xl py-3 font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-base bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary/80"
              >
                <Home className="w-4 h-4 mr-2" />
                Adopt Me Today! 💕
              </Button>

              <p className="text-center text-xs text-gray-500 italic">
                💕 Ready to bring joy to your family
              </p>
            </div>
          </div>
        </Card>
      </Link>

      {/* Adoption Form Modal */}
      {showAdoptionForm && (
        <AdoptionForm
          petName={pet.name}
          petBreed={pet.breed}
          onSubmit={handleAdoptionSubmit}
          onClose={() => setShowAdoptionForm(false)}
        />
      )}
    </>
  );
};

export { PetCard };
