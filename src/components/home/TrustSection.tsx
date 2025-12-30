import { 
  Shield, 
  Tag, 
  FileText, 
  BadgeCheck, 
  Calculator, 
  Search 
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Thoroughly Inspected",
    description: "Every vehicle undergoes a comprehensive multi-point inspection before sale.",
  },
  {
    icon: Tag,
    title: "Transparent Pricing",
    description: "No hidden fees or surprises. The price you see is the price you pay.",
  },
  {
    icon: FileText,
    title: "Full Service History",
    description: "Complete documentation and service records available for every car.",
  },
  {
    icon: BadgeCheck,
    title: "Warranty Options",
    description: "Extended warranty packages available for your peace of mind.",
  },
  {
    icon: Calculator,
    title: "Finance Available",
    description: "Flexible financing solutions to fit your budget and needs.",
  },
  {
    icon: Search,
    title: "Free Vehicle Check",
    description: "Complimentary HPI check and history verification on all vehicles.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Why Choose <span className="text-accent">SRH Cars</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best car buying experience with 
            quality vehicles and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:border-accent/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
