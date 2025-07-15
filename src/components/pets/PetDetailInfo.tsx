"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  Heart,
  Phone,
  Mail,
  User,
  PawPrint,
  DollarSign,
} from "lucide-react";
import type { Pet } from "@/lib/api/types";
import { useState } from "react";
import { AdoptionForm } from "../adoptions";

interface PetDetailInfoProps {
  pet: Pet;
}

interface AdoptionFormData {
  name: string;
  phone: string;
  location: string;
  experience: string;
  reason: string;
}

export function PetDetailInfo({ pet }: PetDetailInfoProps) {
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);

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
    setShowAdoptionForm(false);
  };

  return (
    <>
      <div className="space-y-6 sticky top-4">
        {/* Pet Basic Info */}
        <Card className="border-brand-primary/10 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl text-brand-primary">
                  {pet.name}
                </CardTitle>
                <p className="text-muted-foreground text-lg">{pet.breed}</p>
              </div>
              <Badge
                variant={pet.is_available ? "default" : "secondary"}
                className={
                  pet.is_available ? "bg-brand-primary text-white" : ""
                }
              >
                {pet.is_available ? "Available" : "Not Available"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
            {/* Price */}
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-brand-primary">
                {pet.formatted_price}
              </span>
              <Button
                onClick={() => setShowAdoptionForm(true)}
                className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
                disabled={!pet.is_available}
              >
                <Heart className="w-4 h-4 mr-2" />
                Adopt Me!
              </Button>
            </div>

            <Separator />

            {/* Pet Details */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Age:</span>
                <span className="font-medium">{pet.display_age}</span>
              </div>

              <div className="flex items-center gap-2">
                <PawPrint className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Gender:</span>
                <span className="font-medium capitalize">{pet.gender}</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Location:</span>
                <span className="font-medium">{pet.location}</span>
              </div>
            </div>

            <Separator />

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Call Breeder
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Breeder Info */}
        <Card className="border-brand-primary/10 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
            <CardTitle className="text-lg text-brand-primary">
              Breeder Information
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <p className="font-medium">{pet.breeder.name}</p>
                <p className="text-sm text-muted-foreground">
                  {pet.breeder.business_name || "Professional Breeder"}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Location:</strong> {pet.breeder.location}
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Experience:</strong> {pet.breeder.years_experience}{" "}
                years
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Specializes in:</strong> {pet.breed}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Health Information */}
        <Card className="border-brand-primary/10 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-brand-primary/5 to-brand-secondary/5">
            <CardTitle className="text-lg text-brand-primary">
              Health Information
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-gradient-to-br from-brand-primary/5 to-brand-secondary/5">
            <div className="space-y-3">
              {pet.vaccinations && pet.vaccinations.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Vaccinations:</p>
                  <div className="flex flex-wrap gap-1">
                    {pet.vaccinations.map((vaccination, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-brand-primary/10 text-brand-primary text-xs"
                      >
                        {vaccination.vaccine_name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {pet.health_records && pet.health_records.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Health Records:</p>
                  <p className="text-sm text-muted-foreground">
                    {pet.health_records.length} health record(s) available
                  </p>
                </div>
              )}

              <div className="text-sm text-muted-foreground">
                <p>✓ Veterinarian examined</p>
                <p>✓ Health certificate provided</p>
                <p>✓ Up-to-date on vaccinations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border-brand-primary/20 shadow-lg">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold mb-2 text-brand-primary">
              Ready to meet {pet.name}?
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Contact the breeder to schedule a visit or ask questions.
            </p>
            <Button
              onClick={() => setShowAdoptionForm(true)}
              className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Start Adoption Process
            </Button>
          </CardContent>
        </Card>
      </div>

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
}
