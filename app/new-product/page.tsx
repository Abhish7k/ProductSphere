"use client";

import { ImagesUploader } from "@/components/ImagesUploader";
import { LogoUploader } from "@/components/LogoUploader";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";

import { PiCalendar, PiXCircleFill } from "react-icons/pi";
import { CiGlobe } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { createProduct } from "@/lib/actions";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "sonner";
import confetti from "canvas-confetti";

const categories = [
  "Media",
  "Blockchain",
  "Cloud",
  "Commerce",
  "Cybersecurity",
  "Data",
  "Design",
  "Photography",
  "Ecommerce",
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

  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");

  const [loading, setLoading] = useState(false);

  const nextStep = useCallback(() => {
    if (step === 1 && name.length < 4) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter at least 4 characters for the product name.
            </div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );

      return;
    }

    if (step === 2 && selectedCategories.length < 3) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please select at least 3 categories for the product.
            </div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );
      return;
    }

    if (step === 3 && headline.length < 10) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter at least 10 characters for the headline.
            </div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );
      return;
    }
    if (step === 3 && shortDescription.length < 20) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter at least 20 characters for the short description.
            </div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );
      return;
    }

    if (step === 4 && !uploadedLogoUrl) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please upload a logo for the product.
            </div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );
      return;
    }

    if (step === 4 && uploadedProductImages.length < 1) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Upload at least 3 images for the product.
            </div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );
      return;
    }

    if (step === 5 && !date) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please select a release date or choose the Coming soon option.
            </div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );
      return;
    }

    if (step == 6 && !website && !twitter && !instagram) {
      toast(
        <>
          <div className="flex items-center gap-4  mx-auto">
            <PiXCircleFill className="text-red-500 text-3xl" />
            <div className="text-md font-semibold">
              Please enter at least one link for the product.
            </div>
          </div>
        </>,
        {
          position: "top-right",
        }
      );
      return;
    }

    setStep(step + 1);
  }, [
    step,
    name,
    selectedCategories,
    headline,
    shortDescription,
    uploadedLogoUrl,
    uploadedProductImages,
    date,
    website,
    twitter,
    instagram,
  ]);

  const prevStep = useCallback(() => {
    setStep(step - 1);
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

  const handleWebsiteChange = (e: any) => {
    setWebsite(e.target.value);
  };

  const handleTwitterChange = (e: any) => {
    setTwitter(e.target.value);
  };

  const handleInstagramChange = (e: any) => {
    setInstagram(e.target.value);
  };

  const handleGoToProducts = () => {
    window.location.href = "/my-products";
  };

  const submitAnotherProduct = () => {
    setStep(1);
    setName("");
    setSlug("");
    setHeadline("");
    setShortDescription("");
    setDate(new Date());
    setWebsite("");
    setTwitter("");
    setInstagram("");
    setSelectedCategories([]);
    setUploadedProductImages([]);
    setUploadedLogoUrl("");
  };

  const submitProduct = async () => {
    setLoading(true);

    const formatedDate = date ? format(date, "dd/MM/yyyy") : "";

    try {
      await createProduct({
        name,
        slug,
        headline,
        website,
        twitter,
        instagram,
        description: shortDescription,
        logo: uploadedLogoUrl,
        releaseDate: formatedDate,
        images: uploadedProductImages,
        category: selectedCategories,
      });

      setStep(8);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const ConfettiSideCannons = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  useEffect(() => {
    if (step === 8) {
      ConfettiSideCannons();
    }
  }, [step]);

  return (
    <div className="flex flex-col items-center justify-center py-8 md:py-20">
      <div className="px-8 md:w-3/5 md:mx-auto overflow-hidden">
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // Slide in from the right
            animate={{ opacity: 1, x: 0 }} // Slide to the center
            exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
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
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // Slide in from the right
            animate={{ opacity: 1, x: 0 }} // Slide to the center
            exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            <h1 className="text-4xl font-semibold">
              🏷️ What category does your product belong to ?
            </h1>
            <p className="text-xl font-light mt-4 leading-8">
              Choose at least 3 categories that best fits your product. This
              will people discover your product
            </p>

            <div className="mt-10">
              <h2 className="font-medium">Select Categories</h2>
              <div className="grid grid-cols-4 gap-2 pt-4 items-center justify-center">
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    className="flex border rounded-full"
                    onClick={() => handleCategoryToggle(category)}
                    whileTap={{ scale: 0.9 }}
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
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // Slide in from the right
            animate={{ opacity: 1, x: 0 }} // Slide to the center
            exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            <h1 className="text-4xl font-semibold">📝 Product Details</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Keep it simple and clear. Describe your product in a way that
              makes it easy for people to understand what it does.
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
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // Slide in from the right
            animate={{ opacity: 1, x: 0 }} // Slide to the center
            exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
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
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // Slide in from the right
            animate={{ opacity: 1, x: 0 }} // Slide to the center
            exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <h1 className="text-4xl font-semibold"> 🗓️ Release Date</h1>
            <p className="text-xl font-light mt-4 leading-8">
              When will your product be available to the public? Select a date
              to continue.
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
          </motion.div>
        )}

        {step === 6 && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // Slide in from the right
            animate={{ opacity: 1, x: 0 }} // Slide to the center
            exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
            transition={{ duration: 0.3 }}
            className="space-y-10"
          >
            <h1 className="text-4xl font-semibold">🔗 Additional Links </h1>
            <p className="text-xl font-light mt-4 leading-8">
              Add links to your product&apos;s website, social media, and other
              platforms
            </p>

            <div className="mt-10">
              <div className="font-medium flex items-center gap-x-2">
                <CiGlobe className="text-2xl text-gray-600" />
                <h1 className="text-xl">Website</h1>
              </div>

              <input
                type="text"
                value={website}
                className="border rounded-md p-2 w-full mt-2 focus:outline-none"
                placeholder="https://www.yourdomain.com"
                onChange={handleWebsiteChange}
              />
            </div>

            <div className="mt-10">
              <div className="font-medium flex items-center gap-x-2">
                <FaXTwitter className="text-2xl" />
                <h1 className="text-xl">Twitter</h1>
              </div>

              <input
                placeholder="https://www.twitter.com"
                type="text"
                className="border rounded-md p-2 w-full mt-2 focus:outline-none "
                value={twitter}
                onChange={handleTwitterChange}
              />
            </div>

            <div className="mt-10">
              <div className="font-medium flex items-center gap-x-2">
                <FaInstagram className="text-2xl" />
                <h1 className="text-xl">Instagram</h1>
              </div>

              <input
                placeholder="https://www.instagram.com/"
                type="text"
                className="border rounded-md p-2 w-full mt-2 focus:outline-none "
                value={instagram}
                onChange={handleInstagramChange}
              />
            </div>
          </motion.div>
        )}

        {step === 7 && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // Slide in from the right
            animate={{ opacity: 1, x: 0 }} // Slide to the center
            exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <h1 className="text-4xl font-semibold"> 🔍 Review and submit</h1>
            <p className="text-xl font-light mt-4 leading-8">
              Review the details of your product and submit it to the world.
              Your product will be reviewed by our team before it goes live.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-8">
              <div>
                <h1 className="font-semibold">Name of the product</h1>
                <h6 className="mt-2 text-gray-600">{name}</h6>
              </div>

              <div className="">
                <div className="font-semibold">Slug ( URL ) </div>
                <div className=" mt-2 text-gray-600">{slug}</div>
              </div>

              <div className="">
                <div className="font-semibold">Category</div>
                <div className="  mt-2 text-gray-600">
                  {selectedCategories.join(", ")}
                </div>
              </div>

              <div>
                <div className="font-semibold">Website URL</div>
                <div className=" mt-2 text-gray-600">{website}</div>
              </div>

              <div className="">
                <div className="font-semibold">Headline</div>
                <div className="  mt-2 text-gray-600">{headline}</div>
              </div>

              <div className="">
                <div className="font-semibold">Short description</div>
                <div className=" mt-2 text-gray-600 ">{shortDescription}</div>
              </div>

              <div>
                <div className="font-semibold">Twitter</div>
                <div className=" mt-2 text-gray-600">{twitter}</div>
              </div>

              <div>
                <div className="font-semibold">Instagram</div>
                <div className=" mt-2 text-gray-600">{instagram}</div>
              </div>

              <div className="">
                <div className="font-semibold">
                  Release date - Pending Approval
                </div>

                <div className=" mt-2 text-gray-600">
                  {date ? date.toDateString() : "Not specified"}
                </div>
              </div>

              <div className="cols-span-2">
                <div className="font-semibold">Product Images</div>

                <div className="mt-2 md:flex gap-2 w-full">
                  {uploadedProductImages.map((url, index) => (
                    <div key={index} className="relative w-28 h-28">
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
              </div>
            </div>
          </motion.div>
        )}

        {step === 8 && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }} // Slide in from the right
            animate={{ opacity: 1, x: 0 }} // Slide to the center
            exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
            transition={{ duration: 0.3 }}
            className="flex flex-col items-start gap-5"
          >
            <div className="text-4xl font-semibold"> Congratulations 🎉</div>

            <div className="text-xl font-light mt-4 leading-8 ">
              Your product has been successfully submitted. Our team will review
              it and get back to you soon.
            </div>

            <div className="flex items-center gap-5">
              <div
                onClick={handleGoToProducts}
                className="bg-[#ff6154] hover:bg-orange-600 text-white py-2 px-4
                 rounded mt-4 flex w-60 justify-center items-center cursor-pointer transition-all duration-300"
              >
                Go to your products
              </div>

              <button
                onClick={submitAnotherProduct}
                className="text-[#ff6154] py-2 px-4 rounded mt-4 
                flex w-60 justify-center items-center cursor-pointer border hover:bg-foreground/5 transition-all duration-300"
              >
                Submit another product
              </button>
            </div>
          </motion.div>
        )}

        {step !== 8 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center mt-10"
            >
              {step !== 1 && (
                <Button
                  variant="outline"
                  onClick={prevStep}
                  className="text-gray-700"
                >
                  Previous
                </Button>
              )}

              <div className="flex items-center">
                {step === 7 ? (
                  <button
                    onClick={submitProduct}
                    className="flex items-center gap-2 bg-[#ff6154] hover:bg-orange-600 text-white py-2 px-4 rounded-md mt-4 transition-all duration-300"
                  >
                    Submit
                    {loading ? (
                      <LuLoader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      ""
                    )}
                  </button>
                ) : (
                  <button
                    onClick={nextStep}
                    className="bg-[#ff6154] hover:bg-orange-600 text-white py-2 px-4 rounded-md mt-4 items-end transition-all duration-300"
                  >
                    Continue
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default NewProduct;
