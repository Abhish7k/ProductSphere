"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircleIcon } from "lucide-react";
import { motion } from "framer-motion";

const PricingSection = () => {
  return (
    <motion.div
      className="flex flex-col items-center my-40"
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
      <div className="flex flex-col items-center justify-center mb-12 mx-10">
        <h1 className="text-4xl md:text-5xl font-medium text-center !leading-tight md:tracking-tight transition-all">
          Fair pricing, unfair advantage.
        </h1>

        <p className="text-base md:text-lg mt-2 text-center text-muted-foreground transition-all">
          Get started and take your product to the next level.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 transition-all">
        {Plans.map((plan) => (
          <Card
            key={plan.name}
            className={cn(
              "flex flex-col w-full border-border rounded-xl min-w-fit",
              plan.name === "Premium" && "border-2 border-purple-500"
            )}
          >
            <CardHeader
              className={cn(
                "border-b border-border",
                plan.name === "Premium"
                  ? "bg-purple-500/[0.07]"
                  : "bg-foreground/[0.03]"
              )}
            >
              <CardTitle
                className={cn(
                  plan.name !== "Pro" && "text-muted-foreground",
                  "text-lg font-medium"
                )}
              >
                {plan.name}
              </CardTitle>

              <CardDescription>{plan.description}</CardDescription>
              <h5 className="text-3xl font-semibold">
                ${plan.price}
                <span className="text-base text-muted-foreground font-normal">
                  {plan.name !== "Free" ? "/month" : ""}
                </span>
              </h5>
            </CardHeader>

            <CardContent className="pt-6 space-y-4">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircleIcon className="text-purple-500 w-4 h-4" />
                  <p className="">{feature}</p>
                </div>
              ))}
            </CardContent>

            <CardFooter className="w-full mt-auto">
              <button className="group relative w-full px-2 py-1 sm:px-4 sm:py-1.5 flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white text-white bg-indigo-500 font-medium transition-all duration-300 active:scale-90 hover:ring-2 hover:ring-offset-1 hover:ring-indigo-500">
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                </span>

                <div className="ease-&lsqb;cubic-bezier(0.19,1,0.22,1)&rsqb; absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]" />
              </button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

const Plans = [
  {
    name: "Basic",
    description: "Essential tools to kickstart your product journey.",
    price: 0,
    features: [
      "Upload up to 2 products",
      "Community feedback and voting",
      "Basic analytics on engagement",
      "Limited upvotes on other products",
      "Notifications for comments and upvotes",
    ],
  },

  {
    name: "Premium",
    description: "Enhanced tools and insights for serious creators.",
    price: 7.99,
    features: [
      "Everything in Basic plan",
      "Unlimited product uploads",
      "Advanced analytics on engagement",
      "Priority listing for products",
      "Personalized product launch insights",
      "Premium support and feedback",
    ],
  },
];

export default PricingSection;
