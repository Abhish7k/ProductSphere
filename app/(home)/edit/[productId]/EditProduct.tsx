"use client";

import EditProductModal from "@/components/ui/modal/EditProductModal";
import { useState } from "react";
import { PiPencil } from "react-icons/pi";
import EditProductForm from "./EditProductForm";

const EditProduct = ({ product }: { product: any }) => {
  const [editProductModalVisible, setEditProductModalVisible] = useState(false);

  const handleEditProductClick = () => {
    setEditProductModalVisible(true);
  };

  return (
    <>
      <button
        onClick={handleEditProductClick}
        className="flex items-center justify-center p-4 bg-emerald-100 hover:bg-emerald-200 rounded-md cursor-pointer transition-all duration-300"
      >
        <PiPencil className="text-xl text-emerald-500" />
      </button>

      <EditProductModal
        visible={editProductModalVisible}
        setVisible={setEditProductModalVisible}
      >
        <EditProductForm product={product} />
      </EditProductModal>
    </>
  );
};

export default EditProduct;
