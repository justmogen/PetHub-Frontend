"use client";

import Image from "next/image";

const HeroImage: React.FC = () => {
  return (
    <div className="hidden lg:block absolute right-12 top-1/2 transform -translate-y-1/2 z-10">
      <div className="relative">
        <div className="w-80 h-80 rounded-full blur-3xl absolute -inset-4 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        <Image
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop&q=80"
          alt="Happy pet"
          width={288}
          height={288}
          className="w-72 h-72 object-cover rounded-full shadow-2xl relative z-10 border-4 border-white"
        />
        <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl z-20 bg-primary shadow-lg">
          🐾
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
