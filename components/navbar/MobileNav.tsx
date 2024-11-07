"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Search from "./Search";
import Link from "next/link";

const MobileNav = () => {
  return (
    <div className="lg:hidden mt-2 transition-all">
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="transition-all">
          <SheetHeader>
            <SheetTitle className="text-2xl">ProductSphere</SheetTitle>
          </SheetHeader>

          <div className="mt-10 flex flex-col gap-5">
            <div className="mb-5">
              <Search />
            </div>

            <Link
              href="/categories"
              className="text-xl font-medium text-foreground/80 hover:text-indigo-500 cursor-pointer transition-all"
            >
              Categories
            </Link>

            <Link
              href="/"
              className="text-xl font-medium text-foreground/80 hover:text-indigo-500 cursor-pointer transition-all"
            >
              <h1 className="cursor-pointer">Pricing</h1>
            </Link>

            <Link
              href="/"
              className="text-xl font-medium text-foreground/80 hover:text-indigo-500 cursor-pointer transition-all"
            >
              About
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
