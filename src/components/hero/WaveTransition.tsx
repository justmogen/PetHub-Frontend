"use client";

const WaveTransition: React.FC = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30">
      <svg
        viewBox="0 0 1200 120"
        className="w-full h-16 sm:h-20 md:h-24 fill-background transition-transform duration-300 hover:translate-y-1"
        preserveAspectRatio="none"
      >
        <path d="M0,60 C300,100 900,20 1200,60 L1200,120 L0,120 Z"></path>
      </svg>
    </div>
  );
};

export default WaveTransition;
