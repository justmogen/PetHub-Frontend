"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, MapPin, Users, Star, Shield, Heart } from "lucide-react";

const BreederSpotlight = () => {
  const breeders = [
    {
      id: 1,
      name: "Golden Hearts Kennel",
      owner: "Sarah Johnson",
      location: "Portland, OR",
      specialties: ["Golden Retrievers", "Labradors"],
      experience: "15 years",
      rating: 4.9,
      totalMatches: 127,
      image: "/api/placeholder/400/300",
      story:
        "Sarah has been breeding exceptional Golden Retrievers for over 15 years, focusing on health, temperament, and breed standards. Her dogs are known for their gentle nature and excellent family compatibility.",
      certifications: ["AKC Breeder of Merit", "Health Certified"],
      type: "featured",
    },
    {
      id: 2,
      name: "Alpine Shepherds",
      owner: "Michael Rodriguez",
      location: "Denver, CO",
      specialties: ["German Shepherds", "Belgian Malinois"],
      experience: "12 years",
      rating: 4.8,
      totalMatches: 89,
      image: "/api/placeholder/400/300",
      story:
        "Michael specializes in working line German Shepherds, with a focus on intelligence, loyalty, and protective instincts. All puppies come with comprehensive health guarantees and early socialization.",
      certifications: ["SV Certified", "Health Guarantee"],
      type: "trusted",
    },
    {
      id: 3,
      name: "Purr-fect Folds Cattery",
      owner: "Emily Chen",
      location: "Seattle, WA",
      specialties: ["Scottish Folds", "British Shorthairs"],
      experience: "8 years",
      rating: 4.9,
      totalMatches: 156,
      image: "/api/placeholder/400/300",
      story:
        "Emily's cattery is renowned for producing healthy, well-socialized Scottish Folds with excellent temperaments. She focuses on genetic health testing and responsible breeding practices.",
      certifications: ["TICA Registered", "Health Tested"],
      type: "premium",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "featured":
        return "bg-yellow-100 text-yellow-800";
      case "trusted":
        return "bg-blue-100 text-blue-800";
      case "premium":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "featured":
        return <Star className="w-4 h-4" />;
      case "trusted":
        return <Shield className="w-4 h-4" />;
      case "premium":
        return <Award className="w-4 h-4" />;
      default:
        return <Heart className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-900 mb-4 font-display">
            Trusted Breeder Spotlight
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Meet our network of verified, professional breeders who are
            committed to ethical breeding practices and exceptional pet care
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {breeders.map((breeder) => (
            <Card
              key={breeder.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge
                    className={`${getTypeColor(
                      breeder.type
                    )} flex items-center gap-1`}
                  >
                    {getTypeIcon(breeder.type)}
                    {breeder.type}
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {breeder.rating}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {breeder.totalMatches}
                    </span>
                  </div>
                </div>

                <div className="relative mb-4 rounded-lg overflow-hidden">
                  <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
                    <div className="text-center">
                      <Award className="w-12 h-12 text-primary-400 mx-auto mb-2" />
                      <span className="text-sm text-primary-600">
                        Breeder Photo
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-semibold text-primary-900 mb-1 group-hover:text-primary-700 transition-colors">
                      {breeder.name}
                    </h3>
                    <p className="text-primary-600 font-medium">
                      {breeder.owner}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{breeder.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span>{breeder.experience} experience</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {breeder.specialties.map((specialty, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3">
                    {breeder.story}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {breeder.certifications.map((cert, index) => (
                      <Badge
                        key={index}
                        className="text-xs bg-green-100 text-green-800"
                      >
                        <Shield className="w-3 h-3 mr-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-3 flex gap-2">
                    <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors text-sm">
                      View Profile
                    </button>
                    <button className="flex-1 border border-primary-600 text-primary-600 hover:bg-primary-50 py-2 px-4 rounded-lg font-semibold transition-colors text-sm">
                      Contact
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-primary-900 mb-4">
              Join Our Breeder Network
            </h3>
            <p className="text-primary-700 mb-6">
              Are you a professional breeder committed to ethical practices?
              Apply to join our trusted breeder network and connect with loving
              families.
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Apply as Breeder
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreederSpotlight;
