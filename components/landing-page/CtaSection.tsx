"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { GoArrowRight } from "react-icons/go";

const CtaSection = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center mb-40 mx-5 md:mx-[10%] lg:mx-[12%] 2xl:mx-[20%]"
      viewport={{ once: true, amount: 0.2 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        ease: "easeInOut",
        duration: 0.4,
        delay: 0.6,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div
        className="flex flex-col items-center justify-center relative text-center
      border rounded-2xl w-full py-20 bg-blue-900 shadow 
      [background-image:radial-gradient(88%_100%_at_top,rgba(255,255,255,0.5),rgba(255,255,255,0))] 
      "
      >
        <h2 className="text-white text-3xl min-[450px]:text-4xl sm:text-5xl font-semibold transition-all">
          From Idea to Launch <br /> Faster Than Ever
        </h2>

        <p className="text-white mt-6 max-w-[21rem] sm:max-w-md mx-auto text-sm sm:text-base transition-all">
          Launch and showcase incredible products effortlessly with our
          intuitive and user friendly platform.
        </p>

        <button
          className="group z-10 relative mt-10 px-6 py-1.5 flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md text-white bg-indigo-500 font-medium transition-all
          duration-300  active:scale-90"
        >
          <span className="group relative z-10 flex items-center gap-2 md:text-lg transition-all">
            Get Started
            <GoArrowRight
              className="size-4 group-hover:translate-x-1 transition-all duration-500"
              strokeWidth={1}
            />
          </span>

          <div className="ease-&lsqb;cubic-bezier(0.19,1,0.22,1)&rsqb; absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]" />
        </button>

        <Noise />
      </div>
    </motion.div>
  );
};

export default CtaSection;

const Noise = () => {
  return (
    <div
      className="absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
      style={{
        backgroundImage: "url(/noise.webp)",
        backgroundSize: "30%",
      }}
    ></div>
  );
};
