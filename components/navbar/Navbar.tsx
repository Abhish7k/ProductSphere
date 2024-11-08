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
import NotificationIcon from "./NotificationIcon";
import SubmitButton from "./SubmitButton";

interface NavbarProps {
  authenticatedUser?: any;
  notifications: any;
  products: any;
}

const Navbar: React.FC<NavbarProps> = ({
  authenticatedUser,
  notifications,
  products,
}) => {
  const [authModalVisible, setAuthModalVisible] = useState(false);

  const handleButtonClick = () => {
    setAuthModalVisible(true);
  };

  return (
    <div className="h-16 px-4 py-3 xl:px-[10%] border-b flex items-center justify-between transition-all">
      {/* logo */}
      <div className="flex items-center ">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="logo"
            height={26}
            width={26}
            className=""
          />
          <h1 className="hidden min-[400px]:block text-[23px] font-bold text-indigo-600 transition-all">
            ProductSphere
          </h1>
        </Link>

        <div className="hidden md:block ml-10 mr-5">
          <Search />
        </div>

        <div className="">
          <Menu />
        </div>
      </div>

      {/* menu */}
      <div className="flex items-center gap-2 md:gap-5">
        {authenticatedUser ? (
          <div className="flex items-center gap-5">
            <SubmitButton
              products={products}
              authenticatedUser={authenticatedUser}
            />

            <NotificationIcon notifications={notifications} />

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
