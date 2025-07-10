"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { breedCategoryImages } from "@/lib/images";

gsap.registerPlugin(ScrollTrigger);

const BreedExplorer = () => {
  const router = useRouter();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Breed categories with consistent design system colors
  const breedCategories = [
    {
      id: "doodle-breeds",
      title: "Doodle Breeds",
      subtitle: "Fluffy & Friendly",
      image: breedCategoryImages["doodle-breeds"],
      filter: "doodle",
      emoji: "🐩",
      bgColor: "bg-brand-primary-500",
      hoverColor: "hover:bg-brand-primary-600",
    },
    {
      id: "apartment-breeds",
      title: "Apartment Friendly",
      subtitle: "Perfect for City Life",
      image: breedCategoryImages["apartment-breeds"],
      filter: "apartment",
      emoji: "🏢",
      bgColor: "bg-brand-secondary-500",
      hoverColor: "hover:bg-brand-secondary-600",
    },
    {
      id: "teacup-breeds",
      title: "Teacup Breeds",
      subtitle: "Tiny & Adorable",
      image: breedCategoryImages["teacup-breeds"],
      filter: "teacup",
      emoji: "🫖",
      bgColor: "bg-brand-accent-500",
      hoverColor: "hover:bg-brand-accent-600",
    },
    {
      id: "family-breeds",
      title: "Family Favorites",
      subtitle: "Great with Kids",
      image: breedCategoryImages["family-breeds"],
      filter: "family",
      emoji: "👨‍👩‍👧‍👦",
      bgColor: "bg-brand-neutral-500",
      hoverColor: "hover:bg-brand-neutral-600",
    },
    {
      id: "allergy-friendly",
      title: "Hypoallergenic",
      subtitle: "Allergy Friendly",
      image: breedCategoryImages["allergy-friendly"],
      filter: "hypoallergenic",
      emoji: "🌿",
      bgColor: "bg-brand-primary-600",
      hoverColor: "hover:bg-brand-primary-700",
    },
    {
      id: "active-breeds",
      title: "Active Breeds",
      subtitle: "High Energy",
      image: breedCategoryImages["active-breeds"],
      filter: "active",
      emoji: "⚡",
      bgColor: "bg-brand-secondary-600",
      hoverColor: "hover:bg-brand-secondary-700",
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current?.children;
    if (!cards) return;

    // Set initial states
    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 20,
    });

    gsap.set(Array.from(cards), {
      opacity: 0,
      y: 30,
      scale: 0.95,
    });

    // Animation timeline with smoother animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to([titleRef.current, subtitleRef.current], {
      duration: 0.7,
      opacity: 1,
      y: 0,
      stagger: 0.15,
      ease: "power3.out",
    }).to(
      Array.from(cards),
      {
        duration: 0.5,
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        ease: "power2.out",
      },
      "-=0.2"
    );
  }, []);

  const handleCategoryClick = (filter: string) => {
    router.push(`/shop?breed_type=${filter}`);
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 bg-gradient-to-b from-muted/70 to-background relative overflow-hidden"
    >
      {/* Subtle background patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 right-[10%] w-40 h-40 bg-gradient-to-br from-brand-primary-500/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-[5%] w-48 h-48 bg-gradient-to-tr from-brand-secondary-500/8 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section header */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="inline-flex items-center px-4 py-1.5 bg-brand-primary-500/10 text-brand-primary-500 rounded-full text-sm font-medium mb-5 border border-brand-primary-500/15">
            <span className="mr-2 text-base">🔍</span> Breed Explorer
          </div>

          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4 md:mb-5 leading-tight"
          >
            Find Breeds for Your
            <span className="block bg-gradient-to-r from-brand-primary-500 to-brand-secondary-500 bg-clip-text text-transparent mt-1 md:mt-2">
              Lifestyle
            </span>
          </h2>

          <p
            ref={subtitleRef}
            className="text-base text-muted-foreground max-w-2xl mx-auto"
          >
            Discover the perfect breed that matches your living situation,
            activity level, and family needs.
          </p>
        </div>

        {/* Category cards - redesigned for better UX */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 max-w-6xl mx-auto"
        >
          {breedCategories.map((category, index) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.filter)}
              className="group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary-500 focus-visible:ring-offset-2 rounded-xl"
              tabIndex={0}
              role="button"
              aria-label={`Browse ${category.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleCategoryClick(category.filter);
                }
              }}
            >
              <div className="bg-card rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1 flex flex-col h-full border border-border/20 hover:border-border/40">
                {/* Image Container */}
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      priority={index < 3}
                    />

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-50 group-hover:opacity-70 transition-opacity"></div>
                  </div>

                  {/* Emoji badge */}
                  <div
                    className={`absolute top-2 right-2 w-8 h-8 ${category.bgColor} ${category.hoverColor} rounded-full shadow-sm flex items-center justify-center text-white transition-colors duration-300`}
                  >
                    <span className="text-base">{category.emoji}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 md:p-4 flex-grow flex flex-col">
                  <h3 className="text-sm font-semibold text-foreground group-hover:text-brand-primary-500 transition-colors duration-300 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-auto">
                    {category.subtitle}
                  </p>

                  {/* Action indicator */}
                  <div className="mt-3 pt-2 flex items-center text-xs text-muted-foreground/70 group-hover:text-brand-primary-500 transition-colors border-t border-border/20">
                    <span className="mr-1.5 text-[10px] font-medium">
                      Browse
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="transform transition-transform group-hover:translate-x-0.5"
                    >
                      <path
                        d="M13.75 6.75L19.25 12L13.75 17.25M19 12H4.75"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-5">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <button
            onClick={() => router.push("/shop")}
            className="inline-flex items-center bg-brand-primary-500 hover:bg-brand-primary-600 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-brand-primary-300 focus:ring-offset-2"
          >
            <span>Browse All Breeds</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="ml-2 transform transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M13.75 6.75L19.25 12L13.75 17.25M19 12H4.75"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BreedExplorer;
