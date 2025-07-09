"use client";

import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface CategoryCardProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  hoverColor: string;
  emoji?: string;
  description?: string;
}

const CategoryCard = ({
  title,
  subtitle,
  icon: Icon,
  color,
  hoverColor,
  emoji,
  description,
}: CategoryCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    const category = title.toLowerCase();
    router.push(`/shop?category=${category}`);
  };

  return (
    <Card
      className={`${color} hover:${hoverColor} cursor-pointer transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0 rounded-3xl overflow-hidden group relative`}
      onClick={handleClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16zm16 0c0-8.837-7.163-16-16-16s-16 7.163-16 16 7.163 16 16 16 16-7.163 16-16z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative p-8 text-center">
        <div className="flex flex-col items-center space-y-6">
          {/* Main Icon/Emoji */}
          <div className="relative">
            <div className="w-20 h-20 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:scale-110">
              {emoji ? (
                <span className="text-3xl">{emoji}</span>
              ) : (
                <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
              )}
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
              <span className="text-xs">✨</span>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-2">
            <h3 className="font-bold text-xl text-white group-hover:scale-105 transition-transform duration-300">
              {title}
            </h3>
            <p className="text-white/90 text-sm font-medium">{subtitle}</p>
            {description && (
              <p className="text-white/70 text-xs mt-2">{description}</p>
            )}
          </div>

          {/* Hover Arrow */}
          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">→</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
