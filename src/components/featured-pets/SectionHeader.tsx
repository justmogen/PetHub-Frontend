"use client";

import styles from "../FeaturedPets.module.css";

interface SectionHeaderProps {
  titleRef: React.RefObject<HTMLHeadingElement | null>;
  subtitleRef: React.RefObject<HTMLParagraphElement | null>;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  titleRef,
  subtitleRef,
}) => {
  return (
    <div className="text-center mb-20">
      <div className="inline-block px-6 py-3 rounded-full text-base font-bold mb-8 border border-primary/20 bg-primary/10 text-primary">
        ⭐ Featured Companions
      </div>
      <h2
        ref={titleRef}
        className="font-extrabold mb-8 leading-tight tracking-tight text-foreground text-[clamp(2rem,5vw,4rem)]"
      >
        Meet Your Next
        <span className={`block mt-3 ${styles.titleGradient}`}>
          Best Friend
        </span>
      </h2>
      <p
        ref={subtitleRef}
        className="max-w-4xl mx-auto leading-relaxed font-medium text-muted-foreground text-[clamp(1.125rem,2vw,1.5rem)]"
      >
        These special companions are looking for their forever homes. Each one
        has been health-certified and is ready to bring joy to your family.
      </p>
    </div>
  );
};

export default SectionHeader;
