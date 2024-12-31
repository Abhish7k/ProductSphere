"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { PiChatCircle } from "react-icons/pi";

interface Props {
  product: any;
}

export const CategoryPageProductItem: React.FC<Props> = ({ product }) => {
  const categoryNames = product.categories.map(
    (category: any) => category.name
  );

  return (
    <Link
      href={`/product/${product.slug}`}
      key={product.id}
      className="flex gap-x-4 items-center p-2 rounded-md group relative py-3 px-4 w-full cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-bl from-[#c9cef0] via-[#fefefe] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md group-hover:transition-all" />

      <div className="relative flex items-center justify-between w-full">
        <div className="flex items-center gap-5 w-full">
          <Image
            src={product.logo}
            alt="logo"
            width={1000}
            height={1000}
            className="h-14 w-14 rounded-md"
          />

          <div className="flex flex-col gap-1">
            <div className="md:flex items-center gap-x-2 gap-y-2">
              <h1 className="md:text-xl font-medium">{product.name}</h1>

              <p className="hidden md:flex text-xs">-</p>

              <p className="text-foreground/70 text-sm xl:text-base pr-2 font-medium">
                {product.headline}
              </p>
            </div>

            <div className="hidden md:flex gap-x-2 items-center">
              <div className="text-xs text-gray-500 flex gap-x-1 items-center">
                {product.comments.length}
                <PiChatCircle />
              </div>

              {categoryNames.map((category: any, idx: any) => (
                <div
                  key={idx}
                  className="text-xs md:text-sm text-gray-500 tracking-tight"
                >
                  <div className="flex gap-x-1 items-center">
                    <div className="mr-1">•</div>
                    <Link
                      href={`/category/${category.toLowerCase()}`}
                      className="hover:underline"
                    >
                      {category}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <a
            href={product.website}
            target="_blank"
            className="w-fit px-5 py-1.5 rounded flex justify-center items-center font-medium cursor-pointer border bg-white hover:border-indigo-500 transition-all duration-300 text-sm md:text-base active:scale-90"
          >
            Visit
          </a>
        </div>
      </div>
    </Link>
  );
};
