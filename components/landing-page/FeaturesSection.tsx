"use client";

import React, { useId } from "react";
import { motion } from "framer-motion";
import {
  Rocket,
  Users,
  Star,
  MessageCircle,
  Globe,
  Shield,
  BarChart,
} from "lucide-react";

export const FeaturesSection = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center relative mx-auto w-full max-w-screen-xl 
      min-h-[100vh]
      "
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
      {/* gradients */}
      {/* <div className="hidden md:block absolute top-0 -right-[30%] 2xl:-right-[40%] w-72 h-72 gradient rounded-full blur-[10rem] -z-10"></div> */}

      {/* <div className="hidden md:block absolute bottom-0 -left-[30%] 2xl:-left-[40%] w-72 h-72 gradient rounded-full blur-[10rem] -z-10"></div> */}

      {/* main section */}
      <div className="px-5">
        {/* heading */}
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl min-[420px]:text-4xl md:text-5xl font-medium mt-6 transition-all">
            Discover the features driving innovation
          </h2>
          <p className="text-muted-foreground mt-6 max-w-md mx-auto">
            Explore the tools that make sharing, discovering, and celebrating
            innovative products easier than ever
          </p>
        </div>

        {/*  */}
        <div className="">
          <FeaturesGrid />
        </div>
      </div>
    </motion.div>
  );
};

function FeaturesGrid() {
  return (
    <div className="py-20 px-10 md:px-[5%] transition-all">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-3 max-w-7xl mx-auto transition-all">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden group"
          >
            <Grid size={20} />

            <feature.icon className="mb-5 size-8 group-hover:scale-110 transition-all duration-300 will-change-transform transform" />

            <p className="text-lg font-semibold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>

            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.info}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

const features = [
  {
    icon: Rocket,
    title: "Launch Ready",
    info: "Effortlessly showcase your product and connect with early adopters.",
  },
  {
    icon: Users,
    title: "Engaged Community",
    info: "Join a thriving community of product enthusiasts and creators.",
  },
  {
    icon: Star,
    title: "Trending Insights",
    info: "Discover the hottest products and trends as they gain traction.",
  },
  {
    icon: MessageCircle,
    title: "Interactive Discussions",
    info: "Encourage feedback and spark conversations with user comments.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    info: "Promote your product to a worldwide audience of potential users.",
  },
  {
    icon: Shield,
    title: "Safe and Secure",
    info: "Experience a reliable and secure platform built for creators.",
  },
  {
    icon: BarChart,
    title: "Analytics Dashboard",
    info: "Track product performance with detailed analytics and user metrics.",
  },
  {
    icon: Rocket,
    title: "Early Feedback",
    info: "Gather actionable insights from early users to refine your product.",
  },
];
