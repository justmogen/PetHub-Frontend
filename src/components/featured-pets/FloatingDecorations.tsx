"use client";

interface FloatingDecorationsProps {
  decorativeRef: React.RefObject<HTMLDivElement | null>;
}

const FloatingDecorations: React.FC<FloatingDecorationsProps> = ({
  decorativeRef,
}) => {
  return (
    <div ref={decorativeRef} className="absolute inset-0 pointer-events-none">
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full blur-2xl bg-gradient-to-br from-primary/20 to-primary/10"></div>
      <div className="absolute bottom-32 left-20 w-40 h-40 rounded-full blur-3xl bg-gradient-to-br from-secondary/20 to-secondary/10"></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full blur-xl bg-gradient-to-br from-accent/20 to-accent/10"></div>
      <div className="absolute top-10 left-10 text-6xl text-primary/10">🐾</div>
      <div className="absolute bottom-20 right-16 text-5xl text-secondary/10">
        ❤️
      </div>
      <div className="absolute top-1/3 left-1/4 text-4xl text-accent/10">
        🏠
      </div>
    </div>
  );
};

export default FloatingDecorations;
