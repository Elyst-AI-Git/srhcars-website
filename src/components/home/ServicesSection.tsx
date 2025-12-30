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
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Droplets, title: "Oil & Filter Changes" },
  { icon: Disc, title: "Brake Inspection" },
  { icon: Gauge, title: "Fluid Level Checks" },
  { icon: CircleDot, title: "Tyre Inspection" },
  { icon: Battery, title: "Battery & Electrical" },
  { icon: Stethoscope, title: "Vehicle Health Check" },
  { icon: FileCheck, title: "12 Months MOT" },
  { icon: Wrench, title: "Serviced" },
  { icon: TrendingDown, title: "Below Market Value" },
  { icon: ArrowLeftRight, title: "Part Exchange" },
  { icon: ClipboardCheck, title: "MOT" },
  { icon: Move, title: "Wheel Alignment" },
  { icon: Wind, title: "Regas" },
  { icon: Settings, title: "Service" },
  { icon: Cog, title: "All Mechanical Repairs" },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Services We <span className="text-accent">Offer</span>
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            From routine maintenance to complete mechanical repairs, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card/5 border border-border/20 p-4 rounded-lg text-center hover:border-accent/50 hover:bg-accent/5 transition-all group"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-sm font-medium text-primary-foreground">
                {service.title}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/services">
            <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
