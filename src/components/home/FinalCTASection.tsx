import CTAButtons from "@/components/shared/CTAButtons";
import { Phone } from "lucide-react";
const PHONE_NUMBER = "07593003535";
const FinalCTASection = () => {
  return <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Find Your <span className="text-accent">Perfect Car</span>?
        </h2>
        <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">Get in touch today to discuss your requirements or browse.
We're here to help you find the ideal vehicle.</p>
        
        <CTAButtons size="lg" className="justify-center mb-8" />
        
        <div className="flex items-center justify-center gap-2 text-primary-foreground/60">
          <Phone className="w-5 h-5 text-accent" />
          <a href={`tel:${PHONE_NUMBER}`} className="text-lg font-semibold text-primary-foreground hover:text-accent transition-colors">
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </section>;
};
export default FinalCTASection;