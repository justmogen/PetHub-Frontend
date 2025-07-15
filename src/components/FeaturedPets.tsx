"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// API and components
import { useGetFeaturedPetsQuery } from "@/lib/api/services/petApi";
import FloatingDecorations from "./featured-pets/FloatingDecorations";
import SectionHeader from "./featured-pets/SectionHeader";
import PetCardGrid from "./featured-pets/PetCardGrid";
import FooterButton from "./featured-pets/FooterButton";
import Stats from "./featured-pets/Stats";
import { FeaturedPetsSkeleton } from "./featured-pets/FeaturedPetsSkeleton";
import { FeaturedPetsError } from "./featured-pets/FeaturedPetsError";

gsap.registerPlugin(ScrollTrigger);

const FeaturedPets = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);

  // Fetch featured pets from API
  const { data: featuredPets, isLoading, error } = useGetFeaturedPetsQuery({ limit: 6 });

  // GSAP Animation setup
  useEffect(() => {
    // Only run animations if we have pets to display
    if (!featuredPets || featuredPets.length === 0) return;

    const cards = cardsRef.current?.children || [];
    const decorativeElements = decorativeRef.current?.children || [];

    // Set initial states
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 30,
    });

    gsap.set(Array.from(cards), {
      opacity: 0,
      y: 50,
      scale: 0.9,
    });

    gsap.set(buttonRef.current, {
      opacity: 0,
      y: 30,
    });

    gsap.set(Array.from(decorativeElements), {
      opacity: 0,
      scale: 0.8,
    });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Animate header
    tl.to([titleRef.current, subtitleRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.2,
    });

    // Animate cards
    tl.to(
      Array.from(cards),
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
      },
      "-=0.4"
    );

    // Animate button
    tl.to(
      buttonRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // Animate decorative elements
    tl.to(
      Array.from(decorativeElements),
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
      },
      "-=0.5"
    );

    // Floating animation for decorative elements
    gsap.to(Array.from(decorativeElements), {
      duration: 8,
      y: -20,
      x: 10,
      rotation: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 2,
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [featuredPets]);

  // Early return for loading state
  if (isLoading) {
    return <FeaturedPetsSkeleton />;
  }

  // Early return for error state
  if (error) {
    return <FeaturedPetsError onRetry={() => window.location.reload()} />;
  }

  // Early return if no pets available
  if (!featuredPets || featuredPets.length === 0) {
    return <FeaturedPetsError 
      title="No Featured Pets Available" 
      message="Check back later for our featured pets selection."
      onRetry={() => window.location.reload()} 
    />;
  }

  return (
    <section
      ref={sectionRef}
      className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background"
    >
      {/* Floating Background Elements */}
      <FloatingDecorations decorativeRef={decorativeRef} />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeader titleRef={titleRef} subtitleRef={subtitleRef} />
        <PetCardGrid cardsRef={cardsRef} pets={featuredPets} />

        <div className="text-center">
          <FooterButton buttonRef={buttonRef} />
          <Stats />
        </div>
      </div>
    </section>
  );
};

export default FeaturedPets;
