import {
  Heart,
  Shield,
  Stethoscope,
  Users,
  Home,
  X,
  PawPrint,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import AdoptionForm from "./AdoptionForm";

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
      <Card className="overflow-hidden transition-all duration-500 bg-white border-0 group w-full max-w-sm mx-auto rounded-3xl">
        {/* Image Section */}
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Heart Button */}
          <button className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
          </button>

          {/* Health Badges - Redesigned */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isVaccinated && (
              <Badge className="bg-emerald-500/90 backdrop-blur-sm hover:bg-emerald-600 text-white border-0 shadow-md text-xs font-semibold">
                <Shield className="w-3 h-3 mr-1" />
                Vaccinated
              </Badge>
            )}
            {isVetChecked && (
              <Badge className="bg-blue-500/90 backdrop-blur-sm hover:bg-blue-600 text-white border-0 shadow-md text-xs font-semibold">
                <Stethoscope className="w-3 h-3 mr-1" />
                Vet-Checked
              </Badge>
            )}
            {isGoodWithKids && (
              <Badge className="bg-purple-500/90 backdrop-blur-sm hover:bg-purple-600 text-white border-0 shadow-md text-xs font-semibold">
                <Users className="w-3 h-3 mr-1" />
                Kid-Friendly
              </Badge>
            )}
          </div>

          {/* Available Badge - Enhanced */}
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-gradient-to-r from-[#E07A5F] to-[#D86B56] text-white border-0 shadow-lg px-3 py-1.5 text-xs font-bold rounded-full">
              <PawPrint className="w-3 h-3 mr-1" />
              Available Now
            </Badge>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-[#E07A5F] transition-colors leading-tight">
              {name}
            </h3>
            <p className="text-gray-600 font-medium text-base mb-3">{breed}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  🎂 {age}
                </span>
              </div>
              <span className="text-sm text-gray-500 flex items-center">
                📍 {location}
              </span>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-3">
            <Button
              onClick={handleChooseMe}
              className="w-full bg-gradient-to-r from-[#E07A5F] to-[#D86B56] hover:from-[#D86B56] hover:to-[#C85A45] text-white rounded-2xl py-3 font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl text-base"
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
