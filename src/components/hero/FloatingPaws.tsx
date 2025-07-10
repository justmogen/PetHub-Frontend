"use client";

interface FloatingPawsProps {
  pawsRef: React.RefObject<HTMLDivElement | null>;
}

const FloatingPaws: React.FC<FloatingPawsProps> = ({ pawsRef }) => {
  return (
    <div ref={pawsRef} className="absolute inset-0 pointer-events-none z-10">
      <div className="absolute top-20 left-10 text-4xl text-primary/25">🐾</div>
      <div className="absolute top-1/3 right-20 text-3xl text-secondary/20">
        🐾
      </div>
      <div className="absolute bottom-32 left-1/4 text-5xl text-primary/20">
        🐾
      </div>
      <div className="absolute top-2/3 right-1/3 text-4xl text-secondary/25">
        🐾
      </div>
      <div className="absolute bottom-20 right-10 text-3xl text-primary/20">
        🐾
      </div>
    </div>
  );
};

export default FloatingPaws;
