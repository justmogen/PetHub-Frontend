/* eslint-disable */
import {
  Heart,
  Shield,
  Stethoscope,
  Users,
  Home,
  // X, // Unused in this example
  // PawPrint, // Unused in this example
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import AdoptionForm from "@/components/adoptions/AdoptionForm";

interface PetCardProps {
  id: string;
  name: string;
  breed: string;
  age: string;
  price?: string;
  image: string;
  isVaccinated?: boolean;
  isVetChecked?: boolean;
  isGoodWithKids?: boolean;
  location: string;
}

const PetCard = ({
  id,
  name,
  breed,
  age,
  image,
  isVaccinated,
  isVetChecked,
  isGoodWithKids,
  location,
}: PetCardProps) => {
  const { toast } = useToast();
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);

  const handleChooseMe = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setShowAdoptionForm(true);
  };

  const handleAdoptionSubmit = (data: any) => {
    const message = `Hi! I'm ${data.name} from ${data.location}. I'm interested in adopting ${name} (${breed}). 

My details:
📱 Phone: ${data.phone}
🏠 Location: ${data.location}
🐾 Experience: ${data.experience}

Why I want to adopt ${name}:
${data.reason}

I'd love to discuss the adoption process with you. Thank you!`;

    const whatsappUrl = `https://wa.me/254712345678?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Connecting you with the breeder! 🐾",
      description: `Opening WhatsApp to discuss ${name}'s adoption.`,
    });

    setShowAdoptionForm(false);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white border border-gray-100 group w-full max-w-sm mx-auto">
        {/* Image Section */}
        <div className="relative h-40 sm:h-44 md:h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <button className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
            <Heart className="w-3 h-3 md:w-4 md:h-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>

          {/* Health Badges */}
          <div className="absolute top-2 md:top-3 left-2 md:left-3 flex flex-col gap-1">
            {isVaccinated && (
              <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 shadow-md text-xs">
                <Shield className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
                Vaccinated
              </Badge>
            )}
            {isVetChecked && (
              <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-0 shadow-md text-xs">
                <Stethoscope className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
                Vet-Checked
              </Badge>
            )}
            {isGoodWithKids && (
              <Badge className="bg-purple-500 hover:bg-purple-600 text-white border-0 shadow-md text-xs">
                <Users className="w-2.5 h-2.5 md:w-3 md:h-3 mr-1" />
                Kid-Friendly
              </Badge>
            )}
          </div>

          {/* Available Badge */}
          <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3">
            <Badge className="bg-[#E07A5F] hover:bg-[#d4654a] text-white border-0 shadow-md px-2 md:px-3 py-1 text-xs">
              Available for Adoption
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-3 md:p-4 lg:p-5">
          <div className="mb-3 md:mb-4">
            <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-1 md:mb-2 group-hover:text-[#E07A5F] transition-colors leading-tight">
              {name}
            </h3>
            <p className="text-gray-600 font-medium text-sm md:text-base">
              {breed}
            </p>
            <div className="flex items-center justify-between mt-1 md:mt-2">
              <span className="text-xs md:text-sm text-gray-500">{age}</span>
              <span className="text-xs md:text-sm text-gray-500 flex items-center truncate ml-2">
                📍 {location}
              </span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-2 md:space-y-3">
            <Button
              onClick={handleChooseMe}
              className="w-full bg-gradient-to-r from-[#E07A5F] to-[#d4654a] hover:from-[#d4654a] hover:to-[#c55a45] text-white rounded-xl py-2.5 md:py-3 font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-sm md:text-base"
            >
              <Home className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Choose Me! 💕
            </Button>

            <p className="text-center text-xs text-gray-500 italic">
              Ready to find my forever family
            </p>
          </div>
        </div>
      </Card>

      {/* Adoption Form Modal */}
      {showAdoptionForm && (
        <AdoptionForm
          petName={name}
          petBreed={breed}
          onSubmit={handleAdoptionSubmit}
          onClose={() => setShowAdoptionForm(false)}
        />
      )}
    </>
  );
};

export default PetCard;
