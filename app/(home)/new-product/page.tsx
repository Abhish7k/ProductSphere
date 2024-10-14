"use client";

import { useCallback, useState } from "react";

const categories = [
  "Media",
  "Blockchain",
  "Cloud",
  "Commerce",
  "Cybersecurity",
  "Data",
  "Design",
  "Photography",
  "E-commerce",
  "Education",
  "Entertainment",
  "Video",
  "Finance",
  "Social",
  "Health",
  "Fitness",
  "Marketing",
  "Music",
  "Productivity",
  "Engineering",
  "Sales",
  "Sports",
  "Travel",
  "Bootstrapped",
  "Art",
  "Analytics",
];

const NewProduct = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevCategories) =>
        prevCategories.filter((prevCategory) => prevCategory !== category)
      );
    } else if (selectedCategories.length < 3) {
      setSelectedCategories((prevCategories) => [...prevCategories, category]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-20">
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
      </div>

      {step === 2 && (
        <div className="space-y-10">
          <h1 className="text-4xl font-semibold">
            🏷️ What category does your product belong to ?
          </h1>

          <p className="text-xl font-light mt-4 leading-8">
            Choose at least 3 categories that best fits your product. This will
            people discover your product
          </p>

          <div className="mt-10">
            <h2 className="font-medium">Select Categories</h2>
            <div className="grid grid-cols-4 gap-2 pt-4 items-center justify-center">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex border rounded-full"
                  onClick={() => handleCategoryToggle(category)}
                >
                  <div
                    className={`text-xs md:text-sm p-2 cursor-pointer w-full text-center
                     ${
                       selectedCategories.includes(category)
                         ? "bg-[#ff6154] text-white rounded-full"
                         : "text-black"
                     }
                     `}
                  >
                    {category}
                  </div>
                </div>
              ))}
            </div>
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
  );
};

export default NewProduct;
