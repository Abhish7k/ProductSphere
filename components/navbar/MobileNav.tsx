import { MenuIcon } from "lucide-react";
import React from "react";

const MobileNav = () => {
  return (
    <div className="lg:hidden transition-all">
      <MenuIcon />
    </div>
  );
};

export default MobileNav;
