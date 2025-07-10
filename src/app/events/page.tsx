import { Metadata } from "next";
import PetMatchingEvents from "@/components/shared/PetMatchingEvents";

export const metadata: Metadata = {
  title: "Pet Events | PawHub",
  description: "Upcoming pet adoption events, meetups and more",
};

export default function EventsPage() {
  return (
    <main>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
          Pet Events
        </h1>
        <p className="text-xl text-muted-foreground mb-12">
          Discover upcoming pet adoption events, breeder meetups, and more.
        </p>
      </div>

      <PetMatchingEvents />

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6 mt-12">
          More Events Coming Soon
        </h2>
        <div className="grid gap-8">
          <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
            <h3 className="text-xl font-medium mb-3">Stay Updated</h3>
            <p className="text-muted-foreground">
              We&apos;re planning more exciting pet events. Sign up for
              notifications to be the first to know!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
