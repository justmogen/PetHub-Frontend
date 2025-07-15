"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface FeaturedPetsErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function FeaturedPetsError({
  title = "Failed to Load Featured Pets",
  message = "We're having trouble loading our featured pets. Please try again later.",
  onRetry,
}: FeaturedPetsErrorProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Card className="max-w-md w-full">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground mb-6">{message}</p>

              {onRetry && (
                <Button
                  onClick={onRetry}
                  className="flex items-center gap-2"
                  variant="outline"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
