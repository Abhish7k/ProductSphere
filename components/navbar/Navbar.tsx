import Image from "next/image";
import Link from "next/link";
import React from "react";
import Search from "./Search";
import Menu from "./Menu";
import AuthButtons from "./AuthButtons";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <div className="h-16 px-5 py-3 xl:px-10 border-b flex items-center justify-between transition-all">
      {/* logo */}
      <div className="flex items-center">
        <Link href="" className="flex items-start gap-2">
          <Image src="/logo.svg" alt="logo" height={28} width={28} />
          <h1 className="hidden text-2xl font-medium tracking-tight">
            ProductPulse
          </h1>
        </Link>

        <Search />
      </div>

      {/* menu */}
      <div className="absolute right-1/2 translate-x-1/2 transform z-10">
        <Menu />
      </div>

      <div className="flex items-center gap-5">
        {/* auth */}
        <AuthButtons />

        <MobileNav />
      </div>
    </div>
  );
};

export default Navbar;
