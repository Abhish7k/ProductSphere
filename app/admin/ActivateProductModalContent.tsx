import { Button } from "@/components/ui/button";
import { activateProduct } from "@/lib/actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { PiCheckCircle } from "react-icons/pi";
import { toast } from "sonner";

interface Props {
  currentProduct: any;
  closeModal: () => void;
}

const ActivateProductModalContent: React.FC<Props> = ({
  currentProduct,
  closeModal,
}) => {
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const handleActivate = async () => {
    try {
      setLoader(true);

      await activateProduct(currentProduct.id);

      toast(
        <>
          <div className="flex items-center gap-4 mx-auto w-full">
            <PiCheckCircle className="text-green-500 text-3xl" />
            <div className="text-md font-semibold">
              Product activated successfully
            </div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );

      setLoader(false);

      closeModal();

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-start">
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-5 transition-all">
        <PiCheckCircle className="text-5xl text-emerald-500 mb-4 bg-emerald-100 p-1 rounded-md" />

        <h1 className="text-3xl font-bold mb-4">Activate Product</h1>
      </div>

      <p className="text-gray-500 mb-4">
        Are you sure you want to activate this product ?
      </p>

      <p className="pb-10 text-gray-500">
        Once activated, the product will be visible to the public and users will
        be able to interact with it
      </p>

      <button
        onClick={handleActivate}
        className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-medium hover:text-emerald-800 active:bg-emerald-300 transition-all"
      >
        Click here to activate
        {loader ? <LuLoader2 className="animate-spin" /> : ""}
      </button>
    </div>
  );
};

export default ActivateProductModalContent;
