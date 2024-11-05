import Link from "next/link";
import React from "react";

const SubmitButton = () => {
  return (
    <Link
      href="/new-product"
      className="px-2 sm:px-4 py-2 text-sm sm:text-base text-red-600 bg-red-200 rounded-md transition-all duration-500
      group relative inline-flex items-center justify-center overflow-hidden font-medium"
    >
      <span>Submit</span>
      <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
        <div className="relative h-full w-8 bg-white/20"></div>
      </div>
    </Link>
  );
};

export default SubmitButton;
