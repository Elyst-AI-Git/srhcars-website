import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import FeaturedCarsSection from "@/components/home/FeaturedCarsSection";
import ServicesSection from "@/components/home/ServicesSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import GoogleReviewsSection from "@/components/home/GoogleReviewsSection";
import FinalCTASection from "@/components/home/FinalCTASection";

const Index = () => {
  useEffect(() => {
    document.title = "SRH Cars LTD - Quality Used Cars Nottingham";
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <FeaturedCarsSection />
        <ServicesSection />
        <HowItWorksSection />
        <GoogleReviewsSection />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
