import { PawPrint } from "lucide-react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ className = "", size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative">
        <PawPrint
          className={`${sizeClasses[size]} text-[hsl(var(--accent))] drop-shadow-sm`}
        />
        <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[hsl(var(--primary))] rounded-full opacity-80"></div>
      </div>
      {showText && (
        <span
          className={`ml-3 font-bold text-white tracking-tight ${textSizeClasses[size]}`}
        >
          PawHub
        </span>
      )}
    </div>
  );
};

export default Logo;
