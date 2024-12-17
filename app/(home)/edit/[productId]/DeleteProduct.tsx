"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PiCheckCircle, PiStorefront, PiTrash } from "react-icons/pi";
import Modal from "@/components/ui/modal/modal";
import { deleteProduct } from "@/lib/actions";
import { toast } from "sonner";
import { LuLoader2 } from "react-icons/lu";

const DeleteProduct = ({ productId }: { productId: string }) => {
  const router = useRouter();

  const [confirmationInput, setConfirmationInput] = useState("");
  const [isDeleteButtonEnabled, setIsDeleteButtonEnabled] = useState(false);

  const [loader, setLoader] = useState(false);

  const handleConfirmationInputChange = (e: any) => {
    const inputText = e.target.value.toLowerCase();
    setConfirmationInput(inputText);
    setIsDeleteButtonEnabled(inputText === "delete");
  };

  const handleCancel = () => {
    setDeleteProductModalVisible(false);
  };

  const [deleteProductModalVisible, setDeleteProductModalVisible] =
    useState(false);

  const handleDeleteProductClick = () => {
    setDeleteProductModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (confirmationInput === "delete") {
      setLoader(true);

      setTimeout(async () => {
        try {
          await deleteProduct(productId);

          toast(
            <>
              <div className="flex items-center gap-4  mx-auto">
                <PiCheckCircle className="text-emerald-500 text-3xl" />
                <div className="text-md font-semibold">
                  Product deleted successfully.
                </div>
              </div>
            </>,
            {
              position: "top-right",
            }
          );

          setLoader(false);

          router.push("/my-products");
          router.refresh();
        } catch (error) {
          console.error(error);
        }
      }, 3000);
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteProductClick}
        className=" cursor-pointer bg-red-100 p-4 justify-center rounded-md flex items-center hover:bg-red-200 transition-all duration-300"
      >
        <PiTrash className="text-xl text-red-500 " />
      </button>

      <Modal
        visible={deleteProductModalVisible}
        setVisible={setDeleteProductModalVisible}
      >
        <div className="max-w-lg">
          <PiStorefront className="text-red-500 mb-10 text-5xl bg-red-100 p-1 rounded-md" />
          <h1 className="text-xl font-semibold mb-10">Delete Product</h1>

          <p className="text-sm">
            We&apos;re sorry to see you go. Once your product is deleted, all of
            your content will be permanently gone, including your products and
            product settings.
          </p>

          <p className="text-sm py-10">
            This action cannot be undone. This will permanently delete your
            product and all of your content.
          </p>

          <p className="text-sm">To confirm deletion, type “delete” below:</p>

          <input
            type="text"
            className="border w-full p-4 rounded-xl mt-6 focus:outline-none"
            value={confirmationInput}
            onChange={handleConfirmationInputChange}
          />

          <div className="flex justify-end mt-10">
            <button
              className="bg-white text-red-500
             border text-sm rounded-full border-red-500 
             px-4 py-2 mr-4 font-light cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className={`${
                isDeleteButtonEnabled
                  ? "bg-red-500 text-white rounded-full text-sm"
                  : "bg-gray-200 text-gray-500 rounded-full text-sm cursor-not-allowed"
              } px-4 py-2 flex items-center gap-2`}
              disabled={!isDeleteButtonEnabled}
              onClick={handleConfirmDelete}
            >
              Confirm delete
              {loader ? <LuLoader2 className="w-5 h-5 animate-spin" /> : ""}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DeleteProduct;
