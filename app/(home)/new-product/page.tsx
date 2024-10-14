"use client";

import { ImagesUploader } from "@/components/ImagesUploader";
import { LogoUploader } from "@/components/LogoUploader";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { PiCalendar } from "react-icons/pi";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
  const [headline, setHeadline] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  const [uploadedLogoUrl, setUploadedLogoUrl] = useState<string>("");
  const [uploadedProductImages, setUploadedProductImages] = useState<string[]>(
    []
  );

  const [date, setDate] = React.useState<Date | undefined>(new Date());

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

  const handleHeadlineChange = (e: any) => {
    const headlineText = e.target.value.slice(0, 70);
    setHeadline(headlineText);
  };

  const handleShortDescriptionChange = (e: any) => {
    setShortDescription(e.target.value.slice(0, 300));
  };

  const handleLogoUpload = useCallback((url: any) => {
    setUploadedLogoUrl(url);
  }, []);

  const handleProductImagesUpload = useCallback((urls: string[]) => {
    setUploadedProductImages(urls);
  }, []);

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

      {step === 3 && (
        <div className="space-y-10">
          <h1 className="text-4xl font-semibold">📝 Product Details</h1>
          <p className="text-xl font-light mt-4 leading-8">
            Keep it simple and clear. Describe your product in a way that makes
            it easy for people to understand what it does.
          </p>

          <div className="mt-10">
            <h2 className="font-medium">Headline</h2>
            <input
              type="text"
              value={headline}
              className="border rounded-md p-2 w-full mt-2 focus:outline-none"
              onChange={handleHeadlineChange}
            />

            <div className="text-sm text-gray-500 mt-1">
              {headline.length} / 70
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-medium">Short Description</h2>
            <textarea
              className="border rounded-md p-2 w-full mt-2 focus:outline-none"
              rows={8}
              maxLength={300}
              value={shortDescription}
              onChange={handleShortDescriptionChange}
            />

            <div className="text-sm text-gray-500 mt-1">
              {shortDescription.length} / 300
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-10">
          <h1 className="text-4xl font-semibold">
            🖼️ Add images to showcase your product
          </h1>
          <p className="text-xl font-light mt-4 leading-8">
            Include images that best represent your product. This will help
            people understand what your product looks like.
          </p>

          <div className="mt-10">
            <h2 className="font-medium">Logo</h2>

            {uploadedLogoUrl ? (
              <div className="mt-2">
                <Image
                  src={uploadedLogoUrl}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="rounded-md h-40 w-40 object-cover"
                />
              </div>
            ) : (
              <LogoUploader
                endpoint="productLogo"
                onChange={handleLogoUpload}
              />
            )}
          </div>

          <div className="mt-4">
            <div className="font-medium">
              Product Images (upload atleast 3 images)
            </div>

            {uploadedProductImages.length > 0 ? (
              <div className="mt-2 md:flex gap-2 space-y-4 md:space-y-0">
                {uploadedProductImages.map((url, index) => (
                  <div key={index} className="relative  md:w-40 h-40 ">
                    <Image
                      priority
                      src={url}
                      alt="Uploaded Product Image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <ImagesUploader
                endpoint="productImages"
                onChange={handleProductImagesUpload}
              />
            )}
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="space-y-5">
          <h1 className="text-4xl font-semibold"> 🗓️ Release Date</h1>
          <p className="text-xl font-light mt-4 leading-8">
            When will your product be available to the public? Select a date to
            continue.
          </p>

          <div className="mt-10">
            <h1 className="font-medium pb-4">Release Dates</h1>

            <>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[300px] pl-3 text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}

                    <PiCalendar className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => setDate(date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            </>
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
