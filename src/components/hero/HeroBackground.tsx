"use client";

import styles from "../HeroSection.module.css";

interface HeroBackgroundProps {
  backgroundRef: React.RefObject<HTMLDivElement | null>;
}

const HeroBackground: React.FC<HeroBackgroundProps> = ({ backgroundRef }) => {
  return (
    <div ref={backgroundRef} className="absolute inset-0 opacity-90">
      <div
        className={`absolute inset-0 ${styles.bgPattern} transition-opacity duration-700`}
      ></div>
      <div
        className={`absolute inset-0 ${styles.backgroundOverlay} transition-all duration-1000`}
      ></div>
    </div>
  );
};

export default HeroBackground;
