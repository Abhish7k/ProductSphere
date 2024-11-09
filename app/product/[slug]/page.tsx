import CarouselComponent from "@/components/CarouselComponent";
import { getProductBySlug } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";

interface ProductParams {
  slug: string;
}

const ProductPage = async ({ params }: { params: ProductParams }) => {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return (
      <div>
        <h1 className="text-3xl text-center font-bold">
          You have not upvoted any products yet
        </h1>
      </div>
    );
  }

  const productImageUrls = product.images.map((image: any) => image.url);

  return (
    <div className="mx-auto lg:w-3/5 px-6 py-10 lg:px-0">
      <div className="flex items-center justify-between">
        <div className="flex gap-x-4 items-center">
          <Image
            src={product.logo}
            alt="logo"
            width={1000}
            height={1000}
            className="w-16 h-16 md:w-20 md:h-20 rounded-md cursor-pointer border shadow-md transition-all"
          />

          <div className="flex flex-col gap-2">
            <h2 className="font-semibold text-xl sm:text-3xl transition-all">
              {product.name}
            </h2>
            <p className="pl-0.5 text-sm sm:text-base font-medium text-foreground/80">
              {product.headline}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <a
            href={product.website}
            target="_blank"
            className="px-3 py-1 sm:px-5 sm:py-2 border rounded flex justify-center items-center font-medium hover:border-indigo-500 transition-all duration-300"
          >
            Visit
          </a>
        </div>
      </div>

      {product.description && (
        <div className="pt-5">
          <p className="text-gray-500">{product.description}</p>
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
        {product.categories.map((category: any) => (
          <Link
            href={`/category/${category.name.toLowerCase()}`}
            key={category.id}
            className="px-4 py-2 bg-gray-100 text-gray-600 rounded-md cursor-pointer
            hover:bg-gray-200 transition-all duration-300"
          >
            <h2 className="text-xs text-center">{category.name}</h2>
          </Link>
        ))}
      </div>

      <div className="pt-10">
        <CarouselComponent productImages={productImageUrls} />
      </div>

      <h2 className="font-semibold text-xl pb-5 pt-20 border-b">
        Community Feedback
      </h2>

      {product.comments.length > 0 ? (
        <div className="mt-4 space-y-4">
          {product.comments.map((comment: any) => (
            <div key={comment.id} className="p-4 rounded-lg ">
              <div className="flex gap-x-4 items-center">
                <Image
                  src={comment.user.image}
                  alt="profile"
                  width={50}
                  height={50}
                  className="rounded-full h-10 w-10"
                />

                <div>
                  <h2 className="font-semibold">{comment.user.name}</h2>
                  <p className="text-gray-500">{comment.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="pt-4">
          <h2 className="text-xl font-semibold">No comments yet</h2>
          <p className="text-gray-500 pt-4">
            Be the first to comment on this product
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
