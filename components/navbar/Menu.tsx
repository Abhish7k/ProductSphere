"use client";

import React from "react";
import Link from "next/link";

const Menu = () => {
  return (
    <div className="hidden lg:flex items-center gap-8 transition-all">
      <Link
        href="/categories"
        className="font-medium text-foreground/70 hover:text-foreground/90 transition-all"
      >
        Categories
      </Link>

      <Link
        href="/"
        className="font-medium text-foreground/70 hover:text-foreground/90 transition-all"
      >
        Pricing
      </Link>

      <Link
        href="/"
        className="font-medium text-foreground/70 hover:text-foreground/90 transition-all"
      >
        About
      </Link>
    </div>
  );
};

export default Menu;
