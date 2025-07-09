"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import PawHubLogo from "./PawHubLogo";

// Navigation items configuration
const navItems = [
  { href: "/pets", label: "Pets" },
  { href: "/articles", label: "Articles" },
];

// Desktop Navigation Link Component
const DesktopNavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    className="text-foreground hover:text-primary transition-all duration-200 font-medium relative group px-2 py-1 rounded-lg hover:bg-primary/5"
    onClick={onClick}
  >
    {label}
    <span className="absolute -bottom-1 left-2 w-0 h-1 bg-gradient-to-r from-primary to-accent group-hover:w-[calc(100%-1rem)] transition-all duration-300 rounded-full shadow-sm"></span>
  </Link>
);

// Mobile Navigation Link Component
const MobileNavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    className="block px-6 py-4 text-foreground hover:text-primary transition-all duration-200 font-medium hover:bg-primary/10 rounded-2xl mx-3 group relative overflow-hidden"
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <span className="relative z-10">{label}</span>
      <div className="flex items-center gap-2">
        <span className="w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-6 transition-all duration-300 rounded-full"></span>
        <svg
          className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-all duration-200 transform group-hover:translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
  </Link>
);

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-border/50">
      <div className="container-responsive">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="group">
              <div className="flex items-center gap-3">
                <PawHubLogo
                  width={32}
                  height={32}
                  className="group-hover:scale-110 transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-md"
                />
                <h1 className="logo-text gradient-text-brand group-hover:animate-pulse-gentle transition-all duration-200 tracking-tight">
                  PawHub
                </h1>
              </div>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 group-focus-within:text-primary transition-all duration-200 group-focus-within:scale-110" />
              <Input
                placeholder="What pet are you looking for?"
                className="pl-12 pr-4 py-2.5 rounded-full bg-input/50 border-border hover:border-primary/50 focus:border-primary focus:ring-primary focus:ring-2 focus:ring-opacity-20 transition-all duration-200 placeholder:text-muted-foreground/70 hover:bg-input/80 focus:bg-input shadow-soft hover:shadow-gentle"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <DesktopNavLink
                key={item.href}
                href={item.href}
                label={item.label}
              />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-2 text-foreground hover:text-primary transition-all duration-200 focus-ring rounded-lg hover:bg-primary/10 active:scale-95"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  isMobileMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMobileMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slide-up px-4 pb-4">
            <nav className="glass-effect-dark shadow-strong border border-border/30 py-8 rounded-3xl backdrop-blur-xl">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    onClick={() => setIsMobileMenuOpen(false)}
                  />
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;
