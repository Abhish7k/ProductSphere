"use client";

import MembershipModal from "@/components/ui/modal/UpgradeMembershipModal";
import UpgradeMembershipModalContent from "@/components/UpgradeMembershipModalContent";
import { useState } from "react";

const UpgradePremiumButton = (authenticatedUser: any) => {
  const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);

  const handleButtonClick = () => {
    setIsUpgradeModalVisible(true);
  };

  return (
    <div className="">
      <button
        onClick={handleButtonClick}
        className="group relative px-2 py-1 sm:px-4 sm:py-1.5 flex transform items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md border border-white text-white bg-indigo-500 font-medium transition-all duration-300 active:scale-90"
      >
        <span className="relative z-10 flex items-center gap-2">
          Upgrade to Premium
        </span>

        <div className="ease-&lsqb;cubic-bezier(0.19,1,0.22,1)&rsqb; absolute -left-[75px] -top-[50px] -z-10 h-[155px] w-8 rotate-[35deg] bg-white opacity-20 transition-all duration-500 group-hover:left-[120%]" />
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

export default UpgradePremiumButton;
