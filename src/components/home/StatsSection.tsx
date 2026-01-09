const StatsSection = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        {/* Description */}
        <p className="text-lg md:text-xl text-primary-foreground/70 max-w-3xl mx-auto mb-12 text-center">
          Find your perfect pre-owned vehicle at SRH Cars Ltd, Nottingham's trusted used car dealer. 
          We offer exceptional customer service, flexible finance options, and 12-month MOT on selected vehicles.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
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
    </section>
  );
};

export default StatsSection;
