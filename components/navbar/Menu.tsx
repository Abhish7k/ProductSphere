"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Menu = () => {
  const pathname = usePathname();

  const isActive = (pathname: string, href: string) => {
    return pathname === href || pathname.startsWith(href);
  };

  return (
    <div className="hidden lg:flex items-center gap-6 transition-all s">
      {NavLinks.map((link, idx) => (
        <Link
          key={idx}
          href={link.href}
          className={`text-sm font-medium hover:text-foreground/90 transition-all
             ${
               isActive(pathname, link.href)
                 ? "text-foreground/95"
                 : "text-foreground/70"
             }
            `}
        >
          {link.name}
        </Link>
      ))}
    </div>
  );
};

const NavLinks = [
  {
    name: "Products",
    href: "/products",
  },
  {
    name: "Categories",
    href: "/categories",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
  {
    name: "About",
    href: "/about",
  },
];

export default Menu;
