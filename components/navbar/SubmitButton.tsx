import Link from "next/link";
import React from "react";

const SubmitButton = () => {
  return (
    <Link
      href="/new-product"
      className="px-2 sm:px-4 py-2 text-sm sm:text-base text-red-600 bg-red-100 hover:bg-red-200 rounded-md transition-all"
    >
      Submit
    </Link>
  );
};

export default SubmitButton;
