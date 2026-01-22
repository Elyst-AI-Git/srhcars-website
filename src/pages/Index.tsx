import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCarsSection from "@/components/home/FeaturedCarsSection";
import CTASection from "@/components/home/CTASection";
import StatsSection from "@/components/home/StatsSection";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import GoogleReviewsSection from "@/components/home/GoogleReviewsSection";
import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "SRH CARS LTD - Quality Used Cars Nottingham | Affordable Pre-Owned Vehicles",
    description: "SRH Cars Ltd - Premium quality used cars in Nottingham. Thoroughly inspected vehicles, transparent pricing, 12-month MOT. Visit our showroom at Trent South Industrial Park.",
    keywords: "used cars Nottingham, second hand cars Nottingham, car dealer Nottingham, quality used cars, affordable cars, pre-owned vehicles, Trent South Industrial Park",
    canonicalUrl: "https://srhcarsltd.uk",
  });

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedCarsSection />
        <CTASection />
        <StatsSection />
        <TrustSection />
        <ServicesSection />
        <GoogleReviewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
