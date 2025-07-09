import HeroSection from "@/components/HeroSection";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedPets from "@/components/FeaturedPets";
import RecentMatches from "@/components/RecentMatches";
import WhyChooseUs from "@/components/WhyChooseUs";
import BreedExplorer from "@/components/BreedExplorer";
import BreederSpotlight from "@/components/BreederSpotlight";
import PetMatchingEvents from "@/components/PetMatchingEvents";
import TrustSection from "@/components/TrustSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedPets />
      <RecentMatches />
      <WhyChooseUs />
      <BreedExplorer />
      <BreederSpotlight />
      <PetMatchingEvents />
      <TrustSection />
    </>
  );
}
