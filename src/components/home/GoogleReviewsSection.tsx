import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  {
    name: "Mark Smith",
    date: "2 weeks ago",
    rating: 5,
    text: "Excellent service, very professional team. Bought a BMW 3 Series and couldn't be happier. The car was exactly as described and the whole process was smooth.",
    initial: "M",
  },
  {
    name: "James Wilson",
    date: "1 month ago",
    rating: 5,
    text: "Best car dealership in Nottingham! Great prices and honest service. They helped me find the perfect car within my budget. Highly recommend!",
    initial: "J",
  },
  {
    name: "Sarah Thompson",
    date: "3 weeks ago",
    rating: 5,
    text: "Fantastic experience from start to finish. The team was friendly and knowledgeable. Got a great deal on my Audi A4. Will definitely return!",
    initial: "S",
  },
  {
    name: "David Brown",
    date: "1 week ago",
    rating: 5,
    text: "Very trustworthy dealership. All paperwork was handled professionally. The car came with full service history as promised. Thank you SRH Cars!",
    initial: "D",
  },
  {
    name: "Emma Roberts",
    date: "2 months ago",
    rating: 5,
    text: "Amazing customer service! They went above and beyond to help with finance options. Got my dream car at a fair price. Couldn't ask for more.",
    initial: "E",
  },
  {
    name: "Michael Johnson",
    date: "3 days ago",
    rating: 5,
    text: "Professional, honest, and reliable. The car passed MOT with flying colours. Very happy with my purchase from SRH Cars. Top quality vehicles!",
    initial: "M",
  },
];

const GoogleReviewsSection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <svg viewBox="0 0 24 24" className="w-8 h-8" aria-label="Google">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="text-2xl font-bold text-primary-foreground">Google Reviews</span>
          </div>
          
          {/* Overall Rating */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl font-bold text-accent">5.0</span>
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-accent text-accent" />
              ))}
            </div>
          </div>
          <p className="text-primary-foreground/60">Based on 17 reviews</p>
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
              {reviews.map((review, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-card/5 border border-border/20 p-6 rounded-lg hover:border-accent/30 transition-colors h-full">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-accent font-semibold">{review.initial}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-primary-foreground">{review.name}</div>
                        <div className="text-sm text-primary-foreground/50">{review.date}</div>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-sm text-primary-foreground/70 leading-relaxed">
                      {review.text}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-accent/10 border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground -left-6" />
            <CarouselNext className="bg-accent/10 border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground -right-6" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
