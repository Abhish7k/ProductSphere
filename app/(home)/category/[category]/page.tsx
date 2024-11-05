import { getProductsByCategoryName } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { CiGlobe } from "react-icons/ci";
import { PiChatCircle } from "react-icons/pi";

interface CategoryParams {
  category: string;
}

const CategoryPage = async ({ params }: { params: CategoryParams }) => {
  const capitalizedCategory =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

  const products = await getProductsByCategoryName(capitalizedCategory);

  //   console.log(products);

  return (
    <div className="pt-10 px-6 md:px-0 md:w-3/5 mx-auto">
      <h1 className="text-4xl font-semibold pt-10">{capitalizedCategory}</h1>

      <p className="text-gray-500 pt-2">
        Check out whats&apos;s going on in {capitalizedCategory} !
      </p>

      <div className="pt-10 space-y-4">
        {products.map((product: any) => {
          const categoryNames = product.categories.map(
            (category: any) => category.name
          );

          return (
            <div
              key={product.id}
              //   href={`/product/${product.slug}`}
              className="flex gap-x-4 items-center p-2 rounded-md group relative py-3 px-4 w-full cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-[#ffe6d3] via-[#fdfdfd] to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-md" />

              {/*  */}
              <div className="relative flex items-center justify-between w-full">
                <div className="flex items-center gap-5 w-full">
                  <Image
                    src={product.logo}
                    alt="logo"
                    width={1000}
                    height={1000}
                    className="h-14 w-14 rounded-md"
                  />

                  <div className="flex flex-col gap-1">
                    <div className="md:flex items-center gap-x-2 gap-y-2">
                      <h1 className="text-xl font-medium capitalize">
                        {product.name}
                      </h1>

                      <p className="hidden md:flex text-xs">-</p>

                      <p className="text-foreground/70 text-sm md:text-base pr-2 font-medium">
                        {product.headline}
                      </p>
                    </div>

                    <div className="hidden md:flex gap-x-2 items-center">
                      <div className="text-xs text-gray-500 flex gap-x-1 items-center">
                        {product.comments.length}
                        <PiChatCircle />
                      </div>

                      {categoryNames.map((category: any, idx: any) => (
                        <div
                          key={idx}
                          className="text-xs md:text-sm text-gray-500 tracking-tight"
                        >
                          <div className="flex gap-x-1 items-center">
                            <div className="mr-1">•</div>
                            <Link
                              //   href={`/category/${category.toLowerCase()}`}
                              href="/"
                              className="hover:underline"
                            >
                              {category}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <a
                    href={product.website}
                    target="_blank"
                    className="px-5 py-1.5 rounded flex justify-center items-center font-medium cursor-pointer
                    bg-gradient-to-r from-[#ff6154] to-[#ff4582] border-[#ff6154] text-white
                    transition-all duration-300
                    w-fit"
                  >
                    Visit
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryPage;
