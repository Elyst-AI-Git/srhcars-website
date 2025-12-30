import { Search, Car, KeyRound } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Browse",
    description: "Explore our quality selection of vehicles online or visit us in person.",
  },
  {
    icon: Car,
    step: "02",
    title: "Inspect",
    description: "View your chosen vehicle, take a test drive, and ask us any questions.",
  },
  {
    icon: KeyRound,
    step: "03",
    title: "Drive Away",
    description: "Quick and easy paperwork. Same-day collection available on most vehicles.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            How It <span className="text-accent">Works</span>
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Buying your next car has never been easier. Just three simple steps to get you on the road.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((item, index) => (
            <div key={index} className="relative text-center">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-accent/20" />
              )}

              {/* Step Circle */}
              <div className="relative z-10 mx-auto w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mb-6 border-2 border-accent">
                <item.icon className="w-10 h-10 text-accent" />
              </div>

              <span className="text-accent font-bold text-sm mb-2 block">Step {item.step}</span>
              <h3 className="text-xl font-semibold text-primary-foreground mb-3">{item.title}</h3>
              <p className="text-primary-foreground/60 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
