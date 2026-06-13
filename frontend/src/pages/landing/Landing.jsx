import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import AiSection from "./sections/AiSection";
import TestimonialsSection from "./sections/TestiMonialsSection";
import PricingSection from "./sections/PricingSection";
import AppPromoSection from "./sections/AppPromoSection";
import Footer from "./sections/Footer";

const Landing = () => {
  return (
    <div className="font-cinzel bg-[#0A0F1C] text-white">
      <HeroSection />
      <ServicesSection />
      <AiSection />
      <TestimonialsSection />
      {/* <PricingSection /> */}
      <AppPromoSection />
      <Footer />
    </div>
  );
};

export default Landing;