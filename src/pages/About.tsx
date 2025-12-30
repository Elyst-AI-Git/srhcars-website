import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTAButtons from "@/components/shared/CTAButtons";
import { Shield, Heart, Target, Users } from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Quality First",
    description: "Every vehicle is thoroughly inspected to meet our high standards before being offered for sale.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "We believe in building lasting relationships through honest advice and exceptional service.",
  },
  {
    icon: Target,
    title: "Transparency",
    description: "No hidden fees, no surprises. We provide complete information about every vehicle.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Proudly serving the UK community with reliable, affordable vehicles for every need.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              About <span className="text-accent">SRH Cars</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              Your trusted partner for quality used cars in the UK. 
              We're passionate about connecting people with reliable vehicles at fair prices.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-secondary-foreground mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground mb-4">
                SRH Cars was founded with a simple mission: to make buying a used car 
                a pleasant, stress-free experience. We understand that purchasing a vehicle 
                is a significant decision, and we're here to guide you every step of the way.
              </p>
              <p className="text-muted-foreground mb-4">
                Based in the UK, we specialise in sourcing quality pre-owned vehicles that 
                meet our rigorous standards. Each car in our inventory has been carefully 
                selected, thoroughly inspected, and prepared to the highest standards.
              </p>
              <p className="text-muted-foreground">
                Whether you're looking for your first car, a family vehicle, or something 
                sporty, we're committed to helping you find the perfect match within your budget.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-card-foreground text-center mb-12">
              Our <span className="text-accent">Values</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              Ready to Find Your Next Car?
            </h2>
            <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">
              Get in touch with us today. We'd love to help you find the perfect vehicle.
            </p>
            <CTAButtons size="lg" className="justify-center" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
