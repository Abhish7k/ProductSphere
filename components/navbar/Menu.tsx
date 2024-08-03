"use client";

import React, { useState } from "react";

const Menu = () => {
  const [showLaunchesMenu, setShowLaunchesMenu] = useState(false);

  return (
    <div className="hidden lg:flex items-center gap-8 transition-all">
      <div
        className="font-medium text-foreground/70 hover:text-orange-400 cursor-pointer transition-all"
        onMouseEnter={() => setShowLaunchesMenu(true)}
        onMouseLeave={() => setShowLaunchesMenu(false)}
      >
        Launches
      </div>
      <div className="font-medium text-foreground/70 hover:text-orange-400 cursor-pointer transition-all">
        Categories
      </div>
      <div className="font-medium text-foreground/70 hover:text-orange-400 cursor-pointer transition-all">
        Community
      </div>
      <div className="font-medium text-foreground/70 hover:text-orange-400 cursor-pointer transition-all">
        About
      </div>
    </div>
  );
};

export default Menu;
