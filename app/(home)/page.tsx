import HeroSection from "@/components/landing-page/HeroSection";
import { HowItWorksSection } from "@/components/landing-page/HowItWorksSection";

export default async function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <HeroSection />

      {/* <HowItWorksSection /> */}

      {/* <div className="flex flex-col items-center justify-center relative mx-auto w-full max-w-screen-xl min-h-[100vh]">
        <div className="hidden md:block absolute top-0 -right-[30%] 2xl:-right-[40%] w-72 h-72 gradient rounded-full blur-[10rem] -z-10"></div>

        <div className="hidden md:block absolute bottom-0 -left-[30%] 2xl:-left-[40%] w-72 h-72 gradient rounded-full blur-[10rem] -z-10"></div>
      </div> */}
    </main>
  );
}
