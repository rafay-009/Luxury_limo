import { FleetGrid } from "@/views/shared/sections/FleetGrid";
import { TestimonialsStrip } from "@/views/shared/sections/TestimonialsStrip";
import { NewYorkAirportTransferSection } from "@/views/newyork/sections/NewYorkAirportTransferSection";
import { NewYorkArriveSection } from "@/views/newyork/sections/NewYorkArriveSection";
import { NewYorkBookingHelpSection } from "@/views/newyork/sections/NewYorkBookingHelpSection";
import { NewYorkFAQSection } from "@/views/newyork/sections/NewYorkFAQSection";
import { NewYorkHero } from "@/views/newyork/sections/NewYorkHero";
import { NewYorkPopularRoutes } from "@/views/newyork/sections/NewYorkPopularRoutes";
import { NewYorkRideOptionsSection } from "@/views/newyork/sections/NewYorkRideOptionsSection";

export function NewYorkPage() {
  return (
    <>
      <NewYorkHero />
      <TestimonialsStrip />
      <NewYorkArriveSection />
      <NewYorkAirportTransferSection />
      <FleetGrid preview />
      <NewYorkPopularRoutes />
      <NewYorkRideOptionsSection />
      <NewYorkBookingHelpSection />
      <NewYorkFAQSection />
    </>
  );
}
