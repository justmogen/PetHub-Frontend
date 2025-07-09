import { Shield, Heart, Award, Clock } from "lucide-react";

const TrustSection = () => {
  const trustPoints = [
    {
      icon: Shield,
      title: "Health Guaranteed",
      description:
        "Complete vet records, vaccinations, and health certificates for every pet",
      color: "from-[#E07A5F] to-[#D86B56]",
      bgColor: "bg-[#E07A5F]/20",
      emoji: "🏥",
    },
    {
      icon: Heart,
      title: "Love & Socialization",
      description:
        "Pets raised with care, properly socialized and ready for families",
      color: "from-[#FF6B9D] to-[#E55A87]",
      bgColor: "bg-[#FF6B9D]/20",
      emoji: "💕",
    },
    {
      icon: Award,
      title: "Verified Breeders",
      description: "Licensed, trusted breeders with proven track records",
      color: "from-[#FFD93D] to-[#E6C200]",
      bgColor: "bg-[#FFD93D]/20",
      emoji: "🏆",
    },
    {
      icon: Clock,
      title: "Lifetime Support",
      description: "24/7 guidance and support throughout your pet's life",
      color: "from-[#4ECDC4] to-[#44B3AC]",
      bgColor: "bg-[#4ECDC4]/20",
      emoji: "⏰",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-[#81B29A] via-[#6BA183] to-[#5A8F72] relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 text-white/5 text-6xl">
          ⭐
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-white/5 text-8xl">
          💎
        </div>

        {/* Floating Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block px-3 md:px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-xs md:text-sm font-semibold mb-4 md:mb-6">
            🤝 Our Promise
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-6 leading-tight">
            Why Families
            <span className="block bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent mt-1 md:mt-2">
              Trust Us
            </span>
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-4">
            We&apos;re committed to the highest standards of pet care, breeder
            verification, and customer service. Your family&apos;s happiness is
            our mission.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {trustPoints.map((point, index) => (
            <div
              key={index}
              className="group text-center p-4 md:p-6 lg:p-8 bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl hover:bg-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/20"
            >
              <div className="relative mb-4 md:mb-6">
                {/* Icon Container */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/20 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300 border border-white/30`}
                >
                  <point.icon
                    className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 text-white"
                    strokeWidth={2}
                  />
                </div>

                {/* Emoji Badge */}
                <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 text-lg md:text-xl lg:text-2xl group-hover:animate-bounce">
                  {point.emoji}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white mb-2 md:mb-3 group-hover:text-yellow-200 transition-colors duration-300">
                {point.title}
              </h3>
              <p className="text-xs md:text-sm lg:text-base text-white/80 leading-relaxed">
                {point.description}
              </p>

              {/* Hover Indicator */}
              <div className="mt-3 md:mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                <div
                  className={`w-8 h-0.5 bg-gradient-to-r ${point.color} rounded-full mx-auto`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Testimonial Section */}
        <div className="mt-16 md:mt-20">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 max-w-4xl mx-auto border border-white/20">
            <div className="text-center">
              <div className="mb-4 md:mb-6">
                <span className="text-2xl md:text-3xl lg:text-4xl">
                  ⭐⭐⭐⭐⭐
                </span>
              </div>
              <blockquote className="text-lg md:text-xl lg:text-2xl font-medium text-white mb-4 md:mb-6 italic">
                &quot;PurrfectPaws helped us find our perfect family member. The
                process was smooth, transparent, and our puppy came with all
                health records. Highly recommended!&quot;
              </blockquote>
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg md:text-xl">👨‍👩‍👧‍👦</span>
                </div>
                <div className="text-center md:text-left">
                  <p className="text-white font-semibold text-sm md:text-base">
                    The Kariuki Family
                  </p>
                  <p className="text-white/80 text-xs md:text-sm">
                    Nairobi, Kenya
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-4 md:mb-6">
            Ready to Welcome Your New Family Member?
          </h3>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button className="bg-white text-[#81B29A] hover:bg-gray-100 font-semibold px-6 md:px-8 py-3 md:py-4 text-sm md:text-base rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg">
              Browse Available Pets 🐾
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#81B29A] font-semibold px-6 md:px-8 py-3 md:py-4 text-sm md:text-base rounded-xl md:rounded-2xl transition-all duration-300 hover:scale-105">
              Contact Us Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
