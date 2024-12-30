import CtaSection from "@/components/landing-page/CtaSection";
import FeaturesSection from "@/components/landing-page/FeaturesSection";
import FooterSection from "@/components/landing-page/FooterSection";
import HeroSection from "@/components/landing-page/HeroSection";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";
import PricingSection from "@/components/landing-page/PricingSection";
import TestimonialSection from "@/components/landing-page/TestimonialSection";

export default async function Home() {
  return (
    <main className="w-full overflow-hidden">
      <HeroSection />

      <HowItWorksSection />

      <FeaturesSection />

      <PricingSection />

      <TestimonialSection />

      <CtaSection />

      <FooterSection />
    </main>
  );
}
