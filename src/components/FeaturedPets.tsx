"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PetCard from "@/components/PetCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div ref={decorativeRef} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-[#E07A5F]/20 to-[#d4654a]/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-br from-[#81B29A]/20 to-[#6a9a82]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-gradient-to-br from-[#F4A460]/20 to-[#e89240]/10 rounded-full blur-xl"></div>
        <div className="absolute top-10 left-10 text-[#E07A5F]/10 text-6xl">
          🐾
        </div>
        <div className="absolute bottom-20 right-16 text-[#81B29A]/10 text-5xl">
          ❤️
        </div>
        <div className="absolute top-1/3 left-1/4 text-[#F4A460]/10 text-4xl">
          🏠
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-3 bg-[#E07A5F]/10 text-[#E07A5F] rounded-full text-base font-bold mb-8 border border-[#E07A5F]/20">
            ⭐ Featured Companions
          </div>
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight"
          >
            Meet Your Next
            <span className="block bg-gradient-to-r from-[#E07A5F] to-[#81B29A] bg-clip-text text-transparent mt-3">
              Best Friend
            </span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            These special companions are looking for their forever homes. Each
            one has been health-certified and is ready to bring joy to your
            family.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16"
        >
          {featuredPets.map((pet, index) => (
            <Link
              key={index}
              href={`/pet/${pet.id}`}
              className="group transform transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                <PetCard {...pet} />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Button
            ref={buttonRef}
            className="bg-gradient-to-r from-[#E07A5F] to-[#D86B56] hover:from-[#D86B56] hover:to-[#C85A45] text-white font-semibold px-12 py-6 text-lg rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg border-0"
          >
            View All Available Pets
            <span className="ml-2">🐾</span>
          </Button>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#E07A5F] mb-2">500+</div>
              <p className="text-gray-600">Happy Families</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#81B29A] mb-2">100%</div>
              <p className="text-gray-600">Health Certified</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F4A460] mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPets;
