"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { PiCheck, PiCopy } from "react-icons/pi";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";

interface ShareModalContentProps {
  currentProduct: any;
}

const ShareModalContent: React.FC<ShareModalContentProps> = ({
  currentProduct,
}) => {
  const [copiedText, setCopiedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const urlPrefix = "http://localhost:3000/products/";

  useEffect(() => {
    if (currentProduct && currentProduct.slug) {
      setCopiedText(urlPrefix + currentProduct.slug);
    }
  }, [currentProduct, urlPrefix]);

  const handleCopy = () => {
    setIsCopied(true);
  };

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row items-start gap-x-5 gap-y-2 mb-10 transition-all">
        <Image
          src={currentProduct.logo}
          alt="logo"
          width={200}
          height={200}
          className="h-24 w-28 bg-white shadow-md border rounded-md"
        />

        <div className="flex flex-col items-start gap-2 my-auto">
          <h1 className="text-xl sm:text-2xl font-semibold capitalize transition-all">
            {currentProduct.name}
          </h1>

          <h3 className="text-sm sm:text-base text-foreground/80 font-medium transition-all">
            {currentProduct.headline}
          </h3>
        </div>
      </div>

      <div className="py-4 flex flex-col items-center gap-2">
        <h1 className="text-xl font-medium">Share this product</h1>
        <p className="text-sm sm:text-base text-gray-600 text-center transition-all">
          Stay connected by following the product on social media
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <a
            href={currentProduct.twitter}
            target="_blank"
            className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 p-3 rounded-full transition-all hover:scale-105 hover:shadow-lg duration-500"
          >
            <FaTwitter className="text-3xl text-white" />
          </a>

          <a
            href={currentProduct.instagram}
            target="_blank"
            className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-3 rounded-full transition-all hover:scale-105 hover:shadow-lg duration-500"
          >
            <FaInstagram className="text-3xl text-white" />
          </a>
        </div>

        <h1 className="pt-6 font-semibold">Copy Link</h1>
        <div className="mt-2 mx-auto w-full flex justify-center border rounded-md p-2">
          <input
            type="text"
            value={copiedText}
            className="text-sm md:text-md w-full rounded-md focus:outline-none"
            readOnly
          />
          {isCopied ? (
            <button className="bg-[#3daf64] text-white p-2 rounded-md hover:scale-105">
              <PiCheck className="text-white" />
            </button>
          ) : (
            <CopyToClipboard text={copiedText} onCopy={handleCopy}>
              <button className="bg-[#ff6154] text-white p-2 rounded-md hover:scale-105">
                <PiCopy className="text-white" />
              </button>
            </CopyToClipboard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShareModalContent;
