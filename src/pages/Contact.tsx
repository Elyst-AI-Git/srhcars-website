import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CTAButtons from "@/components/shared/CTAButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PHONE_NUMBER = "07593003535";
const WHATSAPP_LINK = "https://wa.me/+447593003535";
const EMAIL = "srhcarsltd@gmail.com";
const ADDRESS = "UNIT 37 Trent Ln, Nottingham NG2 4EQ, United Kingdom";

const Contact = () => {
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Contact Us - SRH Cars LTD | Quality Used Cars Nottingham";
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Get In <span className="text-accent">Touch</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              Have a question or ready to find your perfect car? 
              We're here to help. Reach out to us today.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Contact Info */}
              <div>
                <h2 className="text-2xl font-bold text-primary-foreground mb-6">
                  Contact Information
                </h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground">Phone</h3>
                      <a 
                        href={`tel:${PHONE_NUMBER}`} 
                        className="text-primary-foreground/70 hover:text-accent transition-colors"
                      >
                        {PHONE_NUMBER}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground">WhatsApp</h3>
                      <a 
                        href={WHATSAPP_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-foreground/70 hover:text-accent transition-colors"
                      >
                        Message us on WhatsApp
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground">Email</h3>
                      <a 
                        href={`mailto:${EMAIL}`}
                        className="text-primary-foreground/70 hover:text-accent transition-colors"
                      >
                        {EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground">Location</h3>
                      <span className="text-primary-foreground/70">{ADDRESS}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground">Opening Hours</h3>
                      <p className="text-primary-foreground/70">Mon - Sat: 9 AM - 6 PM</p>
                      <p className="text-primary-foreground/70">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <CTAButtons />
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card/5 p-8 rounded-lg border border-border/20">
                <h2 className="text-2xl font-bold text-primary-foreground mb-6">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-primary border-border/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-primary border-border/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    />
                  </div>
                  <div>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-primary border-border/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="bg-primary border-border/20 text-primary-foreground placeholder:text-primary-foreground/50"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
