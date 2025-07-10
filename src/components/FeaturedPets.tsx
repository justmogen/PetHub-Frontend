"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Importing modular components
import FloatingDecorations from "./featured-pets/FloatingDecorations";
import SectionHeader from "./featured-pets/SectionHeader";
import PetCardGrid from "./featured-pets/PetCardGrid";
import FooterButton from "./featured-pets/FooterButton";
import Stats from "./featured-pets/Stats";

gsap.registerPlugin(ScrollTrigger);

const FeaturedPets = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const decorativeRef = useRef<HTMLDivElement>(null);

  const featuredPets = [
    {
      id: "pet-1",
      name: "Bella",
      breed: "Golden Retriever",
      age: "2 years",
      price: "45,000",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=500",
      isVaccinated: true,
      isVetChecked: true,
      isGoodWithKids: true,
      location: "Nairobi, Kenya",
    },
    {
      id: "pet-2",
      name: "Max",
      breed: "German Shepherd",
      age: "1 year",
      price: "55,000",
      image:
        "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=500",
      isVaccinated: true,
      isVetChecked: true,
      isGoodWithKids: true,
      location: "Mombasa, Kenya",
    },
    {
      id: "pet-3",
      name: "Luna",
      breed: "Labrador Mix",
      age: "6 months",
      price: "35,000",
      image:
        "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500",
      isVaccinated: true,
      isVetChecked: false,
      isGoodWithKids: true,
      location: "Kisumu, Kenya",
    },
  ];

  useEffect(() => {
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

    tl.to(Array.from(decorativeElements), {
      duration: 1,
      opacity: 1,
      scale: 1,
      stagger: 0.2,
      ease: "power2.out",
    })
      .to(
        [titleRef.current, subtitleRef.current],
        {
          duration: 0.8,
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .to(
        Array.from(cards),
        {
          duration: 0.6,
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      )
      .to(
        buttonRef.current,
        {
          duration: 0.5,
          opacity: 1,
          y: 0,
          ease: "power2.out",
        },
        "-=0.2"
      );

    // Enhanced hover animations for cards
    if (cards.length > 0) {
      Array.from(cards).forEach((card) => {
        const element = card as HTMLElement;

        element.addEventListener("mouseenter", () => {
          gsap.to(element, {
            duration: 0.3,
            y: -10,
            scale: 1.02,
            boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
            ease: "power2.out",
          });
        });

        element.addEventListener("mouseleave", () => {
          gsap.to(element, {
            duration: 0.3,
            y: 0,
            scale: 1,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            ease: "power2.out",
          });
        });
      });
    }

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
  }, []);

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
