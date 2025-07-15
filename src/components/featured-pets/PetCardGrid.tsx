"use client";

import Link from "next/link";
import { PetCard } from "@/components/cards/PetCard";
import type { Pet } from "@/lib/api/types";

interface PetCardGridProps {
  cardsRef: React.RefObject<HTMLDivElement | null>;
  pets: Pet[];
}

const PetCardGrid: React.FC<PetCardGridProps> = ({ cardsRef, pets }) => {
  return (
    <div
      ref={cardsRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16"
    >
      {pets.map((pet, index) => (
        <Link
          key={index}
          href={`/pets/${pet.id}`}
          className="group transform transition-all duration-300"
        >
          <div className="rounded-3xl shadow-lg overflow-hidden bg-card border border-border transition-all duration-300 hover:scale-105 hover:shadow-md">
            <PetCard pet={pet} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PetCardGrid;
