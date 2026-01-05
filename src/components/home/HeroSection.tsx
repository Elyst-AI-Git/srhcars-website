import CTAButtons from "@/components/shared/CTAButtons";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center bg-primary overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-accent blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-accent blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 text-center relative z-10 pt-20">
        <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
          Quality Used Cars in Nottingham
        </span>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
          Premium Quality <span className="text-accent">Used Cars</span> in Nottingham
        </h1>
        
        <p className="text-lg md:text-xl text-primary-foreground/70 max-w-3xl mx-auto mb-10">Find your perfect pre-owned vehicle at SRH Cars Ltd, Nottingham's trusted used car dealer. We offer exceptional customer service, flexible finance options, and 12-month MOT on selected vehicles.</p>
        
        <CTAButtons size="lg" className="justify-center" />
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent">100+</div>
            <div className="text-sm text-primary-foreground/60">Cars Sold</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent">5★</div>
            <div className="text-sm text-primary-foreground/60">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent">UK</div>
            <div className="text-sm text-primary-foreground/60">Based</div>
          </div>
        </div>
      </div>
    </section>;
};
export default HeroSection;