"use client";

import React, { useState } from "react";
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
  const [showLaunchesMenu, setShowLaunchesMenu] = useState(false);

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

            <div className="text-xl font-medium text-foreground/80 hover:text-orange-400 transition-all">
              <h1
                className="flex cursor-pointer"
                onClick={() => setShowLaunchesMenu(!showLaunchesMenu)}
              >
                Launches
              </h1>
              {showLaunchesMenu && "hello"}
            </div>

            <Link
              href="/categories"
              className="text-xl font-medium text-foreground/80 hover:text-orange-400 cursor-pointer transition-all"
            >
              Categories
            </Link>

            <div className="text-xl font-medium text-foreground/80 hover:text-orange-400 cursor-pointer transition-all">
              <h1 className="cursor-pointer">Community</h1>
            </div>

            <div className="text-xl font-medium text-foreground/80 hover:text-orange-400 cursor-pointer transition-all">
              About
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
