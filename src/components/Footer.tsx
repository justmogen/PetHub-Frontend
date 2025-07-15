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
  PawPrint,
  Shield,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-brand-primary to-brand-secondary text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-brand-accent/10 to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Main Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <PawPrint className="w-8 h-8 text-brand-accent mr-3" />
                <h3 className="text-3xl font-bold text-white">PawHub</h3>
              </div>
              <p className="text-white/80 text-lg mb-8 max-w-md">
                Kenya&apos;s premier pet marketplace connecting pet lovers with
                trusted breeders. Buy, sell, and discover quality pets from
                verified sellers across Kenya.
              </p>

              {/* Newsletter */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <h4 className="font-semibold text-lg mb-4 flex items-center">
                  <Send className="w-5 h-5 mr-2 text-brand-accent" />
                  Stay Updated
                </h4>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-brand-accent"
                  />
                  <Button className="bg-brand-accent hover:bg-brand-accent/90 text-brand-primary font-semibold px-6">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Marketplace</h4>
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
                      className="text-white/70 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-lg mb-6">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 text-brand-accent mr-3" />
                  <div>
                    <div className="text-white/70 text-xs">Call us</div>
                    <div className="text-white text-sm">+254 700 123 456</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 text-brand-accent mr-3" />
                  <div>
                    <div className="text-white/70 text-xs">Email us</div>
                    <div className="text-white text-sm">hello@pawhub.co.ke</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-brand-accent mr-3" />
                  <div>
                    <div className="text-white/70 text-xs">Visit us</div>
                    <div className="text-white text-sm">Nairobi, Kenya</div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <h5 className="font-medium text-sm mb-3">Follow us</h5>
                <div className="flex space-x-3">
                  {[
                    { Icon: Facebook, href: "#" },
                    { Icon: Instagram, href: "#" },
                    { Icon: Twitter, href: "#" },
                    { Icon: Youtube, href: "#" },
                  ].map(({ Icon, href }, index) => (
                    <a
                      key={index}
                      href={href}
                      className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-brand-accent hover:text-brand-primary transition-all duration-200"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t border-white/20">
            <div className="flex items-center bg-emerald-500/20 text-emerald-200 px-4 py-2 rounded-full text-sm font-medium">
              <Shield className="w-4 h-4 mr-2" />
              Verified Sellers
            </div>
            <div className="flex items-center bg-blue-500/20 text-blue-200 px-4 py-2 rounded-full text-sm font-medium">
              <Award className="w-4 h-4 mr-2" />
              Quality Assured
            </div>
            <div className="flex items-center bg-purple-500/20 text-purple-200 px-4 py-2 rounded-full text-sm font-medium">
              <Heart className="w-4 h-4 mr-2" />
              Trusted Marketplace
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 bg-brand-primary/20 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/80 text-sm text-center sm:text-left">
                &copy; 2025 PawHub. All rights reserved. Made with{" "}
                <span className="text-brand-accent">❤️</span> for pet lovers in
                Kenya.
              </p>
              <div className="flex space-x-6 text-sm">
                <a
                  href="/privacy"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-white/70 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="/cookies"
                  className="text-white/70 hover:text-white transition-colors"
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
