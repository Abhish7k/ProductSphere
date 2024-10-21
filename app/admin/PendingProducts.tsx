import Image from "next/image";
import { PiCheckCircle, PiXCircle } from "react-icons/pi";

interface PendingProductsProps {
  pendingProducts: any;
  authenticatedUser: any;
}

const PendingProducts: React.FC<PendingProductsProps> = ({
  pendingProducts,
  authenticatedUser,
}) => {
  const formattedProducts = pendingProducts?.map((products: any) => {
    const {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      instagram,
      createdAt,
      updatedAt,
      userId,
      status,
      images,
      categories,
    } = products;

    const imageUrl = images.map((image: any) => image.url);
    const categoryNames = categories.map((category: any) => category.name);

    return {
      id,
      name,
      slug,
      headline,
      description,
      logo,
      releaseDate,
      website,
      twitter,
      instagram,
      createdAt,
      updatedAt,
      userId,
      status,
      images: imageUrl,
      categories: categoryNames,
    };
  });

  console.log("Pending products -> ", pendingProducts);

  return (
    <div>
      <div className="flex flex-col w-full my-5">
        {formattedProducts?.map((product: any) => (
          <div
            key={product.id}
            className="flex border rounded-md p-4 justify-between items-center"
          >
            <div className="flex gap-x-6 items-center">
              <Image
                src={product.logo}
                alt="logo"
                width={200}
                height={200}
                className="w-10 md:w-20 rounded-md cursor-pointer"
              />

              <div className="space-y-2">
                <h1 className="text-2xl font-bold">{product.name} </h1>
                <p className="hidden md:flex text-gray-500 text-sm pr-6">
                  {product.description}
                </p>
                <div className="hidden md:flex text-gray-500 font-semibold">
                  Release Date : {product.releaseDate}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-x-4 justify-center">
              <button
                // onClick={() => handleViewProductModal(product)}
                className="bg-[#ff6154]
                 text-white px-4 py-2 text-center
                  text-sm  rounded-md "
              >
                View Product
              </button>

              <button
                // onClick={() => handleActivateProductModal(product)}
                className="bg-emerald-100 text-white
                         px-4 py-2 text-center text-sm rounded-md"
              >
                <PiCheckCircle className="text-xl text-emerald-500" />
              </button>

              <button
                // onClick={() => handleRejectProductModal(product)}
                className="bg-red-100 text-white
                px-4 py-2 text-center text-sm rounded-md"
              >
                <PiXCircle className="text-xl text-red-500" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingProducts;
