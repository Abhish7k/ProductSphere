"use client";

import React from "react";
import { motion } from "framer-motion";

export const AnimateContainer = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
};
