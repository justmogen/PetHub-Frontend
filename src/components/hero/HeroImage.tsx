"use client";

import Image from "next/image";

const HeroImage: React.FC = () => {
  return (
    <div className="hidden lg:block absolute right-12 top-1/2 transform -translate-y-1/2 z-10">
      <div className="relative group">
        {/* Background glow effect */}
        <div className="w-80 h-80 rounded-full blur-3xl absolute -inset-4 bg-gradient-to-br from-brand-primary/30 to-brand-secondary/30 group-hover:from-brand-primary/40 group-hover:to-brand-secondary/40 transition-all duration-500 animate-pulse"></div>

        {/* Secondary glow layer */}
        <div className="w-72 h-72 rounded-full blur-xl absolute inset-0 bg-gradient-to-tr from-brand-accent/20 to-brand-primary/20 group-hover:scale-110 transition-transform duration-500"></div>

        <Image
          src="/images/breeds/family-favorites.jpg"
          alt="Happy family pet"
          width={288}
          height={288}
          className="w-72 h-72 object-cover rounded-full shadow-strong relative z-10 border-4 border-white group-hover:border-brand-primary/20 transition-all duration-500 group-hover:scale-105 group-hover:shadow-glow"
        />

        <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl z-20 bg-gradient-to-r from-brand-primary to-brand-primary/90 shadow-medium group-hover:shadow-glow group-hover:scale-110 transition-all duration-300 border-2 border-white">
          🐾
        </div>

        {/* Floating decorative elements */}
        <div className="absolute -top-6 -left-6 w-8 h-8 rounded-full bg-gradient-to-r from-brand-accent to-brand-secondary/80 animate-bounce-gentle opacity-60"></div>
        <div className="absolute -bottom-8 left-6 w-6 h-6 rounded-full bg-gradient-to-r from-brand-secondary to-brand-primary/80 animate-float opacity-50"></div>
      </div>
    </div>
  );
};

export default HeroImage;
