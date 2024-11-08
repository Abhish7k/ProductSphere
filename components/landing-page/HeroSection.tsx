import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const HeroSection = () => {
  return (
    <div
      className="
      min-h-screen
      px-6 xl:px-[15%]
      flex flex-col items-center justify-start
      transition-all
      "
    >
      <div className="pt-32 flex flex-col items-center w-full text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl md:max-w-2xl py-2 md:py-0 lg:!leading-tight font-medium tracking-tight transition-all">
          Your ultimate platform to discover new products
        </h1>

        <p className="mt-4 max-w-sm md:max-w-[26rem] text-lg text-foreground/70 font-medium">
          Discover, share, and discuss the latest products in tech and
          innovation.
        </p>

        <Link
          href="/products"
          className="group relative mt-10 px-4 py-1.5 flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white text-white bg-indigo-500 font-medium transition-all 
          duration-300
          hover:ring-2 hover:ring-offset-1 hover:ring-indigo-500
          "
        >
          <span className="group relative z-10 flex items-center gap-2">
            Discover
            <GoArrowRight
              className="size-4 group-hover:translate-x-1 transition-all duration-500"
              strokeWidth={1}
            />
          </span>

          <div className="ease-[cubic-bezier(0.19,1,0.22,1)] absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]" />
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
