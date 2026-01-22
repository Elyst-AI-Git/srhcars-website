import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { type Car } from "@/lib/supabase";
import CarDetailModal from "@/components/inventory/CarDetailModal";
import { useSEO } from "@/hooks/useSEO";

const PHONE_NUMBER = "07593003535";
const WHATSAPP_LINK = "https://wa.me/+447593003535";
const CARS_PER_PAGE = 30;

const Showroom = () => {
  const [availableCars, setAvailableCars] = useState<Car[]>([]);
  const [soldCars, setSoldCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useSEO({
    title: "Used Car Showroom Nottingham - Quality Pre-Owned Vehicles | SRH CARS",
    description: "Browse our selection of quality used cars in Nottingham. All vehicles thoroughly inspected with transparent pricing. Visit SRH Cars showroom today.",
    keywords: "used car showroom Nottingham, pre-owned vehicles Nottingham, quality used cars, SRH Cars showroom",
    canonicalUrl: "https://srhcarsltd.uk/showroom",
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      // Fetch available cars
      const { data: available, error: availableError } = await supabase
        .from("cars")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false });

      if (availableError) throw availableError;
      setAvailableCars(available as Car[]);

      // Fetch sold cars - we need to be authenticated as admin to see these
      // If not admin, we'll just show empty sold section
      const { data: sold } = await supabase
        .from("cars")
        .select("*")
        .eq("status", "sold")
        .order("created_at", { ascending: false });

      setSoldCars((sold as Car[]) || []);
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (car: Car) => {
    setSelectedCar(car);
    setModalOpen(true);
  };

  // Combine cars for pagination
  const allCars = [...availableCars, ...soldCars];
  const totalPages = Math.max(1, Math.ceil(allCars.length / CARS_PER_PAGE));
  
  // Get paginated cars
  const startIndex = (currentPage - 1) * CARS_PER_PAGE;
  const endIndex = startIndex + CARS_PER_PAGE;
  const paginatedCars = allCars.slice(startIndex, endIndex);
  
  // Separate paginated cars into available and sold
  const paginatedAvailable = paginatedCars.filter(car => car.status === "available");
  const paginatedSold = paginatedCars.filter(car => car.status === "sold");

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-primary">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
              Our <span className="text-accent">Showroom</span>
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
              <>
                {/* Available Cars Section */}
                {paginatedAvailable.length > 0 && (
                  <div className="max-w-6xl mx-auto mb-12">
                    <h2 className="text-2xl font-bold text-primary-foreground mb-6">
                      Available <span className="text-accent">Now</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedAvailable.map((vehicle) => (
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
                              loading="lazy"
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
                  </div>
                )}

                {/* Divider */}
                {paginatedAvailable.length > 0 && paginatedSold.length > 0 && (
                  <div className="max-w-6xl mx-auto my-12">
                    <div className="border-t border-border/30" />
                  </div>
                )}

                {/* Sold Cars Section */}
                {paginatedSold.length > 0 && (
                  <div className="max-w-6xl mx-auto mb-12">
                    <h2 className="text-2xl font-bold text-primary-foreground/50 mb-6">
                      Recently Sold
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedSold.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className="bg-card/5 border border-border/10 rounded-lg overflow-hidden opacity-50 relative"
                        >
                          {/* SOLD Badge */}
                          <div className="absolute top-4 right-4 z-10 bg-destructive text-destructive-foreground px-3 py-1 rounded-full text-sm font-bold">
                            SOLD
                          </div>

                          {/* Image */}
                          <div className="aspect-video bg-muted/20 overflow-hidden">
                            <img
                              src={vehicle.image_urls?.[0] || "/placeholder.svg"}
                              alt={vehicle.model_name}
                              className="w-full h-full object-cover grayscale"
                              loading="lazy"
                            />
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <h3 className="text-xl font-bold text-primary-foreground/70 mb-2">
                              {vehicle.year} {vehicle.model_name}
                            </h3>
                            <div className="text-2xl font-bold text-primary-foreground/50 mb-4">
                              £{vehicle.price?.toLocaleString()}
                            </div>

                            {/* Specs */}
                            <div className="flex flex-wrap gap-2">
                              <span className="px-3 py-1 bg-muted/10 text-primary-foreground/50 text-sm rounded-full">
                                {vehicle.mileage?.toLocaleString()} miles
                              </span>
                              <span className="px-3 py-1 bg-muted/10 text-primary-foreground/50 text-sm rounded-full">
                                {vehicle.fuel_type}
                              </span>
                              <span className="px-3 py-1 bg-muted/10 text-primary-foreground/50 text-sm rounded-full">
                                {vehicle.gearbox}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pagination - Always shown */}
                <div className="max-w-6xl mx-auto mt-12">
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <p className="text-sm text-primary-foreground/60">
                      {allCars.length > 0 
                        ? `Showing ${startIndex + 1}-${Math.min(endIndex, allCars.length)} of ${allCars.length} vehicles`
                        : "No vehicles to display"
                      }
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="border-border/30 text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      
                      {getPageNumbers().map((page, index) => (
                        page === "..." ? (
                          <span key={`ellipsis-${index}`} className="px-2 text-primary-foreground/50">...</span>
                        ) : (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(page as number)}
                            className={currentPage === page 
                              ? "bg-accent text-accent-foreground hover:bg-accent/90" 
                              : "border-border/30 text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent"
                            }
                          >
                            {page}
                          </Button>
                        )
                      ))}
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="border-border/30 text-primary-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent disabled:opacity-50"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <p className="text-sm text-primary-foreground/60">
                      Page {currentPage} of {totalPages}
                    </p>
                  </div>
                </div>

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
              </>
            )}
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

export default Showroom;