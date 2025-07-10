import HeroSection from "@/components/HeroSection";
import { CategoryGrid } from "@/components/cards";
import FeaturedPets from "@/components/FeaturedPets";
import { RecentMatches, BreederSpotlight } from "@/components/shared";
import { BreedExplorer } from "@/components/breed-explorer";
// PetMatchingEvents moved to its own page

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedPets />
      <RecentMatches />
      <BreedExplorer />
      <BreederSpotlight />
    </>
  );
}
