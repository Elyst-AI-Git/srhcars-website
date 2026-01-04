import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookAppointmentModal from "@/components/shared/BookAppointmentModal";
import srhLogo from "@/assets/srh-cars-logo.png";

const WHATSAPP_LINK = "https://wa.me/+447593003535";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Contact", path: "/contact" },
  { name: "Showroom", path: "/showroom" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-border/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={srhLogo} alt="SRH Cars" className="h-10 md:h-14 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    isActive(link.path)
                      ? "text-accent"
                      : "text-primary-foreground/80"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                  <Phone className="w-4 h-4 mr-2" />
                  Buy Now
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-primary-foreground p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-border/10">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-accent ${
                      isActive(link.path)
                        ? "text-accent"
                        : "text-primary-foreground/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                    <Phone className="w-4 h-4 mr-2" />
                    Buy Now
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <BookAppointmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
};

export default Navbar;
