import { Star } from "lucide-react";

const testimonials = [
  {
    name: "James W.",
    location: "Manchester",
    rating: 5,
    text: "Fantastic experience from start to finish. The car was exactly as described and the team made the whole process incredibly smooth.",
  },
  {
    name: "Sarah M.",
    location: "Birmingham",
    rating: 5,
    text: "Very professional and transparent. They answered all my questions and even helped arrange finance. Highly recommend!",
  },
  {
    name: "David L.",
    location: "London",
    rating: 5,
    text: "Best car buying experience I've had. No pressure, fair prices, and the after-sales support has been excellent.",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            What Our <span className="text-accent">Customers</span> Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-accent text-accent"
                  />
                ))}
              </div>
              
              {/* Quote */}
              <p className="text-card-foreground/80 mb-6 italic">
                "{testimonial.text}"
              </p>
              
              {/* Author */}
              <div>
                <div className="font-semibold text-card-foreground">
                  {testimonial.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
