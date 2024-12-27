import HeroSection from "@/components/landing-page/HeroSection";
import { HowItWorksSection } from "@/components/landing-page/HowItWorksSection";

export default async function Home() {
  return (
    <main className="w-full overflow-hidden">
      <HeroSection />

      <HowItWorksSection />
    </main>
  );
}
