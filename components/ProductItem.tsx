"use client";

import Image from "next/image";
import Link from "next/link";
import { CiGlobe } from "react-icons/ci";
import { PiCaretUpFill, PiChatCircle, PiXCircleFill } from "react-icons/pi";
import { motion } from "framer-motion";
import React, { useState } from "react";
import ProductModal from "./ui/modal/ProductModal";
import ProductModalContent from "./ProductModalContent";
import Modal from "./ui/modal/modal";
import AuthContent from "./navbar/AuthContent";
import { upvoteProduct } from "@/lib/actions";
import { toast } from "sonner";
import { FaExclamation } from "react-icons/fa";

interface ProductItemProps {
  product: any;
  authenticatedUser: any;
}

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  authenticatedUser,
}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<any>(null);

  const [hasUpvoted, setHasUpvoted] = useState(
    product.upvoters?.includes(authenticatedUser?.user.id)
  );

  const [totalUpvotes, setTotalUpvotes] = useState(product.upvotes || 0);

  const handleProductItemClick = () => {
    setCurrentProduct(product);
    setShowProductModal(true);
  };

  const handleUpvoteClick = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (!authenticatedUser) {
      toast(
        <>
          <div className="flex items-center gap-4 mx-auto w-full">
            <FaExclamation className="text-red-500 text-xl" />

            <div className="text-md font-semibold">
              Please Sign in to upvote products.
            </div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );

      setShowLoginModal(true);
    } else {
      try {
        await upvoteProduct(product.id);

        setHasUpvoted(!hasUpvoted);

        setTotalUpvotes(hasUpvoted ? totalUpvotes - 1 : totalUpvotes + 1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleArrowClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Prevent the click event from propagating to the product item container
    e.stopPropagation();

    // Open the link in a new tab
    window.open(`${product.website}`, "_blank");
  };

  const handleCategoryClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
  };

  const variants = {
    initital: { scale: 1 },
    upvoted: { scale: [1, 1.1, 1], transition: { duration: 0.3 } },
  };

  return (
    <div>
      <div className="group relative py-3 px-4 w-full cursor-pointer rounded-md active:scale-[99%]  transition-all ">
        <div
          className="absolute inset-0 
          bg-gradient-to-bl from-[#c9cef0] via-[#fefefe] to-white 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md 
          group-hover:transition-all"
        />

        <div className="relative flex items-center justify-between">
          <div
            onClick={handleProductItemClick}
            className="flex items-center gap-5 w-full"
          >
            <Image
              src={product.logo}
              alt="logo"
              width={1000}
              height={1000}
              className="h-14 w-14 rounded-md"
            />

            <div className="">
              <div className="md:flex items-center gap-x-2 gap-y-2">
                <h1 className="text-xl font-medium capitalize">
                  {product.name}
                </h1>

                <p className="hidden md:flex text-xs">-</p>

                <p className="text-foreground/70 text-sm md:text-base pr-2 font-medium">
                  {product.headline}
                </p>

                <Link
                  href={`/product/${product.website}`}
                  target="_blank"
                  // onClick={handleArrowClick}
                  className="hidden md:flex cursor-pointer"
                >
                  <CiGlobe className="hover:text-blue-500 transition-all duration-300" />
                </Link>
              </div>

              <div className="hidden md:flex gap-x-2 items-center">
                <div className="text-xs text-gray-500 flex gap-x-1 items-center">
                  {product.commentsLength}
                  <PiChatCircle />
                </div>

                {product.categories.map((category: string) => (
                  <div
                    key={category}
                    className="text-xs md:text-sm text-gray-500 tracking-tight"
                  >
                    <div className="flex gap-x-1 items-center">
                      <div className="mr-1">•</div>
                      <Link
                        href={`/category/${category}.toLowerCase()}`}
                        className="hover:underline"
                        onClick={handleCategoryClick}
                      >
                        {category}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-sm">
            <motion.div
              onClick={handleUpvoteClick}
              variants={variants}
              animate={hasUpvoted ? "upvoted" : "initital"}
              className=""
            >
              {hasUpvoted ? (
                <div className="border px-3 py-1 rounded-md flex flex-col items-center font-medium border-indigo-500 bg-white hover:bg-gray-50 transition-all">
                  <PiCaretUpFill className="text-xl -mb-1" />
                  {totalUpvotes}
                </div>
              ) : (
                <div className="border px-3 py-1 rounded flex flex-col items-center bg-white font-medium hover:bg-gray-50 transition-all">
                  <PiCaretUpFill className="text-xl -mb-1" />
                  <span className="text-sm">{totalUpvotes}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      <ProductModal visible={showProductModal} setVisible={setShowProductModal}>
        <ProductModalContent
          currentProduct={currentProduct}
          authenticatedUser={authenticatedUser}
          setTotalUpvotes={setTotalUpvotes}
          totalUpvotes={totalUpvotes}
          hasUpvoted={hasUpvoted}
          setHasUpvoted={setHasUpvoted}
        />
      </ProductModal>

      <Modal visible={showLoginModal} setVisible={setShowLoginModal}>
        <AuthContent />
      </Modal>
    </div>
  );
};

export default ProductItem;
