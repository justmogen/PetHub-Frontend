import { Calendar, Clock, Users, Loader2 } from "lucide-react";

export default function EventsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header Skeleton */}
        <div className="mb-8 space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse max-w-md"></div>
          <div className="h-6 bg-gray-200 rounded-lg animate-pulse max-w-2xl"></div>
        </div>

        {/* Events Loading State */}
        <div className="py-16">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Calendar className="h-8 w-8 text-primary" />
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Loading Events...
            </h2>
            <p className="text-gray-600">
              Getting the latest pet events and meetups ready for you
            </p>
          </div>

          {/* Event Card Skeletons */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-pulse"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
                    <div className="w-20 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-gray-300" />
                    <div className="w-12 h-4 bg-gray-200 rounded"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-7 bg-gray-200 rounded max-w-sm"></div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-300" />
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-300" />
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                    <div className="flex gap-2">
                      <div className="h-9 w-20 bg-gray-200 rounded-lg"></div>
                      <div className="h-9 w-16 bg-gray-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
