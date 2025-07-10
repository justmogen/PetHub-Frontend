"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Importing modular components
import HeroBackground from "./hero/HeroBackground";
import FloatingPaws from "./hero/FloatingPaws";
import FloatingOrbs from "./hero/FloatingOrbs";
import HeroContent from "./hero/HeroContent";
import HeroImage from "./hero/HeroImage";
import WaveTransition from "./hero/WaveTransition";

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const matchButtonRef = useRef<HTMLButtonElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const pawsRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Set initial states
    gsap.set(
      [
        titleRef.current,
        subtitleRef.current,
        buttonRef.current,
        matchButtonRef.current,
      ],
      {
        opacity: 0,
        y: 50,
      }
    );

    gsap.set(backgroundRef.current, {
      scale: 1.1,
      opacity: 0.5, // Subtle initial opacity
    });

    gsap.set(pawsRef.current?.children || [], {
      opacity: 0,
      scale: 0.5,
      rotation: -45,
    });

    gsap.set(floatingElementsRef.current?.children || [], {
      opacity: 0,
      scale: 0.6,
    });

    // Animation sequence - elegant visible background
    tl.to(backgroundRef.current, {
      duration: 1.5,
      scale: 1,
      opacity: 0.9, // Match the className opacity-90
      ease: "power2.out",
    })
      .to(
        titleRef.current,
        {
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .to(
        subtitleRef.current,
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(
        [buttonRef.current, matchButtonRef.current],
        {
          duration: 0.6,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      )
      .to(
        pawsRef.current?.children || [],
        {
          duration: 1.2,
          opacity: 0.25, // More visible but still subtle
          scale: 1,
          rotation: 0,
          stagger: 0.15,
          ease: "elastic.out(1, 0.4)",
        },
        "-=0.4"
      )
      .to(
        floatingElementsRef.current?.children || [],
        {
          duration: 1.5,
          opacity: 0.25, // More visible for an elegant effect
          scale: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.8"
      );

    // Refined subtle floating background animation
    gsap.to(backgroundRef.current, {
      duration: 15,
      y: -20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Ultra-refined floating paw prints with subtle movement
    gsap.to(pawsRef.current?.children || [], {
      duration: 8,
      y: -15,
      rotation: 12,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5,
    });

    // Elegant subtle floating elements animation
    gsap.to(floatingElementsRef.current?.children || [], {
      duration: 12,
      y: -18,
      x: 8,
      rotation: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 1.2,
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] bg-gradient-to-br from-primary-50/40 via-background to-secondary-50/30 overflow-hidden"
    >
      {/* Background components */}
      <HeroBackground backgroundRef={backgroundRef} />
      <FloatingPaws pawsRef={pawsRef} />
      <FloatingOrbs floatingElementsRef={floatingElementsRef} />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex items-center">
        <HeroContent
          titleRef={titleRef}
          subtitleRef={subtitleRef}
          buttonRef={buttonRef}
          matchButtonRef={matchButtonRef}
        />

        {/* Hero Image */}
        <HeroImage />
      </div>

      {/* Wave transition at bottom */}
      <WaveTransition />
    </section>
  );
};

export default HeroSection;
