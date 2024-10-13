"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Search from "./Search";
import Menu from "./Menu";
import AuthButtons from "./AuthButtons";
import MobileNav from "./MobileNav";
import Modal from "../ui/modal/modal";
import AuthContent from "./AuthContent";
import Avatar from "./Avatar";
import { unstable_noStore as noStore } from "next/cache";
import NotificationIcon from "./NotificationIcon";
import SubmitButton from "./SubmitButton";

interface NavbarProps {
  authenticatedUser?: any;
}

const Navbar: React.FC<NavbarProps> = ({ authenticatedUser }) => {
  noStore();

  const [authModalVisible, setAuthModalVisible] = useState(false);

  const handleButtonClick = () => {
    setAuthModalVisible(true);
  };

  return (
    <div className="h-16 px-5 py-3 xl:px-10 border-b flex items-center justify-between transition-all">
      {/* logo */}
      <div className="flex items-center">
        <Link href="/" className="flex items-start gap-2">
          <Image src="/logo.svg" alt="logo" height={28} width={28} />
          <h1 className="hidden text-2xl font-medium tracking-tight">
            ProductPulse
          </h1>
        </Link>

        <div className="hidden md:block ml-5">
          <Search />
        </div>
      </div>

      {/* menu */}
      <div className="absolute right-1/2 translate-x-1/2 transform z-10">
        <Menu />
      </div>

      <div className="flex items-center gap-5">
        {authenticatedUser ? (
          <div className="flex items-center gap-5">
            <SubmitButton />

            <NotificationIcon />

            <Avatar authenticatedUser={authenticatedUser} />
          </div>
        ) : (
          // auth
          <div onClick={handleButtonClick}>
            <AuthButtons />
          </div>
        )}

        <Modal visible={authModalVisible} setVisible={setAuthModalVisible}>
          <AuthContent />
        </Modal>

        <MobileNav />
      </div>
    </div>
  );
};

export default Navbar;
