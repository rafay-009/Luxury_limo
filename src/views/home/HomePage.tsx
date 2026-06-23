import { FareCalculator } from "@/views/home/sections/FareCalculator";
import { FeaturedRecognition } from "@/views/home/sections/FeaturedRecognition";
import { FAQSection } from "@/views/home/sections/FAQSection";
import { GlobalPresence } from "@/views/home/sections/GlobalPresence";
import { HeroFeaturedStrip } from "@/views/home/sections/HeroFeaturedStrip";
import { HeroSection } from "@/views/home/sections/HeroSection";
import { HowItWorks } from "@/views/home/sections/HowItWorks";
import { IncomingFlights } from "@/views/home/sections/IncomingFlights";
import { LiveActivity } from "@/views/home/sections/LiveActivity";
import { ProfessionalChauffeurs } from "@/views/home/sections/ProfessionalChauffeurs";
import { QuickBookingRoutes } from "@/views/home/sections/QuickBookingRoutes";
import { SafetyTrust } from "@/views/home/sections/SafetyTrust";
import { ServicesBentoGrid } from "@/views/home/sections/ServicesBentoGrid";
import { TopRoutes } from "@/views/home/sections/TopRoutes";
import { FleetGrid } from "@/views/shared/sections/FleetGrid";
import { TestimonialsStrip } from "@/views/shared/sections/TestimonialsStrip";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <HeroFeaturedStrip />
      <HowItWorks />
      <FleetGrid preview />
      <GlobalPresence />
      <QuickBookingRoutes />
      <FareCalculator />
      <TestimonialsStrip />
      <ServicesBentoGrid />
      <LiveActivity />
      <IncomingFlights />
      <TopRoutes />
      <SafetyTrust />
      <ProfessionalChauffeurs />
      <FeaturedRecognition />
      <FAQSection />
    </>
  );
}
