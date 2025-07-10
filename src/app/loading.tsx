import { Heart, Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated Pet Hub Logo */}
        <div className="relative">
          <div className="animate-pulse">
            <Heart className="h-16 w-16 text-primary fill-current" />
          </div>
          <div className="absolute -top-2 -right-2 animate-bounce">
            <span className="text-2xl">🐾</span>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="flex items-center space-x-2">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          <span className="text-lg font-medium text-gray-700">
            Loading Pet Hub...
          </span>
        </div>

        {/* Loading Message */}
        <div className="text-center max-w-md">
          <p className="text-gray-600 text-sm">
            Finding the perfect companions for loving families
          </p>
        </div>

        {/* Animated Dots */}
        <div className="flex space-x-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-primary rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
