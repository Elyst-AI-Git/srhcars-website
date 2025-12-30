import { X, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const PHONE_NUMBER = "07593003535";
const WHATSAPP_LINK = "https://wa.me/+447593003535";
const ADDRESS = "UNIT 37 Trent Ln, Nottingham NG2 4EQ, United Kingdom";

interface BookAppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BookAppointmentModal = ({ open, onOpenChange }: BookAppointmentModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-card-foreground text-center">
            Book Your <span className="text-accent">Appointment</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Phone */}
          <a 
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-4 p-4 rounded-lg bg-muted hover:bg-accent/10 transition-colors group"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 transition-colors">
              <Phone className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Call Us</div>
              <div className="text-lg font-semibold text-card-foreground">{PHONE_NUMBER}</div>
            </div>
          </a>

          {/* Location */}
          <div className="flex items-start gap-4 p-4 rounded-lg bg-muted">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Visit Us</div>
              <div className="text-sm font-medium text-card-foreground leading-relaxed">
                {ADDRESS}
              </div>
            </div>
          </div>

          {/* WhatsApp Button */}
          <a 
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12">
              <MessageCircle className="w-5 h-5 mr-2" />
              Message on WhatsApp
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookAppointmentModal;
