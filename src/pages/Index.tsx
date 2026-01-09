import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturedCarsSection from "@/components/home/FeaturedCarsSection";
import CTASection from "@/components/home/CTASection";
import StatsSection from "@/components/home/StatsSection";
import TrustSection from "@/components/home/TrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import GoogleReviewsSection from "@/components/home/GoogleReviewsSection";

const Index = () => {
  useEffect(() => {
    document.title = "SRH Cars LTD - Quality Used Cars Nottingham";
  }, []);

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
