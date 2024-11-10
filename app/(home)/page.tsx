import HeroSection from "@/components/landing-page/HeroSection";
import { HowItWorksSection } from "@/components/landing-page/HowItWorksSection";

export default async function Home() {
  return (
    <main className="">
      <HeroSection />

      <HowItWorksSection />
    </main>
  );
}
