import { Star, User } from "lucide-react";

const reviews = [
  {
    name: "John D.",
    date: "2 weeks ago",
    rating: 5,
    text: "Excellent service from start to finish! The team was professional and helped me find the perfect car. Highly recommend SRH Cars to anyone looking for quality used vehicles.",
    initial: "J",
  },
  {
    name: "Sarah M.",
    date: "1 month ago",
    rating: 5,
    text: "Best car buying experience I've ever had. Transparent pricing, no hidden fees, and the car was exactly as described. Will definitely come back for my next purchase.",
    initial: "S",
  },
  {
    name: "Michael R.",
    date: "3 weeks ago",
    rating: 5,
    text: "Great selection of quality cars at competitive prices. The staff were friendly and knowledgeable. Made the whole process stress-free!",
    initial: "M",
  },
  {
    name: "Emma T.",
    date: "1 week ago",
    rating: 5,
    text: "Found my dream car here! The team went above and beyond to help with finance options. Amazing customer service throughout.",
    initial: "E",
  },
  {
    name: "David L.",
    date: "2 months ago",
    rating: 5,
    text: "Professional, honest, and reliable. The car passed MOT with flying colours. Couldn't be happier with my purchase from SRH Cars.",
    initial: "D",
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

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={index}
              className="bg-card/5 border border-border/20 p-6 rounded-lg hover:border-accent/30 transition-colors"
            >
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
          ))}
        </div>

        {/* Additional Reviews Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          {reviews.slice(3, 5).map((review, index) => (
            <div
              key={index}
              className="bg-card/5 border border-border/20 p-6 rounded-lg hover:border-accent/30 transition-colors"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-semibold">{review.initial}</span>
                </div>
                <div>
                  <div className="font-semibold text-primary-foreground">{review.name}</div>
                  <div className="text-sm text-primary-foreground/50">{review.date}</div>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-sm text-primary-foreground/70 leading-relaxed">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewsSection;
