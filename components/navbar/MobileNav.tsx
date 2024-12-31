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
import Image from "next/image";

const MobileNav = () => {
  return (
    <div className="lg:hidden mt-2 transition-all">
      <Sheet>
        <SheetTrigger>
          <MenuIcon />
        </SheetTrigger>
        <SheetContent className="transition-all">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-start gap-2">
              <Image
                src={"/logo.svg"}
                alt="logo"
                width={30}
                height={30}
                className=""
              />
              <span className="text-3xl text-indigo-600">ProductSphere</span>
            </SheetTitle>
          </SheetHeader>

          <div className="mt-10 flex flex-col gap-5">
            <Link
              href="/products"
              className="text-xl font-medium text-foreground/80 hover:text-indigo-500 cursor-pointer transition-all"
            >
              Products
            </Link>

            <Link
              href="/categories"
              className="text-xl font-medium text-foreground/80 hover:text-indigo-500 cursor-pointer transition-all"
            >
              Categories
            </Link>

            <Link
              href="/pricing"
              className="text-xl font-medium text-foreground/80 hover:text-indigo-500 cursor-pointer transition-all"
            >
              <h1 className="cursor-pointer">Pricing</h1>
            </Link>

            <Link
              href="/about"
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
