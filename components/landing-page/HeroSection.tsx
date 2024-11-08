import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const HeroSection = () => {
  return (
    <div
      className="
      min-h-[90vh]
      px-6 xl:px-[15%]
      flex flex-col items-center justify-start
      transition-all
      "
    >
      <div className="pt-24 md:pt-28 flex flex-col items-center w-full text-center">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl md:max-w-2xl py-2 md:py-0 lg:!leading-[4rem] font-medium tracking-tight transition-all">
          Your ultimate platform to discover new products
        </h1>

        <p className="mt-2 md:mt-4 max-w-sm md:max-w-[26rem] md:text-lg text-foreground/70 font-medium leading-6 transition-all">
          Discover, share, and discuss the latest products in tech and
          innovation.
        </p>

        <Link
          href="/products"
          className="group relative mt-10 px-6 py-1.5 flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white text-white bg-indigo-500 font-medium transition-all 
          duration-300 
          hover:ring-2 hover:ring-offset-1 hover:ring-indigo-500
          "
        >
          <span className="group relative z-10 flex items-center gap-2 md:text-lg transition-all">
            Discover
            <GoArrowRight
              className="size-4 group-hover:translate-x-1 transition-all duration-500"
              strokeWidth={1}
            />
          </span>

          <div className="ease-[cubic-bezier(0.19,1,0.22,1)] absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]" />
        </Link>
      </div>

      <div className="relative mt-5">
        <div className="absolute top-20 md:top-[12%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem]"></div>

        <div
          className="relative mx-auto max-w-5xl rounded-xl lg:rounded-[32px] border border-neutral-200/50 p-2 backdrop-blur-lg border-neutral-300 bg-neutral-200/20 
        md:p-4 mt-12 mb-10"
        >
          <div className="rounded-lg lg:rounded-[24px] border p-2 border-neutral-300 bg-white">
            <Image
              src="/hero.png"
              alt=""
              width={1920}
              height={1080}
              className="rounded-lg lg:rounded-[20px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
