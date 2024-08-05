"use client";

import React, { useState } from "react";
import LaunchesMenu from "./menus/LaunchesMenu";
import CommunityMenu from "./menus/CommunityMenu";
import Link from "next/link";

const Menu = () => {
  const [showLaunchesMenu, setShowLaunchesMenu] = useState(false);
  const [showCommunityMenu, setShowCommunityMenu] = useState(false);

  return (
    <div className="hidden lg:flex items-center gap-8 transition-all">
      <div
        className="font-medium text-foreground/70 hover:text-orange-400 transition-all"
        onMouseEnter={() => setShowLaunchesMenu(true)}
        onMouseLeave={() => setShowLaunchesMenu(false)}
      >
        <h1 className="cursor-pointer">Launches</h1>
        {showLaunchesMenu && <LaunchesMenu />}
      </div>

      <Link
        href="/categories"
        className="font-medium text-foreground/70 hover:text-orange-400 cursor-pointer transition-all"
      >
        Categories
      </Link>

      <div
        className="font-medium text-foreground/70 hover:text-orange-400 cursor-pointer transition-all"
        onMouseEnter={() => setShowCommunityMenu(true)}
        onMouseLeave={() => setShowCommunityMenu(false)}
      >
        <h1 className="cursor-pointer">Community</h1>
        {showCommunityMenu && <CommunityMenu />}
      </div>

      <div className="font-medium text-foreground/70 hover:text-orange-400 cursor-pointer transition-all">
        About
      </div>
    </div>
  );
};

export default Menu;
