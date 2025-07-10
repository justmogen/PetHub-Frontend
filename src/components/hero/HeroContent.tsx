"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import styles from "../HeroSection.module.css";
import sharedGradients from "@/styles/shared/gradients.module.css";
import sharedTextEffects from "@/styles/shared/text-effects.module.css";

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
        <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-full text-xs md:text-sm lg:text-base font-bold mb-4 md:mb-6 border border-primary/20 bg-primary/10 text-primary shadow-sm hover:shadow transition-all duration-300 hover:bg-primary/15 cursor-default">
          🏆 Kenya&apos;s Premier Pet Curation Service
        </span>
      </div>

      <h1
        ref={titleRef}
        className={`font-extrabold mb-6 md:mb-8 leading-tight tracking-tight font-display text-foreground ${sharedTextEffects.titleClampLarge}`}
      >
        Find Your Perfect
        <span
          className={`block mt-2 md:mt-3 ${sharedGradients.textGradientPrimarySecondary}`}
        >
          Premium Pet
        </span>
      </h1>

      <p
        ref={subtitleRef}
        className={`leading-relaxed max-w-3xl font-medium mb-8 md:mb-10 text-primary-700 ${sharedTextEffects.subtitleClamp}`}
      >
        We handle everything from A to Z - personally curating quality pets from
        verified breeders.
        <span
          className={`block mt-2 md:mt-3 font-semibold text-secondary ${sharedTextEffects.accentClamp}`}
        >
          Every companion comes with health guarantees & lifetime support.
        </span>
      </p>

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-8">
        <Button
          ref={buttonRef}
          size="lg"
          className={`font-bold px-8 md:px-10 py-6 md:py-8 text-lg md:text-xl rounded-2xl transition-all duration-300 border-0 bg-gradient-to-br from-primary to-primary-600 text-primary-foreground shadow-md hover:-translate-y-1 ${styles.primaryButton} ${styles.buttonFocusRing}`}
          onClick={() => router.push("/pets")}
        >
          🐕 Browse Pets
        </Button>

        <Button
          ref={matchButtonRef}
          size="lg"
          variant="outline"
          className={`font-bold px-8 md:px-10 py-6 md:py-8 text-lg md:text-xl rounded-2xl transition-all duration-300 border-2 border-secondary text-secondary hover:-translate-y-1 ${styles.secondaryButton} ${styles.buttonFocusRing}`}
          onClick={() => router.push("/match")}
        >
          ✨ Find My Match
        </Button>
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-6 md:gap-12 text-sm md:text-base">
        <div className="flex items-center gap-2 md:gap-3 transition-transform duration-300 hover:translate-y-[-2px]">
          <span className="text-lg md:text-xl font-bold text-primary">✓</span>
          <span className="font-semibold text-foreground">
            Verified Breeders
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 transition-transform duration-300 hover:translate-y-[-2px]">
          <span className="text-lg md:text-xl font-bold text-secondary">✓</span>
          <span className="font-semibold text-foreground">
            Health Certified
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 transition-transform duration-300 hover:translate-y-[-2px]">
          <span className="text-lg md:text-xl font-bold text-primary">✓</span>
          <span className="font-semibold text-foreground">
            Lifetime Support
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
