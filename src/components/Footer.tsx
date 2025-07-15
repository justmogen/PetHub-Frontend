import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Send,
  Heart,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PawHubLogo } from "@/components/shared";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-[hsl(var(--primary-700))] to-[hsl(var(--secondary-700))] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-gradient-to-br from-[hsl(var(--accent-600))]/15 to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <PawHubLogo width={40} height={40} className="mr-3" />
                <h3 className="text-3xl font-bold text-white tracking-tight drop-shadow-lg">
                  PawHub
                </h3>
              </div>
              <p className="text-white/90 text-lg mb-8 max-w-md leading-relaxed drop-shadow-sm">
                Kenya&apos;s premier pet marketplace connecting pet lovers with
                trusted breeders. Buy, sell, and discover quality pets from
                verified sellers across Kenya.
              </p>

              {/* Newsletter */}
              <div className="bg-[hsl(var(--neutral-800))]/40 backdrop-blur-sm rounded-2xl p-6 border border-[hsl(var(--neutral-600))]/30 shadow-lg">
                <h4 className="font-semibold text-lg mb-4 flex items-center text-white drop-shadow-sm">
                  <Send className="w-5 h-5 mr-2 text-[hsl(var(--accent))]" />
                  Stay Updated
                </h4>
                <p className="text-white/80 text-sm mb-4 drop-shadow-sm">
                  Get the latest pet listings and marketplace updates.
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-[hsl(var(--neutral-700))]/30 border-[hsl(var(--neutral-500))]/40 text-white placeholder:text-white/70 focus:border-[hsl(var(--accent))] focus:ring-1 focus:ring-[hsl(var(--accent))]/20 backdrop-blur-sm"
                  />
                  <Button className="bg-[hsl(var(--accent))] hover:bg-[hsl(var(--accent-600))] text-[hsl(var(--accent-foreground))] font-semibold px-6 transition-all duration-200 shadow-lg">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white drop-shadow-sm">
                Marketplace
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Browse Pets", href: "/pets" },
                  { name: "Sell Your Pet", href: "/sell" },
                  { name: "Featured Listings", href: "/featured" },
                  { name: "Breeder Directory", href: "/breeders" },
                  { name: "Categories", href: "/categories" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors text-sm drop-shadow-sm hover:drop-shadow-md"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white drop-shadow-sm">
                Contact
              </h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-[hsl(var(--accent))] mr-3" />
                  <div>
                    <div className="text-white/80 text-xs drop-shadow-sm">
                      Call us
                    </div>
                    <div className="text-white text-sm font-medium drop-shadow-sm">
                      +254 700 123 456
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-[hsl(var(--accent))] mr-3" />
                  <div>
                    <div className="text-white/80 text-xs drop-shadow-sm">
                      Email us
                    </div>
                    <div className="text-white text-sm font-medium drop-shadow-sm">
                      hello@pawhub.co.ke
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-[hsl(var(--accent))] mr-3" />
                  <div>
                    <div className="text-white/80 text-xs drop-shadow-sm">
                      Visit us
                    </div>
                    <div className="text-white text-sm font-medium drop-shadow-sm">
                      Nairobi, Kenya
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h5 className="font-medium text-sm mb-4 text-white/90">
                  Follow us
                </h5>
                <div className="flex space-x-3">
                  {[
                    { Icon: Facebook, href: "#", label: "Facebook" },
                    { Icon: Instagram, href: "#", label: "Instagram" },
                    { Icon: Twitter, href: "#", label: "Twitter" },
                    { Icon: Youtube, href: "#", label: "YouTube" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 bg-[hsl(var(--neutral-700))]/30 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-[hsl(var(--neutral-600))]/30">
            <div className="flex items-center bg-[hsl(var(--success))]/30 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
              <Shield className="w-4 h-4 mr-2" />
              Verified Sellers
            </div>
            <div className="flex items-center bg-[hsl(var(--info))]/30 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
              <Award className="w-4 h-4 mr-2" />
              Quality Assured
            </div>
            <div className="flex items-center bg-[hsl(var(--accent))]/30 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
              <Heart className="w-4 h-4 mr-2" />
              Trusted Marketplace
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[hsl(var(--neutral-600))]/30 bg-[hsl(var(--primary-700))]/30 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/90 text-sm text-center sm:text-left drop-shadow-sm">
                &copy; 2025 PawHub. All rights reserved. Made with{" "}
                <span className="text-[hsl(var(--accent))]">❤️</span> for pet
                lovers in Kenya.
              </p>
              <div className="flex space-x-6 text-sm">
                <a
                  href="/privacy"
                  className="text-white/80 hover:text-white transition-colors drop-shadow-sm"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-white/80 hover:text-white transition-colors drop-shadow-sm"
                >
                  Terms of Service
                </a>
                <a
                  href="/cookies"
                  className="text-white/80 hover:text-white transition-colors drop-shadow-sm"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
