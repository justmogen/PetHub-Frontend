import { Heart, Shield, Clock, Star, Users, Award } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: Heart,
      title: "Personal Touch",
      description:
        "Individual attention to every pet and family match with genuine care",
      color: "from-[#E07A5F] to-[#D86B56]",
      iconColor: "text-[#E07A5F]",
      bgColor: "bg-[#E07A5F]/10",
      emoji: "💕",
    },
    {
      icon: Shield,
      title: "Quality Assured",
      description:
        "Every breeder verified and all pets meet strict health standards",
      color: "from-[#81B29A] to-[#6BA183]",
      iconColor: "text-[#81B29A]",
      bgColor: "bg-[#81B29A]/10",
      emoji: "🛡️",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description:
        "Quick responses and dedicated support throughout your journey",
      color: "from-[#F4A460] to-[#E89240]",
      iconColor: "text-[#F4A460]",
      bgColor: "bg-[#F4A460]/10",
      emoji: "⏰",
    },
    {
      icon: Award,
      title: "Trusted Platform",
      description:
        "Kenya's most reliable pet adoption platform with proven results",
      color: "from-[#8B7355] to-[#7A6348]",
      iconColor: "text-[#8B7355]",
      bgColor: "bg-[#8B7355]/10",
      emoji: "🏆",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#E07A5F]/10 to-[#D86B56]/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-[#81B29A]/10 to-[#6BA183]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 text-[#F4A460]/5 text-8xl">
          ✨
        </div>
        <div className="absolute top-1/4 right-1/4 text-[#E07A5F]/5 text-6xl">
          💫
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block px-6 py-3 bg-[#E07A5F]/10 text-[#E07A5F] rounded-full text-base font-bold mb-8 border border-[#E07A5F]/20">
            ⭐ Why Choose PurrfectPaws
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tight">
            The Perfect Choice for
            <span className="block bg-gradient-to-r from-[#E07A5F] to-[#81B29A] bg-clip-text text-transparent mt-3">
              Pet Adoption
            </span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            We&apos;re dedicated to creating the most trusted and caring pet
            adoption experience in Kenya, connecting loving families with their
            perfect companions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100 relative overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5`}
                ></div>
              </div>

              <div className="relative z-10">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 ${feature.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon
                      className={`w-10 h-10 ${feature.iconColor}`}
                      strokeWidth={2}
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 text-2xl group-hover:animate-bounce">
                    {feature.emoji}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-[#E07A5F] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Indicator */}
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="w-8 h-1 bg-gradient-to-r from-[#E07A5F] to-[#81B29A] rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-[#E07A5F]/10 to-[#81B29A]/10 rounded-3xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Ready to Find Your Perfect Companion?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of happy families who found their beloved pets
            through our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-[#E07A5F] to-[#D86B56] hover:from-[#D86B56] hover:to-[#C85A45] text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
              Browse Available Pets 🐾
            </button>
            <button className="border-2 border-[#81B29A] text-[#81B29A] hover:bg-[#81B29A] hover:text-white font-semibold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105">
              Learn More About Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
