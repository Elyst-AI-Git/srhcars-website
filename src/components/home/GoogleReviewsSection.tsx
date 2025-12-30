import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
  {
    name: "Joanna Stachurska",
    date: "8 months ago",
    rating: 5,
    text: "Outstanding service from Servan! Around 4 months ago my son bought his first car from this very professional and genuine seller. It was so easy to communicate and Servan made us feel like a valued customer.",
    initial: "J",
  },
  {
    name: "Karl Kershaw",
    date: "a year ago",
    rating: 5,
    text: "First time using SRH Cars and it won't be the last. From initial call to viewing and test driving the car, the owner was friendly and happy to discuss the car whilst answering any questions either my daughter or I had. The car was as described.",
    initial: "K",
  },
  {
    name: "Saqib Zahir",
    date: "a year ago",
    rating: 5,
    text: "Bought a car 2 weeks ago and nothing but pleased. Fully transparent sales process and nothing hidden, there is no pressure at all to buy and you are able to view and test drive as you wish.",
    initial: "S",
  },
  {
    name: "Gurvinder Summan",
    date: "a year ago",
    rating: 5,
    text: "Purchased a car yesterday, the car was clean. He was patient friendly and even provided great service after I purchased.",
    initial: "G",
  },
  {
    name: "Abdullah Al-Ameen",
    date: "a year ago",
    rating: 5,
    text: "Great sales man excellent selection of great value cars, helped me find a suitable car for my son",
    initial: "A",
  },
  {
    name: "Luke Worthington",
    date: "5 months ago",
    rating: 5,
    text: "Outstanding service had one little issue with the battery which was sorted instantly would highly recommend",
    initial: "L",
  },
  {
    name: "Aryan Tariq",
    date: "2 years ago",
    rating: 5,
    text: "Very pleased with the car I have just bought from SRH cars. With it being my first car was I unaware of how the whole process works, but I was very happy with the service provided. Had all the answers to my questions and made the process very easy. Can't recommend enough. Thanks!",
    initial: "A",
  },
  {
    name: "Martin Berry",
    date: "a year ago",
    rating: 5,
    text: "I bought a car here recently and everything about the experience was great from beginning to end. Extremely friendly, helpful and professional, and the car is fantastic.",
    initial: "M",
  },
  {
    name: "Sew Fancy teresa",
    date: "a year ago",
    rating: 5,
    text: "Helped me find the perfect car at an affordable price and helped me set everything up : ) definitely recomend, 5 stars for service",
    initial: "S",
  },
  {
    name: "hozan taha",
    date: "3 years ago",
    rating: 5,
    text: "Friendly and trustworthy car dealership. I bought a car from this company and to my surprise it is a very good and reliable runner, exactly what they advertise so I highly recommend SRH CARS LTD 👍",
    initial: "H",
  },
  {
    name: "Dilshad Sherfany",
    date: "a year ago",
    rating: 5,
    text: "I went to look at his cars they were clean and in great condition, he was a nice and informative. I will definitely recommend SRH Cars to others.",
    initial: "D",
  },
  {
    name: "Darwn wafa",
    date: "2 years ago",
    rating: 5,
    text: "Just bought a VW POLO From SRH CARS they were very helpful and the car is great, thank you so much we will definitely buy it from you again. ⭐️⭐️⭐️⭐️⭐️",
    initial: "D",
  },
  {
    name: "Meer Notts",
    date: "a year ago",
    rating: 5,
    text: "i've bought a car a year ago still have no issues at all highly recommended!",
    initial: "M",
  },
  {
    name: "Vanessa Lam",
    date: "a year ago",
    rating: 5,
    text: "Very kind and genuine person, very paitent and willing to help you with everything before leaving. Will definitely recommend and will definately go back again.",
    initial: "V",
  },
  {
    name: "Polay Slemany",
    date: "3 years ago",
    rating: 5,
    text: "I WOULD DEFINITELY BUY FROM THEM AGAIN Absolutely amazing dealer. Friendly and will do anything to help. Can't recommend enough 😊🤝",
    initial: "P",
  },
  {
    name: "Shvan Maho",
    date: "2 years ago",
    rating: 5,
    text: "Very friendly and helpful very happy with my car they deserve more then 5 start",
    initial: "S",
  },
  {
    name: "Ray Cutz",
    date: "3 years ago",
    rating: 5,
    text: "Excellent service! Very friendly and helpful. Well worth the 5 stars ⭐️⭐️⭐️⭐️⭐️",
    initial: "R",
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
