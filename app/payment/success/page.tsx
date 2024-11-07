"use client";

import confetti from "canvas-confetti";
import Link from "next/link";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

const SuccessPage = () => {
  const ConfettiSideCannons = () => {
    const end = Date.now() + 1 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  useEffect(() => {
    ConfettiSideCannons();
  }, []);

  return (
    <div className="flex flex-col gap-10 items-center justify-center mt-24">
      <div className="bg-green-100 dark:bg-green-900 rounded-full p-4 inline-flex">
        <FaCheck className="text-green-600 w-16 h-16 mx-auto" />
      </div>

      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Payment Successful
        </h1>
        <p className="text-gray-500 dark:text-gray-400 md:text-xl">
          Your subscription has been activated.
        </p>
      </div>

      <Link href="/new-product" className="mt-10 ">
        <button className="group relative px-4 py-1.5 flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white text-white bg-indigo-500 font-medium transition-all duration-300 hover:ring-2 hover:ring-offset-1 hover:ring-indigo-500">
          <span className="relative z-10 flex items-center gap-2">
            Submit a new product
          </span>

          <div className="ease-&lsqb;cubic-bezier(0.19,1,0.22,1)&rsqb; absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]" />
        </button>
      </Link>
    </div>
  );
};

export default SuccessPage;
