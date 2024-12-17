"use client";

import { FaqSection } from "@/components/landing-page/FaqSection";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 my-10">
      <motion.div
        className="flex flex-col gap-20 justify-center min-h-[80vh]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 0.4,
        }}
      >
        <div className="text-center">
          <h1 className="text-4xl font-semibold mb-4">About Us</h1>
          <p className="text-lg text-gray-600">
            We’re on a mission to help creators and innovators bring their
            products to life by connecting them with an engaged, supportive
            community.
          </p>
        </div>

        {/*  */}
        <section className="">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our platform is designed for creators, makers, and innovators who
            want to showcase their products, get feedback, and grow. We aim to
            empower you to build meaningful connections and improve your product
            through honest and constructive feedback.
          </p>
        </section>

        {/*  */}
        <section className="">
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>
              Product Showcasing: Highlight your products and make them stand
              out.
            </li>
            <li>
              Community Engagement: Get valuable feedback, comments, and votes
              from users.
            </li>
            <li>
              Analytics: Track product engagement with basic and advanced
              insights.
            </li>
            <li>
              Upvote System: Gauge interest in your products through community
              upvotes.
            </li>
            <li>
              Personalized Launch Insights (Premium): Get data-driven
              recommendations on optimizing your launches.
            </li>
          </ul>
        </section>
      </motion.div>

      {/*  */}
      <FaqSection />
    </div>
  );
};

export default AboutPage;
