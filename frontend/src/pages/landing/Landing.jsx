import HeroSection from "./sections/HeroSection";
import ServicesSection from "./sections/ServicesSection";
import AiSection from "./sections/AiSection";
import TestimonialsSection from "./sections/TestiMonialsSection";
import PricingSection from "./sections/PricingSection";
import AppPromoSection from "./sections/AppPromoSection";
import Footer from "./sections/Footer";

const Landing = () => {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <AiSection />
      <TestimonialsSection />
      <PricingSection />
      <AppPromoSection />
      <Footer />
    </>
  );
};

export default Landing;