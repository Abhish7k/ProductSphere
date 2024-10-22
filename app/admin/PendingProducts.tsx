"use client";

import ProductModalContent from "@/components/ProductModalContent";
import ActivateProductModal from "@/components/ui/modal/ActivateProductModal";
import ProductModal from "@/components/ui/modal/ProductModal";
import RejectProductModal from "@/components/ui/modal/RejectProductModal";
import Image from "next/image";
import { useState } from "react";
import { PiCheckCircle, PiXCircle } from "react-icons/pi";

interface PendingProductsProps {
  pendingProducts: any;
  authenticatedUser: any;
}

const PendingProducts: React.FC<PendingProductsProps> = ({
  pendingProducts,
  authenticatedUser,
}) => {
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const [viewProductModalVisible, setViewProductModalVisible] = useState(false);
  const [activateProductModalVisible, setActivateProductModalVisible] =
    useState(false);
  const [rejectProductModalVisible, setRejectProductModalVisible] =
    useState(false);

  const formattedProducts = pendingProducts?.map((products: any) => {
    const {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      instagram,
      createdAt,
      updatedAt,
      userId,
      status,
      images,
      categories,
    } = products;

    const imageUrl = images.map((image: any) => image.url);
    const categoryNames = categories.map((category: any) => category.name);

    return {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      instagram,
      createdAt,
      updatedAt,
      userId,
      status,
      images: imageUrl,
      categories: categoryNames,
    };
  });

  console.log("Pending products -> ", pendingProducts);

  const handleViewProductModal = (product: any) => {
    const formattedProduct = formattedProducts.find(
      (formattedProduct: any) => formattedProduct.id === product.id
    );

    setCurrentProduct(formattedProduct);
    setViewProductModalVisible(true);
  };

  const handleActivateProductModal = (product: any) => {
    setCurrentProduct(product);
    setActivateProductModalVisible(true);
  };

  const handleRejectProductModal = (product: any) => {
    setCurrentProduct(product);
    setRejectProductModalVisible(true);
  };

  return (
    <div>
      <div className="flex flex-col w-full my-5">
        {formattedProducts?.map((product: any) => (
          <div
            key={product.id}
            className="flex items-center rounded-md p-4 justify-between border"
          >
            <div className="flex gap-x-6 items-center">
              <Image
                src={product.logo}
                alt="logo"
                width={200}
                height={200}
                className="w-14 h-14 md:w-20 md:h-20 rounded-md cursor-pointer"
              />

              <div className="space-y-1">
                <h1 className="text md:text-2xl font-bold capitalize">
                  {product.name}{" "}
                </h1>
                <p className="hidden md:flex text-gray-500 text-xs lg:text-sm pr-6">
                  {product.description}
                </p>
                <div className="hidden md:flex text-gray-500 font-medium">
                  Release Date : {product.releaseDate}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-2 md:gap-x-4 justify-center">
              <button
                onClick={() => handleViewProductModal(product)}
                className="bg-[#ff6154] text-white px-4 py-2 text-center text-sm rounded-md hover:bg-[#ff4437] transition-all duration-300"
              >
                <span className="hidden sm:block">View Product</span>
                <span className="block sm:hidden">X</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleActivateProductModal(product)}
                  className="bg-emerald-100 text-white px-4 py-2 text-center text-sm rounded-md hover:bg-emerald-200 transition-all duration-300"
                >
                  <PiCheckCircle className="text-xl text-emerald-500" />
                </button>

                <button
                  onClick={() => handleRejectProductModal(product)}
                  className="bg-red-100 text-white px-4 py-2 text-center text-sm rounded-md hover:bg-red-200 transition-all duration-300"
                >
                  <PiXCircle className="text-xl text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}

        <ProductModal
          visible={viewProductModalVisible}
          setVisible={setViewProductModalVisible}
        >
          <ProductModalContent
            currentProduct={currentProduct}
            authenticatedUser={authenticatedUser}
            hasUpvoted={false}
            totalUpvotes={0}
            setTotalUpvotes={() => {}}
            setHasUpvoted={() => {}}
          />
        </ProductModal>

        <ActivateProductModal
          visible={activateProductModalVisible}
          setVisible={setActivateProductModalVisible}
        >
          ActivateProductModal
        </ActivateProductModal>

        <RejectProductModal
          visible={rejectProductModalVisible}
          setVisible={setRejectProductModalVisible}
        >
          RejectProductModal
        </RejectProductModal>
      </div>
    </div>
  );
};

export default PendingProducts;
