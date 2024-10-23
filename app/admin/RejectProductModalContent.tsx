import { rejectProduct } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuLoader2 } from "react-icons/lu";
import { PiCheckCircle, PiXCircle } from "react-icons/pi";
import { toast } from "sonner";

interface Props {
  currentProduct: any;
  closeModal: () => void;
}

const RejectProductModalContent = ({ currentProduct, closeModal }: Props) => {
  const [reason, setReason] = useState("");
  const [loader, setLoader] = useState(false);

  const router = useRouter();

  const handleRejectButton = async () => {
    try {
      setLoader(true);

      await rejectProduct(currentProduct.id, reason);

      toast(
        <>
          <div className="flex items-center gap-4 mx-auto w-full    ">
            <PiCheckCircle className="text-green-500 text-3xl" />
            <div className="text-md font-semibold">
              Product rejected successfully
            </div>
          </div>
        </>,
        { position: "top-right" }
      );

      closeModal();

      router.refresh();

      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full overflow-auto flex flex-col items-start">
      <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 mb-2 transition-all">
        <PiXCircle className="text-red-500 text-5xl mb-4 bg-red-100 p-1 rounded-md" />

        <h1 className="text-3xl font-bold mb-4">Reject Product</h1>
      </div>

      <p className="text-gray-500 mb-4">
        Are you sure you want to reject this product?
      </p>

      <p className="text-gray-500">
        Once rejected, the owner will be notified with the neccessary steps to
        take.
      </p>

      <div className="w-full">
        <h1 className="text-gray-500 mt-2 py-4 font-semibold">
          Reason for rejection
        </h1>

        <textarea
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 rounded-md border focus:outline-none"
          placeholder="Enter reason for rejection"
          rows={2}
        >
          {reason}
        </textarea>
      </div>

      <button
        onClick={handleRejectButton}
        className="mt-10 flex items-center gap-2 px-4 py-2 rounded-md bg-red-100 hover:bg-red-200 text-red-800 font-medium active:bg-red-300 transition-all"
      >
        {loader ? <LuLoader2 className="animate-spin" /> : ""}
        Click here to reject
      </button>
    </div>
  );
};

export default RejectProductModalContent;
