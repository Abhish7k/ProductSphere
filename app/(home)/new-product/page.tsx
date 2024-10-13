"use client";

import { useCallback, useState } from "react";

const NewProduct = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const nextStep = useCallback(() => {
    setStep(step + 1);
  }, [step]);

  const handleNameChange = (e: any) => {
    const productName = e.target.value;
    const truncatedName = productName.slice(0, 30);

    setName(truncatedName);

    // create slug from product name
    const slugValue = truncatedName
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/\./g, "-"); // Replace periods with hyphens in the slug

    setSlug(slugValue);
  };

  return (
    <div className="flex items-center justify-center py-8 md:py-20">
      <div className="px-8 md:w-3/5 md:mx-auto">
        {step === 1 && (
          <div className="space-y-10">
            <h1 className="text-4xl font-semibold"> 📦 New product</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Ready to showcase your product to the world? You came to the right
              place. Follow the steps below to get started.
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Name of the Product</h2>

              <input
                type="text"
                value={name}
                maxLength={30}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                onChange={handleNameChange}
              />

              <div className="text-sm text-gray-500 mt-2">
                {name.length} / 30
              </div>
            </div>

            <div className="mt-10">
              <h2 className="font-medium">
                Slug (Url) - This will be used to create a unique URL for your
                product
              </h2>

              <input
                type="text"
                value={slug}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                readOnly
              />
            </div>
          </div>
        )}
        <button
          onClick={nextStep}
          className="mt-20 border px-4 py-2 rounded w-fit"
        >
          Next
        </button>
      </div>

      {step === 2 && <div>step 2</div>}
    </div>
  );
};

export default NewProduct;
