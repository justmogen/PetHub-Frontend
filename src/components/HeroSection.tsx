"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();

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
      opacity: 0.8,
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

    // Animation sequence
    tl.to(backgroundRef.current, {
      duration: 1.5,
      scale: 1,
      opacity: 1,
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
          opacity: 0.7,
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
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          ease: "power2.out",
        },
        "-=0.8"
      );

    // Continuous floating animations with more pronounced movement
    gsap.to(backgroundRef.current, {
      duration: 10,
      y: -30,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });

    // Enhanced floating paw prints with more visible movement
    gsap.to(pawsRef.current?.children || [], {
      duration: 5,
      y: -20,
      rotation: 20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.3,
    });

    // More dynamic floating elements animation
    gsap.to(floatingElementsRef.current?.children || [], {
      duration: 6,
      y: -25,
      x: 10,
      rotation: 10,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.8,
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] bg-gradient-to-br from-primary-50 via-white to-secondary-50 overflow-hidden"
      style={{
        background: `linear-gradient(135deg, 
          hsl(var(--primary-50)) 0%, 
          hsl(var(--background)) 50%, 
          hsl(var(--secondary-50)) 100%)`
      }}
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='hsl(var(--primary))' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      {/* Floating Paw Elements */}
      <div ref={pawsRef} className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-20 left-10 text-4xl" style={{ color: 'hsl(var(--primary) / 0.2)' }}>
          🐾
        </div>
        <div className="absolute top-1/3 right-20 text-3xl" style={{ color: 'hsl(var(--secondary) / 0.2)' }}>
          🐾
        </div>
        <div className="absolute bottom-32 left-1/4 text-5xl" style={{ color: 'hsl(var(--primary) / 0.15)' }}>
          🐾
        </div>
        <div className="absolute top-2/3 right-1/3 text-4xl" style={{ color: 'hsl(var(--secondary) / 0.25)' }}>
          🐾
        </div>
        <div className="absolute bottom-20 right-10 text-3xl" style={{ color: 'hsl(var(--primary) / 0.2)' }}>
          🐾
        </div>
      </div>

      {/* Floating Color Orbs */}
      <div
        ref={floatingElementsRef}
        className="absolute inset-0 pointer-events-none z-15"
      >
        <div 
          className="absolute top-20 left-16 w-24 h-24 rounded-full blur-xl"
          style={{
            background: `linear-gradient(135deg, 
              hsl(var(--primary) / 0.2) 0%, 
              hsl(var(--primary-600) / 0.1) 100%)`
          }}
        ></div>
        <div 
          className="absolute top-48 right-24 w-32 h-32 rounded-full blur-2xl"
          style={{
            background: `linear-gradient(135deg, 
              hsl(var(--secondary) / 0.2) 0%, 
              hsl(var(--secondary-600) / 0.1) 100%)`
          }}
        ></div>
        <div 
          className="absolute bottom-40 left-1/4 w-28 h-28 rounded-full blur-xl"
          style={{
            background: `linear-gradient(135deg, 
              hsl(var(--accent) / 0.2) 0%, 
              hsl(var(--accent-600) / 0.1) 100%)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 right-16 w-36 h-36 rounded-full blur-2xl"
          style={{
            background: `linear-gradient(135deg, 
              hsl(var(--secondary) / 0.15) 0%, 
              hsl(var(--primary) / 0.1) 100%)`
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 md:px-6 h-full flex items-center">
        <div className="max-w-4xl pt-24 md:pt-20 lg:pt-0">
          <div className="mb-6 md:mb-8">
            <span 
              className="inline-block px-3 py-1.5 md:px-4 md:py-2 lg:px-6 lg:py-3 rounded-full text-xs md:text-sm lg:text-base font-bold mb-4 md:mb-6 border"
              style={{
                backgroundColor: 'hsl(var(--primary) / 0.1)',
                color: 'hsl(var(--primary))',
                borderColor: 'hsl(var(--primary) / 0.2)'
              }}
            >
              🏆 Kenya&apos;s Premier Pet Curation Service
            </span>
          </div>

          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold mb-6 md:mb-8 leading-tight tracking-tight font-display"
            style={{
              color: 'hsl(var(--foreground))',
              fontSize: 'clamp(var(--font-size-3xl), 5vw, var(--font-size-5xl))'
            }}
          >
            Find Your Perfect
            <span 
              className="block mt-2 md:mt-3 bg-clip-text text-transparent"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(var(--primary)) 0%, 
                  hsl(var(--secondary)) 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Premium Pet
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 leading-relaxed max-w-3xl font-medium"
            style={{
              color: 'hsl(var(--primary-700))',
              fontSize: 'clamp(var(--font-size-base), 2.5vw, var(--font-size-xl))'
            }}
          >
            We handle everything from A to Z - personally curating quality pets
            from verified breeders.
            <span 
              className="block mt-2 md:mt-3 font-semibold"
              style={{
                color: 'hsl(var(--secondary))',
                fontSize: 'clamp(var(--font-size-lg), 2.8vw, var(--font-size-2xl))'
              }}
            >
              Every companion comes with health guarantees & lifetime support.
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-8">
            <Button
              ref={buttonRef}
              size="lg"
              className="font-bold px-8 md:px-10 py-6 md:py-8 text-lg md:text-xl rounded-2xl transition-all duration-300 hover:scale-105 border-0"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(var(--primary)) 0%, 
                  hsl(var(--primary-600)) 100%)`,
                color: 'hsl(var(--primary-foreground))',
                boxShadow: 'var(--shadow-strong)',
                borderRadius: 'var(--radius-2xl)'
              }}
              onClick={() => router.push("/pets")}
            >
              🐕 Browse Pets
            </Button>

            <Button
              ref={matchButtonRef}
              size="lg"
              variant="outline"
              className="font-bold px-8 md:px-10 py-6 md:py-8 text-lg md:text-xl rounded-2xl transition-all duration-300 hover:scale-105 border-2"
              style={{
                borderColor: 'hsl(var(--secondary))',
                color: 'hsl(var(--secondary))',
                borderRadius: 'var(--radius-2xl)',
                borderWidth: '2px'
              }}
              onClick={() => router.push("/match")}
            >
              ✨ Find My Match
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-6 md:gap-12 text-sm md:text-base">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-lg md:text-xl font-bold" style={{ color: 'hsl(var(--primary))' }}>✓</span>
              <span className="font-semibold" style={{ color: 'hsl(var(--neutral-700))' }}>Verified Breeders</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-lg md:text-xl font-bold" style={{ color: 'hsl(var(--secondary))' }}>✓</span>
              <span className="font-semibold" style={{ color: 'hsl(var(--neutral-700))' }}>Health Certified</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-lg md:text-xl font-bold" style={{ color: 'hsl(var(--primary))' }}>✓</span>
              <span className="font-semibold" style={{ color: 'hsl(var(--neutral-700))' }}>Lifetime Support</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="hidden lg:block absolute right-12 top-1/2 transform -translate-y-1/2 z-10">
          <div className="relative">
            <div 
              className="w-80 h-80 rounded-full blur-3xl absolute -inset-4"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(var(--primary) / 0.2) 0%, 
                  hsl(var(--secondary) / 0.2) 100%)`
              }}
            ></div>
            <Image
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&q=80"
              alt="Happy pet"
              width={288}
              height={288}
              className="w-72 h-72 object-cover rounded-full shadow-2xl relative z-10 border-4 border-white"
            />
            <div 
              className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl shadow-lg z-20"
              style={{
                backgroundColor: 'hsl(var(--primary))',
                boxShadow: 'var(--shadow-strong)'
              }}
            >
              🐾
            </div>
          </div>
        </div>
      </div>

      {/* Soft Wave Transition */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-16 sm:h-20"
          style={{ fill: 'hsl(var(--background))' }}
          preserveAspectRatio="none"
        >
          <path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
