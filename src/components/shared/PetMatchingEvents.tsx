"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Star,
  Award,
  Briefcase,
} from "lucide-react";

const PetMatchingEvents = () => {
  const events = [
    {
      id: 1,
      title: "Premium Breeder Showcase",
      date: "March 15, 2024",
      time: "10:00 AM - 4:00 PM",
      location: "Portland Convention Center",
      type: "showcase",
      attendees: 250,
      description:
        "Meet our top-rated breeders and view their latest litters. Professional consultations available on-site to help you find your perfect pet match.",
      organizer: "Pet Hub Team",
      featured: true,
    },
    {
      id: 2,
      title: "Breed Education Workshop",
      date: "March 20, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Seattle Business Center",
      type: "education",
      attendees: 85,
      description:
        "Learn about different breeds, their characteristics, and care requirements from certified breed experts. Perfect for prospective pet owners.",
      organizer: "Professional Breed Association",
      featured: false,
    },
    {
      id: 3,
      title: "Breeder Networking Event",
      date: "March 22, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Four Seasons Hotel, San Francisco",
      type: "networking",
      attendees: 45,
      description:
        "Exclusive networking event for certified breeders to share best practices, discuss industry trends, and build professional relationships.",
      organizer: "Breeder Network Association",
      featured: false,
    },
    {
      id: 4,
      title: "Pet Health & Wellness Seminar",
      date: "March 25, 2024",
      time: "1:00 PM - 4:00 PM",
      location: "Denver Veterinary Institute",
      type: "professional",
      attendees: 120,
      description:
        "Comprehensive seminar covering health screenings, genetic testing, and wellness protocols. Featuring leading veterinary specialists.",
      organizer: "Veterinary Professionals Alliance",
      featured: true,
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "showcase":
        return "bg-purple-100 text-purple-800";
      case "education":
        return "bg-blue-100 text-blue-800";
      case "networking":
        return "bg-green-100 text-green-800";
      case "professional":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "showcase":
        return <Award className="w-4 h-4" />;
      case "education":
        return <Star className="w-4 h-4" />;
      case "networking":
        return <Users className="w-4 h-4" />;
      case "professional":
        return <Briefcase className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary-900 mb-4 font-display">
            Professional Pet Matching Events
          </h2>
          <p className="text-xl text-primary-600 max-w-3xl mx-auto">
            Connect with certified breeders, attend educational workshops, and
            discover professional pet matching opportunities
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event) => (
            <Card
              key={event.id}
              className={`group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm ${
                event.featured ? "ring-2 ring-primary-200" : ""
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`${getTypeColor(
                        event.type
                      )} flex items-center gap-1`}
                    >
                      {getTypeIcon(event.type)}
                      {event.type}
                    </Badge>
                    {event.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees} registered</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-primary-900 mb-3 group-hover:text-primary-700 transition-colors">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {event.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    <span>Hosted by </span>
                    <span className="font-medium text-primary-700">
                      {event.organizer}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
                      Register
                    </button>
                    <button className="border border-primary-600 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-lg font-semibold transition-colors text-sm">
                      Details
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">
              Host a Professional Event
            </h3>
            <p className="mb-6 opacity-90">
              Are you a breeder or industry professional? Partner with us to
              host educational events and showcase opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors">
                Partner with Us
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold transition-colors">
                View Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PetMatchingEvents;
