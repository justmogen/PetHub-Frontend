"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BreedExplorer = () => {
  const router = useRouter();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const breedCategories = [
    {
      id: "doodle-breeds",
      title: "Doodle Breeds",
      subtitle: "Fluffy & Friendly",
      image:
        "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=400&h=400",
      filter: "doodle",
      emoji: "🐩",
      color: "from-[#E07A5F] to-[#D86B56]",
    },
    {
      id: "apartment-breeds",
      title: "Apartment Friendly",
      subtitle: "Perfect for City Life",
      image:
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=400&h=400",
      filter: "apartment",
      emoji: "🏢",
      color: "from-[#81B29A] to-[#6BA183]",
    },
    {
      id: "teacup-breeds",
      title: "Teacup Breeds",
      subtitle: "Tiny & Adorable",
      image:
        "https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&q=80&w=400&h=400",
      filter: "teacup",
      emoji: "🫖",
      color: "from-[#F4A460] to-[#E89240]",
    },
    {
      id: "family-breeds",
      title: "Family Favorites",
      subtitle: "Great with Kids",
      image:
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&q=80&w=400&h=400",
      filter: "family",
      emoji: "👨‍👩‍👧‍👦",
      color: "from-[#8B7355] to-[#7A6348]",
    },
    {
      id: "allergy-friendly",
      title: "Hypoallergenic",
      subtitle: "Allergy Friendly",
      image:
        "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80&w=400&h=400",
      filter: "hypoallergenic",
      emoji: "🌿",
      color: "from-[#6B73FF] to-[#5A63E8]",
    },
    {
      id: "active-breeds",
      title: "Active Breeds",
      subtitle: "High Energy",
      image:
        "https://images.unsplash.com/photo-1551717743-49959800b1f6?auto=format&fit=crop&q=80&w=400&h=400",
      filter: "active",
      emoji: "⚡",
      color: "from-[#FF6B6B] to-[#E55A5A]",
    },
  ];

  useEffect(() => {
    const cards = cardsRef.current?.children;

    if (!cards) return;

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

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to([titleRef.current, subtitleRef.current], {
      duration: 0.8,
      opacity: 1,
      y: 0,
      stagger: 0.2,
      ease: "power2.out",
    }).to(
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
    );

    // Hover animations for cards
    Array.from(cards).forEach((card) => {
      const element = card as HTMLElement;

      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          duration: 0.3,
          y: -10,
          scale: 1.05,
          ease: "power2.out",
        });
      });

      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          duration: 0.3,
          y: 0,
          scale: 1,
          ease: "power2.out",
        });
      });
    });
  }, []);

  const handleCategoryClick = (filter: string) => {
    router.push(`/shop?breed_type=${filter}`);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-[#E07A5F]/10 to-[#D86B56]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-[#81B29A]/10 to-[#6BA183]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 text-[#F4A460]/5 text-6xl">
          🐾
        </div>
        <div className="absolute bottom-1/3 right-1/4 text-[#E07A5F]/5 text-8xl">
          ❤️
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-16 md:mb-20 text-center">
          <div className="inline-block px-6 py-3 bg-[#E07A5F]/10 text-[#E07A5F] rounded-full text-base font-bold mb-8 border border-[#E07A5F]/20">
            🔍 Breed Explorer
          </div>
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight"
          >
            Find Breeds for Your
            <span className="block bg-gradient-to-r from-[#E07A5F] to-[#81B29A] bg-clip-text text-transparent mt-3">
              Lifestyle
            </span>
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium px-4"
          >
            Discover the perfect breed that matches your living situation,
            activity level, and family needs.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 max-w-7xl mx-auto"
        >
          {breedCategories.map((category, index) => (
            <div
              key={index}
              onClick={() => handleCategoryClick(category.filter)}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100">
                {/* Image Container */}
                <div className="relative mb-3 md:mb-4">
                  <div className="w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Emoji Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-lg md:text-xl">{category.emoji}</span>
                  </div>

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color} rounded-b-xl md:rounded-b-2xl`}
                  ></div>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 mb-1 group-hover:text-[#E07A5F] transition-colors duration-300 leading-tight">
                    {category.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 font-medium">
                    {category.subtitle}
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  <div
                    className={`w-8 h-0.5 bg-gradient-to-r ${category.color} rounded-full mx-auto`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <button className="bg-gradient-to-r from-[#E07A5F] to-[#D86B56] hover:from-[#D86B56] hover:to-[#C85A45] text-white font-semibold px-6 md:px-8 py-3 md:py-4 text-sm md:text-base rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
            Browse All Breeds 🔍
          </button>
        </div>
      </div>
    </section>
  );
};

export default BreedExplorer;
