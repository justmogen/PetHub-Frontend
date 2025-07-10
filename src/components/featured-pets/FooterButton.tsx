"use client";

import { Button } from "@/components/ui/button";

interface FooterButtonProps {
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

const FooterButton: React.FC<FooterButtonProps> = ({ buttonRef }) => {
  return (
    <Button
      ref={buttonRef}
      className="font-semibold px-12 py-6 text-lg rounded-2xl bg-gradient-to-r from-primary to-primary-600 text-primary-foreground border-none shadow-sm transition-all duration-300 hover:from-primary-600 hover:to-primary-700 hover:scale-105 hover:shadow-lg"
    >
      View All Available Pets
      <span className="ml-2">🐾</span>
    </Button>
  );
};

export default FooterButton;
