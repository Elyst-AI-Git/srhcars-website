import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
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

  if (!car) return null;

  const images = car.image_urls?.length > 0 ? car.image_urls : ["/placeholder.svg"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const specs = [
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
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card border-border/30">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary-foreground">
            {car.year} {car.model_name}
          </DialogTitle>
        </DialogHeader>

        {/* Image Gallery */}
        <div className="relative aspect-video bg-muted/20 rounded-lg overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={car.model_name}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-primary/80 rounded-full hover:bg-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-primary-foreground" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary/80 rounded-full hover:bg-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-primary-foreground" />
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? "bg-accent" : "bg-primary-foreground/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Price */}
        <div className="text-3xl font-bold text-accent">
          £{car.price?.toLocaleString()}
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {specs.map((spec) => (
            <div key={spec.label} className="bg-card/5 border border-border/20 p-3 rounded-lg">
              <div className="text-xs text-primary-foreground/50 mb-1">{spec.label}</div>
              <div className="text-sm font-medium text-primary-foreground">{spec.value || "N/A"}</div>
            </div>
          ))}
        </div>

        {/* Key Features */}
        {car.key_features && car.key_features.length > 0 && (
          <div>
            <h3 className="font-semibold text-primary-foreground mb-3">Key Features</h3>
            <ul className="grid grid-cols-2 gap-2">
              {car.key_features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="flex gap-3 pt-4 border-t border-border/20">
          <a href={`tel:${PHONE_NUMBER}`} className="flex-1">
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
          </a>
          <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarDetailModal;
