import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTAButtons from "@/components/shared/CTAButtons";
import {
  Droplets, 
  Disc, 
  Gauge, 
  CircleDot, 
  Battery, 
  Stethoscope, 
  FileCheck, 
  Wrench, 
  TrendingDown, 
  ArrowLeftRight, 
  ClipboardCheck, 
  Move, 
  Wind, 
  Settings, 
  Cog 
} from "lucide-react";

const services = [
  { 
    icon: Droplets, 
    title: "Oil & Filter Changes",
    description: "Regular oil and filter changes to keep your engine running smoothly and extend its lifespan."
  },
  { 
    icon: Disc, 
    title: "Brake Inspection & Maintenance",
    description: "Comprehensive brake system checks including pads, discs, and fluid to ensure your safety on the road."
  },
  { 
    icon: Gauge, 
    title: "Fluid Level Checks & Top-ups",
    description: "Complete fluid inspection including coolant, brake fluid, power steering, and windscreen wash."
  },
  { 
    icon: CircleDot, 
    title: "Tyre Pressure & Condition Inspection",
    description: "Full tyre assessment including pressure, tread depth, and overall condition for optimal safety."
  },
  { 
    icon: Battery, 
    title: "Battery, Lights & Electrical Check",
    description: "Complete electrical system diagnostics including battery health, all lights, and electrical components."
  },
  { 
    icon: Stethoscope, 
    title: "Overall Vehicle Health Assessment",
    description: "Comprehensive multi-point inspection to identify any potential issues before they become problems."
  },
  { 
    icon: FileCheck, 
    title: "12 Months MOT",
    description: "Official MOT testing to ensure your vehicle meets all road safety and environmental standards."
  },
  { 
    icon: Wrench, 
    title: "Serviced",
    description: "Full vehicle servicing following manufacturer guidelines to maintain warranty and reliability."
  },
  { 
    icon: TrendingDown, 
    title: "Cars Below Market Value",
    description: "Quality vehicles priced competitively below market rates, offering exceptional value for money."
  },
  { 
    icon: ArrowLeftRight, 
    title: "Part Exchange Welcome",
    description: "Trade in your current vehicle as part payment towards your next car purchase with us."
  },
  { 
    icon: ClipboardCheck, 
    title: "MOT",
    description: "Quick and efficient MOT testing with transparent reporting and competitive pricing."
  },
  { 
    icon: Move, 
    title: "Wheel Alignment",
    description: "Precision wheel alignment to improve handling, extend tyre life, and enhance fuel efficiency."
  },
  { 
    icon: Wind, 
    title: "Regas",
    description: "Air conditioning regas service to keep your car cool and comfortable all year round."
  },
  { 
    icon: Settings, 
    title: "Service",
    description: "Interim and full service options tailored to your vehicle's needs and driving conditions."
  },
  { 
    icon: Cog, 
    title: "All Mechanical Repairs",
    description: "Expert mechanical repairs for all makes and models, from minor fixes to major overhauls."
  },
];

const Services = () => {
  useEffect(() => {
    document.title = "Services - SRH Cars LTD | MOT, Servicing & Repairs Nottingham";
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              From routine maintenance to complete mechanical repairs, we provide comprehensive 
              automotive services to keep your vehicle in perfect condition.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-card/5 border border-border/20 p-6 rounded-lg hover:border-accent/50 transition-all group"
                >
                  <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                    <service.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-bold text-primary-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary border-t border-border/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Book a Service?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Get in touch with us today to book your service or discuss your vehicle's needs.
            </p>
            <CTAButtons size="lg" className="justify-center" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
