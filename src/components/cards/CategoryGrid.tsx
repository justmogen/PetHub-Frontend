"use client";

import { PawPrint } from "lucide-react";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Puppies",
    subtitle: "Find your loyal companion",
    icon: "🐕",
    color: "bg-gradient-to-br from-[#E07A5F] to-[#D86B56]",
    hoverColor: "from-[#D86B56] to-[#C85A45]",
    description: "Playful and loyal companions",
  },
  {
    title: "Kittens",
    subtitle: "Playful & affectionate",
    icon: "🐱",
    color: "bg-gradient-to-br from-[#81B29A] to-[#6BA183]",
    hoverColor: "from-[#6BA183] to-[#5A8F72]",
    description: "Independent and loving friends",
  },
  {
    title: "Birds",
    subtitle: "Colorful feathered friends",
    icon: "🦜",
    color: "bg-gradient-to-br from-[#F4A460] to-[#E89240]",
    hoverColor: "from-[#E89240] to-[#D17B20]",
    description: "Beautiful and intelligent companions",
  },
  {
    title: "Reptiles",
    subtitle: "Unique exotic pets",
    icon: "🦎",
    color: "bg-gradient-to-br from-[#8B7355] to-[#7A6348]",
    hoverColor: "from-[#7A6348] to-[#69523B]",
    description: "Fascinating and low-maintenance",
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-[#E07A5F]/10 text-[#E07A5F] rounded-full text-sm font-semibold mb-4">
            🏠 Pet Categories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-[#E07A5F] to-[#81B29A] bg-clip-text text-transparent mt-2">
              Companion Type
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each of our pets comes with complete health certificates,
            vaccination records, and lifetime support from our expert team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              title={category.title}
              subtitle={category.subtitle}
              icon={PawPrint}
              color={category.color}
              hoverColor={category.hoverColor}
              emoji={category.icon}
              description={category.description}
            />
          ))}
        </div>

        {/* Trust Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-[#E07A5F]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Health Certified
              </h3>
              <p className="text-gray-600 text-sm">
                All pets come with complete vet records
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-[#81B29A]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Verified Breeders
              </h3>
              <p className="text-gray-600 text-sm">
                Only trusted and licensed breeders
              </p>
            </div>
            <div className="flex flex-col items-center p-6">
              <div className="w-16 h-16 bg-[#F4A460]/10 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Lifetime Support
              </h3>
              <p className="text-gray-600 text-sm">
                Ongoing care guidance and support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
