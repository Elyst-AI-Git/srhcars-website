import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import srhLogo from "@/assets/srh-cars-logo.png";

const PHONE_NUMBER = "07593003535";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <img src={srhLogo} alt="SRH Cars" className="h-12 w-auto mb-4" />
            <p className="text-primary-foreground/70 text-sm max-w-md">
              Your trusted partner for quality used cars. We pride ourselves on offering 
              thoroughly inspected vehicles with transparent pricing and excellent customer service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-accent mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-accent mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4 text-accent" />
                <a href={`tel:${PHONE_NUMBER}`} className="hover:text-accent transition-colors">
                  {PHONE_NUMBER}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4 text-accent" />
                <span>info@srhcars.co.uk</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4 text-accent mt-0.5" />
                <span>United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/10 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/50">
            © {new Date().getFullYear()} SRH Cars. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
