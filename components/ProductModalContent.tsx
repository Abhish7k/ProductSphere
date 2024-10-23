import Image from "next/image";
import Link from "next/link";
import { PiCaretUpFill, PiChatCircle, PiUploadSimple } from "react-icons/pi";
import CarouselComponent from "./CarouselComponent";
import { Button } from "./ui/button";

interface ProductModalContentProps {
  currentProduct: any;
  authenticatedUser: any;
  totalUpvotes: number;
  hasUpvoted: boolean;
  setTotalUpvotes: any;
  setHasUpvoted: any;
}

const ProductModalContent = ({
  currentProduct,
  authenticatedUser,
  totalUpvotes,
  hasUpvoted,
  setTotalUpvotes,
  setHasUpvoted,
}: ProductModalContentProps) => {
  const handleUpvoteClick = () => {
    // hasUpvoted = true;
  };

  return (
    <div className="h-full">
      <div className="md:w-[90%] mx-auto">
        <Image
          src={currentProduct.logo}
          alt="logo"
          width={200}
          height={200}
          className="h-20 w-20 border rounded-md bg-white shadow-md"
        />

        <div className="py-5 space-y-2">
          <h1 className="text-3xl font-semibold capitalize">
            {currentProduct.name}
          </h1>

          <div className="md:flex md:justify-between items-center">
            <p className="text-gray-600 text-xl font-light md:w-3/5">
              {currentProduct.headline}
            </p>

            <div className="flex items-center gap-2 pt-4">
              <button
                onClick={() => window.open(currentProduct.website, "_blank")}
                className="border rounded-md flex justify-center items-center py-5 px-8 cursor-pointer
                hover:bg-foreground/5 transition-all duration-300
                "
              >
                Visit
              </button>

              <button
                className={`rounded-md flex justify-center items-center p-5 gap-x-3 cursor-pointer bg-gradient-to-r w-full xl:w-56
                ${
                  hasUpvoted
                    ? "from-[#ff6154] to-[#ff4582] border-[#ff6154] text-white"
                    : "text-black border hover:bg-red-100 transition-all duration-300"
                }`}
                onClick={handleUpvoteClick}
              >
                <PiCaretUpFill
                  className={`text-xl ${
                    hasUpvoted ? "text-white" : "text-black"
                  }`}
                />
                Upvote {totalUpvotes}
              </button>
            </div>
          </div>

          <h2 className="text-gray-600 py-10">{currentProduct.description}</h2>

          <div className="md:flex justify-between items-center pb-10">
            <div className="flex gap-x-2">
              {currentProduct.categories.map((category: any) => (
                <Link
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="bg-foreground/5 text-gray-600 px-4 py-2 text-sm lg:text-base font-medium rounded-md cursor-pointer hover:bg-foreground/10 transition-all duration-300"
                >
                  {category}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-x-6 py-4">
              <div className="text-md text-foreground/70 font-medium flex items-center gap-x-1 cursor-pointer hover:text-foreground/90 transition-all duration-300">
                <PiChatCircle />
                <p>Discuss</p>
              </div>

              <div
                // onClick={handleShareClick}
                className="text-md text-foreground/70 font-medium flex items-center gap-x-1 cursor-pointer hover:text-foreground/90 transition-all duration-300"
              >
                <PiUploadSimple />
                <p>Share</p>
              </div>
            </div>
          </div>

          <CarouselComponent productImages={currentProduct.images} />
        </div>
      </div>
    </div>
  );
};

export default ProductModalContent;