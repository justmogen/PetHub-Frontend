"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface HeroContentProps {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
  matchButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const HeroContent: React.FC<HeroContentProps> = ({
  titleRef,
  subtitleRef,
  buttonRef,
  matchButtonRef,
}) => {
  const router = useRouter();

  return (
    <div className="max-w-4xl pt-24 md:pt-20 lg:pt-0">
      <div className="mb-6 md:mb-8">
        <span className="inline-block px-4 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-bold mb-4 md:mb-6 border border-brand-primary/30 bg-brand-primary/15 text-brand-primary shadow-soft hover:shadow-gentle transition-all duration-300 hover:bg-brand-primary/20 hover:border-brand-primary/40 cursor-default backdrop-blur-sm hover:scale-105">
          🏆 Kenya&apos;s Premier Pet Curation Service
        </span>
      </div>

      <h1
        ref={titleRef}
        className="font-extrabold mb-6 md:mb-8 leading-tight tracking-tight font-display text-foreground text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
      >
        Find Your Perfect
        <span className="block mt-2 md:mt-3 bg-gradient-to-r from-brand-primary via-brand-accent to-brand-secondary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
          Premium Pet
        </span>
      </h1>

      <p
        ref={subtitleRef}
        className="leading-relaxed max-w-3xl font-medium mb-8 md:mb-10 text-brand-primary/90 text-lg md:text-xl lg:text-2xl"
      >
        We handle everything from A to Z - personally curating quality pets from
        verified breeders.
        <span className="block mt-2 md:mt-3 font-semibold text-brand-secondary text-base md:text-lg lg:text-xl">
          Every companion comes with health guarantees & lifetime support.
        </span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-8">
        <Button
          ref={buttonRef}
          size="lg"
          className="group font-bold px-8 md:px-10 py-6 md:py-8 text-lg md:text-xl rounded-2xl border-0 text-white shadow-medium hover:shadow-strong bg-gradient-to-r from-brand-primary to-brand-primary/90 hover:from-brand-primary/90 hover:to-brand-primary transition-all duration-300 focus:ring-2 focus:ring-brand-primary/50 hover:-translate-y-1 hover:scale-105 active:scale-95"
          onClick={() => router.push("/pets")}
        >
          <span className="flex items-center gap-2">
            🐕 Browse Pets
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </span>
        </Button>

        <Button
          ref={matchButtonRef}
          size="lg"
          variant="outline"
          className="group font-bold px-8 md:px-10 py-6 md:py-8 text-lg md:text-xl rounded-2xl border-2 border-brand-secondary text-brand-secondary hover:-translate-y-1 transition-all duration-300 focus:ring-2 focus:ring-brand-secondary/50 hover:bg-brand-secondary/10 hover:border-brand-secondary/80 hover:scale-105 active:scale-95 hover:shadow-glow-teal"
          onClick={() => router.push("/match")}
        >
          <span className="flex items-center gap-2">
            ✨ Find My Match
            <span className="group-hover:rotate-12 transition-transform duration-300">
              ✨
            </span>
          </span>
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-6 md:gap-12 text-sm md:text-base">
        <div className="group flex items-center gap-2 md:gap-3 transition-all duration-300 hover:translate-y-[-2px] cursor-default">
          <span className="text-lg md:text-xl font-bold text-brand-primary group-hover:scale-110 transition-transform duration-300">
            ✓
          </span>
          <span className="font-semibold text-foreground group-hover:text-brand-primary transition-colors duration-300">
            Verified Breeders
          </span>
        </div>
        <div className="group flex items-center gap-2 md:gap-3 transition-all duration-300 hover:translate-y-[-2px] cursor-default">
          <span className="text-lg md:text-xl font-bold text-brand-secondary group-hover:scale-110 transition-transform duration-300">
            ✓
          </span>
          <span className="font-semibold text-foreground group-hover:text-brand-secondary transition-colors duration-300">
            Health Certified
          </span>
        </div>
        <div className="group flex items-center gap-2 md:gap-3 transition-all duration-300 hover:translate-y-[-2px] cursor-default">
          <span className="text-lg md:text-xl font-bold text-brand-accent group-hover:scale-110 transition-transform duration-300">
            ✓
          </span>
          <span className="font-semibold text-foreground group-hover:text-brand-accent transition-colors duration-300">
            Lifetime Support
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
