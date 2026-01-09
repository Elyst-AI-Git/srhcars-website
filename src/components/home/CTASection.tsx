import CTAButtons from "@/components/shared/CTAButtons";

const CTASection = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container mx-auto px-4">
        <CTAButtons size="lg" className="justify-center" />
      </div>
    </section>
  );
};

export default CTASection;
