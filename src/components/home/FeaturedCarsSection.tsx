import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { type Car } from "@/lib/supabase";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FeaturedCarsSection = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedCars();
  }, []);

  const fetchFeaturedCars = async () => {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("status", "available")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      setCars(data as Car[]);
    } catch (error) {
      console.error("Error fetching featured cars:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        </div>
      </section>
    );
  }

  if (cars.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Latest <span className="text-accent">Arrivals</span>
          </h2>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto">
            Discover our newest additions to the showroom. Quality vehicles at competitive prices.
          </p>
        </div>

        {/* Carousel */}
        <div className="max-w-6xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {cars.map((car) => (
                <CarouselItem key={car.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <Link to="/showroom" className="block">
                    <div className="bg-card/5 border border-border/20 rounded-lg overflow-hidden hover:border-accent/50 transition-all group h-full">
                      {/* Image */}
                      <div className="aspect-video bg-muted/20 overflow-hidden">
                        <img
                          src={car.image_urls?.[0] || "/placeholder.svg"}
                          alt={car.model_name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-bold text-primary-foreground mb-1 group-hover:text-accent transition-colors">
                          {car.year} {car.model_name}
                        </h3>
                        <div className="text-xl font-bold text-accent mb-3">
                          £{car.price?.toLocaleString()}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                            {car.mileage?.toLocaleString()} miles
                          </span>
                          <span className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                            {car.fuel_type}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}

              {/* View Full Showroom CTA Card */}
              <CarouselItem className="pl-4 md:basis-1/2 lg:basis-1/3">
                <Link to="/showroom" className="block h-full">
                  <div className="bg-accent/10 border border-accent/30 rounded-lg overflow-hidden hover:border-accent hover:bg-accent/20 transition-all group h-full flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                      <ArrowRight className="w-8 h-8 text-accent group-hover:translate-x-1 transition-transform" />
                    </div>
                    <h3 className="text-xl font-bold text-primary-foreground mb-2">
                      View Full Showroom
                    </h3>
                    <p className="text-sm text-primary-foreground/60 text-center px-4">
                      Browse all available vehicles
                    </p>
                  </div>
                </Link>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="bg-accent/10 border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground -left-6" />
            <CarouselNext className="bg-accent/10 border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground -right-6" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarsSection;
