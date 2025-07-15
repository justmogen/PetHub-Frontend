import { Metadata } from "next";
import { PetListingContainer } from "@/components/pets/PetListingContainer";

export const metadata: Metadata = {
  title: "Find Your Perfect Pet | Pet Hub",
  description:
    "Browse through thousands of pets. Find your perfect companion with advanced filtering and detailed pet profiles.",
  keywords: [
    "pets",
    "adoption",
    "dogs",
    "cats",
    "puppies",
    "kittens",
    "pet marketplace",
  ],
  openGraph: {
    title: "Find Your Perfect Pet | Pet Hub",
    description:
      "Browse through thousands of pets available for adoption. Find your perfect companion with advanced filtering and detailed pet profiles.",
    type: "website",
  },
};

export default function PetsPage() {
  return <PetListingContainer />;
}
