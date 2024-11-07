"use client";

import { createCustomerLink } from "@/lib/stripe";
import { PiXBold } from "react-icons/pi";
import { toast } from "sonner";

const ManageBilling = () => {
  const handleManageBilling = async () => {
    try {
      const result = await createCustomerLink();

      if (result) {
        window.location.href = result;
      } else {
        throw new Error("Error creating customer portal link");
      }
    } catch (error) {
      console.log(error);

      toast(
        <>
          <div className="flex items-center gap-4 mx-auto w-full">
            <PiXBold className="text-red-500 text-3xl" />
            <p>Could not create checkout session. Please try again</p>
          </div>
        </>,
        {
          position: "top-right",
        }
      );
    }
  };

  return (
    <button
      onClick={handleManageBilling}
      className="border rounded-md px-4 py-2 hover:bg-gray-50 transition-all duration-300"
    >
      Manage Billing
    </button>
  );
};

export default ManageBilling;
