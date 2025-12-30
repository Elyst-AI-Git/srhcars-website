import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const PHONE_NUMBER = "07593003535";
const WHATSAPP_LINK = `https://wa.me/447593003535?text=Hi%2C%20I'm%20interested%20in%20your%20cars`;

interface CTAButtonsProps {
  size?: "default" | "lg";
  className?: string;
}

const CTAButtons = ({ size = "default", className = "" }: CTAButtonsProps) => {
  const buttonSize = size === "lg" ? "h-12 px-8 text-base" : "";

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      <a href={`tel:${PHONE_NUMBER}`}>
        <Button 
          className={`w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-semibold ${buttonSize}`}
        >
          <Phone className="w-5 h-5 mr-2" />
          Call Now
        </Button>
      </a>
      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
        <Button 
          variant="outline"
          className={`w-full sm:w-auto border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold ${buttonSize}`}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          WhatsApp
        </Button>
      </a>
    </div>
  );
};

export default CTAButtons;
