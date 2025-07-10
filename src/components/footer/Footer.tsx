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

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="pawPattern"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="2" fill="currentColor" />
              <circle cx="6" cy="6" r="1" fill="currentColor" />
              <circle cx="14" cy="6" r="1" fill="currentColor" />
              <circle cx="6" cy="14" r="1" fill="currentColor" />
              <circle cx="14" cy="14" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#pawPattern)" />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand & Newsletter */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  <span className="mr-2">🐾</span>
                  <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                    PurrfectPaws
                  </span>
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-md">
                  Kenya&apos;s premier pet marketplace connecting loving
                  families with healthy, certified pets from trusted breeders.
                  Find your perfect companion today! 🏠❤️
                </p>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/10">
                <h4 className="font-semibold text-lg mb-2 flex items-center">
                  <span className="mr-2">📧</span>
                  Stay Updated!
                </h4>
                <p className="text-slate-300 text-sm mb-4">
                  Get the latest pets, tips, and exclusive offers.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Enter your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 text-sm"
                  />
                  <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 border-0 text-white font-medium text-sm px-4 py-2">
                    <Send className="w-4 h-4 mr-1" />
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-xs font-medium">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified Breeders
                </div>
                <div className="flex items-center bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium">
                  <Award className="w-3 h-3 mr-1" />
                  Vet Certified
                </div>
                <div className="flex items-center bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium">
                  <Heart className="w-3 h-3 mr-1" />
                  Trusted Platform
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center">
                <span className="mr-2">🔗</span>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Browse Pets", emoji: "🐕" },
                  { name: "Pet Supplies", emoji: "🦴" },
                  { name: "Vet Directory", emoji: "🏥" },
                  { name: "Training Guides", emoji: "📚" },
                  { name: "Pet Insurance", emoji: "🛡️" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span className="mr-2 group-hover:scale-110 transition-transform duration-200">
                        {link.emoji}
                      </span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center">
                <span className="mr-2">🆘</span>
                Support
              </h4>
              <ul className="space-y-3">
                {[
                  { name: "Contact Us", emoji: "📞" },
                  { name: "FAQs", emoji: "❓" },
                  { name: "Shipping Info", emoji: "📦" },
                  { name: "Return Policy", emoji: "↩️" },
                  { name: "Pet Care Tips", emoji: "💡" },
                ].map((link) => (
                  <li key={link.name}>
                    <a
                      href="#"
                      className="text-slate-300 hover:text-white transition-colors duration-200 text-sm flex items-center group"
                    >
                      <span className="mr-2 group-hover:scale-110 transition-transform duration-200">
                        {link.emoji}
                      </span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h4 className="font-semibold text-lg mb-4 flex items-center">
                <span className="mr-2">📱</span>
                Get in Touch
              </h4>

              {/* Contact Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-emerald-500/30 transition-colors">
                    <Phone className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-slate-300 text-sm">Call us</div>
                    <div className="text-white font-medium text-sm">
                      +254 700 123 456
                    </div>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-500/30 transition-colors">
                    <Mail className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-slate-300 text-sm">Email us</div>
                    <div className="text-white font-medium text-sm">
                      hello@purrfectpaws.co.ke
                    </div>
                  </div>
                </div>

                <div className="flex items-center group">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-500/30 transition-colors">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-slate-300 text-sm">Visit us</div>
                    <div className="text-white font-medium text-sm">
                      Nairobi, Kenya
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h5 className="font-medium mb-3 text-sm">Follow us 🌟</h5>
                <div className="flex space-x-3">
                  {[
                    {
                      Icon: Facebook,
                      color: "hover:bg-blue-600",
                      bg: "bg-blue-500/20",
                    },
                    {
                      Icon: Instagram,
                      color: "hover:bg-pink-600",
                      bg: "bg-pink-500/20",
                    },
                    {
                      Icon: Twitter,
                      color: "hover:bg-sky-600",
                      bg: "bg-sky-500/20",
                    },
                    {
                      Icon: Youtube,
                      color: "hover:bg-red-600",
                      bg: "bg-red-500/20",
                    },
                  ].map(({ Icon, color, bg }, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`w-9 h-9 ${bg} rounded-lg flex items-center justify-center ${color} transition-all duration-200 hover:scale-110`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-slate-400 text-sm text-center sm:text-left">
                &copy; 2024 PurrfectPaws. All rights reserved. Made with{" "}
                <span className="text-red-400 animate-pulse">❤️</span> for pet
                lovers in Kenya.
              </p>
              <div className="flex space-x-6 text-sm">
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
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
