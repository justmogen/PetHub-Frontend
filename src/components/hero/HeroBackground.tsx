"use client";

interface HeroBackgroundProps {
  backgroundRef: React.RefObject<HTMLDivElement | null>;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ backgroundRef }) => {
  return (
    <div ref={backgroundRef} className="absolute inset-0 opacity-90">
      {/* Primary gradient with smooth animation */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 via-brand-accent/5 to-brand-secondary/10 transition-all duration-700 animate-pulse"></div>

      {/* Secondary overlay with float animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/40 transition-all duration-1000 animate-float"></div>

      {/* Decorative radial gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-brand-primary/20 via-brand-primary/5 to-transparent rounded-full blur-3xl animate-bounce-gentle"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-brand-secondary/20 via-brand-secondary/5 to-transparent rounded-full blur-3xl animate-float"></div>
    </div>
  );
};

export default HeroBackground;
