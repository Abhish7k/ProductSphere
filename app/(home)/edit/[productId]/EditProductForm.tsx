"use client";

import { ImagesUploader } from "@/components/ImagesUploader";
import { LogoUploader } from "@/components/LogoUploader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiFlag, PiPencilLine } from "react-icons/pi";

const EditProductForm = ({ product }: { product: any }) => {
  const [isEditingLogo, setIsEditingLogo] = useState(false);
  const [uploadedLogoUrl, setUploadedLogoUrl] = useState("");
  const [isEditingProductImages, setIsEditingProductImages] = useState(false);
  const [uploadedProductImages, setUploadedProductImages] = useState<string[]>(
    []
  );

  const [name, setName] = useState(product.name);
  const [headline, setHeadline] = useState(product.headline);
  const [description, setDescription] = useState(product.description);
  const [releaseDate, setReleaseDate] = useState(product.releaseDate);
  const [website, setWebsite] = useState(product.website);
  const [twitter, setTwitter] = useState(product.twitter);
  const [instagram, setInstagram] = useState(product.instagram);
  const [categories, setCategories] = useState(product.categories);
  const [slug, setSlug] = useState(product.slug);

  const router = useRouter();

  const handleLogoUpload = (url?: string) => {
    if (url) {
      setUploadedLogoUrl(url);
      setIsEditingLogo(false);
    } else {
      setIsEditingLogo(true);
    }
  };

  const handleProductImagesUpload = (urls: string[]) => {
    setUploadedProductImages(urls);

    setIsEditingProductImages(false);
  };

  const handleNameChange = (e: any) => {
    const productName = e.target.value;
    const truncatedName = productName.slice(0, 30);

    setName(truncatedName);
  };

  const onSave = () => {};

  return (
    <div className="h-full">
      <div className="flex items-center gap-4 mx-auto">
        <PiPencilLine className="text-3xl text-emerald-500" />
        <h1 className="text-2xl font-bold">Edit Product</h1>
      </div>

      <div className="w-full rounded-md p-10 bg-emerald-100 mt-10 md:flex items-center gap-x-4">
        <PiFlag className="text-5xl text-emerald-500 mb-4 md:mb-0" />
        <div className="text-gray-600">
          This is the product form. You can update the product details here. If
          your product is currently live, and you make changes to the product
          details. It will delist the product from the marketplace until it is
          reviewed and approved by the admin.
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 space-y-4 mt-10">
        <div className="">
          <h1 className="text-lg font-medium">Logo</h1>

          {isEditingLogo ? (
            <div>
              <LogoUploader
                endpoint="productLogo"
                onChange={handleLogoUpload}
              />

              <button
                onClick={() => setIsEditingLogo(false)}
                className="mt-2 text-red-500 cursor-pointer hover:underline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <Image
                src={uploadedLogoUrl || product.logo}
                alt="logo"
                width={200}
                height={200}
                className="w-28 md:w-60 border rounded-md cursor-pointer"
              />
              <button
                onClick={() => setIsEditingLogo(true)}
                className="text-sm text-blue-500 cursor-pointer hover:underline mt-2"
              >
                Change Logo
              </button>
            </div>
          )}
        </div>

        <div>
          <h1 className="text-lg font-medium">Product Name</h1>
          <input
            type="text"
            className="w-full p-4 border rounded-xl focus:outline-none mt-6"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div>
          <div className="text-lg font-medium">Website</div>
          <input
            type="text"
            className="border w-full focus:outline-none mt-6 p-4 rounded-xl"
            value={website} // Bind value to state variable
            onChange={(e) => setWebsite(e.target.value)} // Update state variable on change
          />
        </div>

        <div>
          <div className="text-lg font-medium">Release Date</div>
          <input
            type="text"
            className="border w-full focus:outline-none mt-6 p-4 rounded-xl"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </div>

        <div>
          <div className="text-lg font-medium">Headline</div>
          <textarea
            className="border w-full focus:outline-none mt-6 p-4 rounded-xl"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
        </div>

        <div>
          <div className="text-lg font-medium">Short Description</div>
          <textarea
            className="border w-full focus:outline-none mt-6 p-4 rounded-xl"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <div className="text-lg font-medium">Twitter</div>
          <input
            type="text"
            className="border w-full focus:outline-none mt-6 p-4 rounded-xl"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
          />
        </div>

        <div>
          <div className="text-lg font-medium">Instagram</div>
          <input
            type="text"
            className="border w-full focus:outline-none mt-6 p-4 rounded-xl"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
          />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <h1 className="text-lg font-medium">Categories</h1>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {product.categories.map((category: any) => (
              <div key={category.id}>
                <div
                  className="bg-gray-200 p-2
                text-center text-sm rounded-full"
                >
                  {category.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2">
          <div className="text-lg font-medium mb-2">Product Images</div>

          {isEditingProductImages ? null : (
            <div className="grid grid-cols-5 gap-4">
              {uploadedProductImages.length > 0 &&
                uploadedProductImages.map((url: string) => (
                  <div key={url}>
                    <Image
                      priority
                      src={url}
                      alt={product.name}
                      width={200}
                      height={200}
                      className=" border-gray-200 rounded-md hover:cursor-pointer"
                    />
                  </div>
                ))}
              {/* Display uploaded images if available, else render product images */}
              {uploadedProductImages.length === 0 &&
                product.images &&
                product.images.map((image: any) => (
                  <div key={image.id}>
                    <Image
                      priority
                      src={image.url}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-40 border-gray-200 rounded-md hover:cursor-pointer"
                    />
                  </div>
                ))}
            </div>
          )}

          {isEditingProductImages ? (
            <div className="">
              <ImagesUploader
                endpoint="productImages"
                onChange={handleProductImagesUpload}
              />
              <button
                className="mt-2 text-red-500 cursor-pointer hover:underline"
                onClick={() => setIsEditingProductImages(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditingProductImages(true)}
              className="text-sm text-blue-500 mt-2 cursor-pointer hover:underline"
            >
              Click to upload images
            </button>
          )}
        </div>
      </div>

      <div className="flex justify-end py-10">
        <button
          onClick={onSave}
          className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-md w-40 text-center cursor-pointer transition-all duration-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProductForm;
