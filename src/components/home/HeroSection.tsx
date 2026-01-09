const HeroSection = () => {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-primary overflow-hidden">
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
      </div>
    </section>
  );
};

export default HeroSection;
