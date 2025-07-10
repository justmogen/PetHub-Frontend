"use client";

interface FloatingOrbsProps {
  floatingElementsRef: React.RefObject<HTMLDivElement | null>;
}

const FloatingOrbs: React.FC<FloatingOrbsProps> = ({ floatingElementsRef }) => {
  return (
    <div
      ref={floatingElementsRef}
      className="absolute inset-0 pointer-events-none z-[15]"
    >
      <div className="absolute top-20 left-16 w-24 h-24 rounded-full blur-2xl bg-gradient-to-br from-primary/30 to-primary-600/15 mix-blend-soft-light transition-all duration-1000"></div>
      <div className="absolute top-48 right-24 w-32 h-32 rounded-full blur-3xl bg-gradient-to-br from-secondary/30 to-secondary-600/15 mix-blend-soft-light transition-all duration-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-28 h-28 rounded-full blur-2xl bg-gradient-to-br from-accent/30 to-accent-600/15 mix-blend-soft-light transition-all duration-1000"></div>
      <div className="absolute bottom-1/3 right-16 w-36 h-36 rounded-full blur-3xl bg-gradient-to-br from-secondary/30 to-primary/20 mix-blend-soft-light transition-all duration-1000"></div>
      <div className="absolute top-1/3 left-1/3 w-40 h-40 rounded-full blur-3xl bg-gradient-to-br from-primary-50/35 to-secondary-50/25 mix-blend-soft-light transition-all duration-1000"></div>
    </div>
  );
};

export default FloatingOrbs;
