import Image from "next/image";
import { PiCaretUpFill } from "react-icons/pi";

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
                className="border rounded-md flex justify-center items-center p-5 cursor-pointer
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
                {totalUpvotes}
              </button>
            </div>
          </div>

          <h2 className="text-gray-600 py-10">{currentProduct.description}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductModalContent;
