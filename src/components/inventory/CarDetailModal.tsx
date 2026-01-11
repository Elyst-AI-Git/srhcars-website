import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import type { Car } from "@/lib/supabase";

const PHONE_NUMBER = "07593003535";
const WHATSAPP_LINK = "https://wa.me/+447593003535";

interface CarDetailModalProps {
  car: Car | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CarDetailModal = ({ car, open, onOpenChange }: CarDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when car changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [car?.id]);

  if (!car) return null;

  const images = car.image_urls?.length > 0 ? car.image_urls : ["/placeholder.svg"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const specs = [
    { label: "Year", value: car.year },
    { label: "Body Type", value: car.body_type },
    { label: "Doors", value: car.doors },
    { label: "Seats", value: car.seats },
    { label: "Colour", value: car.colour },
    { label: "Registration Date", value: car.registration_date },
    { label: "Mileage", value: `${car.mileage?.toLocaleString()} miles` },
    { label: "Fuel Type", value: car.fuel_type },
    { label: "Gearbox", value: car.gearbox },
    { label: "Drive Type", value: car.drive_type },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border-border p-0 [&>button]:text-foreground [&>button]:hover:bg-muted">
        {/* Top Section - Image Gallery */}
        <div className="relative">
          {/* Main Image */}
          <div className="relative aspect-[16/10] bg-muted overflow-hidden">
            <img
              src={images[currentImageIndex]}
              alt={car.model_name}
              className="w-full h-full object-cover"
            />
            
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-foreground/80 rounded-full hover:bg-foreground transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-background" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-foreground/80 rounded-full hover:bg-foreground transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-background" />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-foreground/80 px-3 py-1 rounded-full">
              <span className="text-sm text-background">
                {currentImageIndex + 1} / {images.length}
              </span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-2 p-4 bg-background overflow-x-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
              {images.map((url, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentImageIndex
                      ? "border-accent ring-2 ring-accent/30"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <img
                    src={url}
                    alt={`${car.model_name} - Image ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Section - Complete Details */}
        <div className="p-6 space-y-6 bg-background">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {car.year} {car.model_name}
            </h2>
            <div className="text-3xl md:text-4xl font-bold text-foreground">
              £{car.price?.toLocaleString()}
            </div>
          </div>

          {/* Specifications Grid */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-lg">Specifications</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {specs.map((spec) => (
                <div key={spec.label} className="bg-muted border border-border p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">{spec.label}</div>
                  <div className="text-sm font-medium text-foreground">{spec.value || "N/A"}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          {car.key_features && car.key_features.length > 0 && (
            <div>
              <h3 className="font-semibold text-foreground mb-4 text-lg">Key Features</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {car.key_features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <a href={`tel:${PHONE_NUMBER}`} className="flex-1">
              <Button className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold">
                <Phone className="w-5 h-5 mr-2" />
                Call Us
              </Button>
            </a>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailModal;