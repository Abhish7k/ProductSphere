"use client";

import { isUserPremium } from "@/lib/actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import MembershipModal from "../ui/modal/UpgradeMembershipModal";
import UpgradeMembershipModalContent from "../UpgradeMembershipModalContent";

interface SubmitButtonProps {
  products: any;
  authenticatedUser: any;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  products,
  authenticatedUser,
}) => {
  const router = useRouter();

  const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);

  const handleButtonClick = async () => {
    const isPremium = await isUserPremium();

    if (!isPremium && products.length === 2) {
      setIsUpgradeModalVisible(true);

      console.log("first");
    } else {
      router.push("/new-product");
    }
  };

  return (
    <div>
      <button
        onClick={handleButtonClick}
        className="group relative px-4 py-1.5 flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white text-white bg-indigo-500 font-medium transition-all duration-300"
      >
        <span className="relative z-10 flex items-center gap-2">Submit</span>

        <div className="ease-[cubic-bezier(0.19,1,0.22,1)] absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]" />
      </button>

      <MembershipModal
        visible={isUpgradeModalVisible}
        setVisible={setIsUpgradeModalVisible}
      >
        <UpgradeMembershipModalContent authenticatedUser={authenticatedUser} />
      </MembershipModal>
    </div>
  );
};

export default SubmitButton;
