"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Calendar, Users } from "lucide-react";

const RecentMatches = () => {
  const matches = [
    {
      id: 1,
      petName: "Bella",
      petType: "Golden Retriever",
      age: "2 years",
      matchedWith: "The Martinez Family",
      matchedDate: "2 days ago",
      location: "San Francisco, CA",
      breederName: "Golden Hearts Kennel",
      story:
        "Through our careful matching process, Bella found her perfect family with the Martinez's, who were looking for a gentle companion for their children.",
      image: "/api/placeholder/300/300",
    },
    {
      id: 2,
      petName: "Whiskers",
      petType: "Scottish Fold",
      age: "1 year",
      matchedWith: "Emily Chen",
      matchedDate: "1 week ago",
      location: "Seattle, WA",
      breederName: "Purr-fect Folds Cattery",
      story:
        "Emily was matched with Whiskers through our platform, connecting her with a reputable breeder who specializes in well-socialized Scottish Folds.",
      image: "/api/placeholder/300/300",
    },
    {
      id: 3,
      petName: "Max",
      petType: "German Shepherd",
      age: "3 months",
      matchedWith: "Johnson Family",
      matchedDate: "3 days ago",
      location: "Portland, OR",
      breederName: "Alpine Shepherds",
      story:
        "Our team connected the Johnson family with a trusted breeder, ensuring Max came with full health certificates and excellent lineage documentation.",
      image: "/api/placeholder/300/300",
    },
    {
      id: 4,
      petName: "Luna",
      petType: "Siberian Husky",
      age: "4 months",
      matchedWith: "Adventure Couple",
      matchedDate: "5 days ago",
      location: "Denver, CO",
      breederName: "Mountain Peak Huskies",
      story:
        "Luna was perfectly matched with an active couple through our comprehensive screening process, ensuring the best fit for both pet and family.",
      image: "/api/placeholder/300/300",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Star className="w-8 h-8 text-yellow-500" />
            <h2 className="text-4xl font-bold text-primary-900 font-display">
              Recent Successful Matches
            </h2>
            <Star className="w-8 h-8 text-yellow-500" />
          </div>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Celebrating successful connections between families and quality
            breeders through our professional matching service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {matches.map((match) => (
            <Card
              key={match.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-primary-50/30 hover:from-primary-50/50 hover:to-secondary-50/30"
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg flex items-center justify-center mb-3">
                    <div className="text-center">
                      <Star className="w-12 h-12 text-yellow-400 mx-auto mb-2" />
                      <span className="text-sm text-blue-600">
                        {match.petName}
                      </span>
                    </div>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">
                    <Star className="w-3 h-3 mr-1" />
                    Matched
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="text-xl font-bold text-primary-900 mb-1">
                      {match.petName}
                    </h3>
                    <p className="text-primary-600 font-medium">
                      {match.petType} • {match.age}
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>
                        Matched with <strong>{match.matchedWith}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span>{match.matchedDate}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-red-500" />
                      <span>{match.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-xs">
                        From <strong>{match.breederName}</strong>
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3 pt-2">
                    {match.story}
                  </p>

                  <div className="pt-3">
                    <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors text-sm">
                      View Match Details
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
              Share Your Success Story
            </h3>
            <p className="text-primary-700 mb-6">
              Found your perfect pet through our matching service? We&apos;d
              love to feature your experience and help other families!
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Share Your Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentMatches;
