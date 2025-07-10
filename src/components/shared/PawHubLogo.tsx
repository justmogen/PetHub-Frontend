import React from "react";

interface PawHubLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const PawHubLogo: React.FC<PawHubLogoProps> = ({
  width = 32,
  height = 32,
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle with Gradient */}
      <defs>
        <linearGradient id="pawHubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EB6F47" />
          <stop offset="100%" stopColor="#F2C57C" />
        </linearGradient>
        <linearGradient
          id="pawHubGradientHover"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#F2C57C" />
          <stop offset="100%" stopColor="#EB6F47" />
        </linearGradient>
      </defs>

      {/* Main Circle Background */}
      <circle
        cx="16"
        cy="16"
        r="16"
        fill="url(#pawHubGradient)"
        className="transition-all duration-300 group-hover:fill-[url(#pawHubGradientHover)]"
      />

      {/* Paw Print Design */}
      {/* Main Pad */}
      <ellipse
        cx="16"
        cy="18"
        rx="4"
        ry="3.5"
        fill="white"
        className="opacity-95"
      />

      {/* Top Left Toe */}
      <ellipse
        cx="11"
        cy="13"
        rx="2"
        ry="2.5"
        fill="white"
        className="opacity-95"
      />

      {/* Top Center Toe */}
      <ellipse
        cx="16"
        cy="11"
        rx="2"
        ry="2.5"
        fill="white"
        className="opacity-95"
      />

      {/* Top Right Toe */}
      <ellipse
        cx="21"
        cy="13"
        rx="2"
        ry="2.5"
        fill="white"
        className="opacity-95"
      />

      {/* Small Heart in Center */}
      <path
        d="M16 15.5c-.5-.5-1.3-.5-1.8 0-.5.5-.5 1.3 0 1.8l1.8 1.8 1.8-1.8c.5-.5.5-1.3 0-1.8-.5-.5-1.3-.5-1.8 0z"
        fill="#EB6F47"
        className="opacity-80"
      />

      {/* Subtle Inner Shadow */}
      <circle
        cx="16"
        cy="16"
        r="15.5"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        className="opacity-60"
      />
    </svg>
  );
};

export default PawHubLogo;
