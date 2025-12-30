import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type Car } from "@/lib/supabase";
import CarDetailModal from "@/components/inventory/CarDetailModal";

const PHONE_NUMBER = "07593003535";
const WHATSAPP_LINK = "https://wa.me/+447593003535";

// Fallback vehicles for when database is empty or connection fails
const fallbackVehicles: Car[] = [
  {
    id: "1",
    model_name: "BMW 3 Series",
    price: 12995,
    year: 2019,
    body_type: "Saloon",
    doors: 4,
    seats: 5,
    colour: "Black",
    registration_date: "2019-03-15",
    mileage: 45000,
    fuel_type: "Diesel",
    gearbox: "Automatic",
    drive_type: "RWD",
    key_features: ["Leather Seats", "Navigation", "Parking Sensors", "Cruise Control"],
    image_urls: ["/placeholder.svg"],
    status: "available",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    model_name: "Ford Focus",
    price: 8500,
    year: 2020,
    body_type: "Hatchback",
    doors: 5,
    seats: 5,
    colour: "Blue",
    registration_date: "2020-06-20",
    mileage: 32000,
    fuel_type: "Petrol",
    gearbox: "Manual",
    drive_type: "FWD",
    key_features: ["Bluetooth", "Air Conditioning", "Alloy Wheels"],
    image_urls: ["/placeholder.svg"],
    status: "available",
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    model_name: "Audi A4",
    price: 15750,
    year: 2021,
    body_type: "Saloon",
    doors: 4,
    seats: 5,
    colour: "Silver",
    registration_date: "2021-01-10",
    mileage: 28000,
    fuel_type: "Diesel",
    gearbox: "Automatic",
    drive_type: "AWD",
    key_features: ["Virtual Cockpit", "LED Headlights", "Heated Seats", "Premium Sound"],
    image_urls: ["/placeholder.svg"],
    status: "available",
    created_at: new Date().toISOString(),
  },
];

const Inventory = () => {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setVehicles(data && data.length > 0 ? data as Car[] : fallbackVehicles);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setVehicles(fallbackVehicles);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (car: Car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Our Available <span className="text-accent">Vehicles</span>
            </h1>
            <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
              Browse our handpicked selection of quality used cars. Each vehicle has been 
              thoroughly inspected and comes with full service history.
            </p>
          </div>
        </section>

        {/* Vehicles Grid */}
        <section className="py-12 bg-primary">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {vehicles.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => handleCardClick(vehicle)}
                    className="bg-card/5 border border-border/20 rounded-lg overflow-hidden hover:border-accent/50 transition-all group cursor-pointer"
                  >
                    {/* Image */}
                    <div className="aspect-video bg-muted/20 overflow-hidden">
                      <img
                        src={vehicle.image_urls?.[0] || "/placeholder.svg"}
                        alt={vehicle.model_name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-primary-foreground mb-2">
                        {vehicle.year} {vehicle.model_name}
                      </h3>
                      <div className="text-2xl font-bold text-accent mb-4">
                        £{vehicle.price?.toLocaleString()}
                      </div>

                      {/* Specs */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                          {vehicle.mileage?.toLocaleString()} miles
                        </span>
                        <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                          {vehicle.fuel_type}
                        </span>
                        <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                          {vehicle.gearbox}
                        </span>
                      </div>

                      {/* CTA */}
                      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                        <a href={`tel:${PHONE_NUMBER}`} className="flex-1">
                          <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                        </a>
                        <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            WhatsApp
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contact CTA */}
            <div className="text-center mt-12">
              <p className="text-primary-foreground/70 mb-4">
                Looking for something specific? Get in touch and we'll help you find it.
              </p>
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact Us on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <CarDetailModal 
        car={selectedCar} 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
      />
    </div>
  );
};

export default Inventory;
