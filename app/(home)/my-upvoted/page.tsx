import { auth } from "@/auth";
import { AnimateContainer } from "@/components/landing-page/AnimatePageContainer";
import { getUpvotedProducts } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const MyUpvotedProductsPage = async () => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    redirect("/");
  }

  const products = await getUpvotedProducts();

  return (
    <AnimateContainer>
      <div className="mx-auto lg:w-4/5 xl:w-3/5 pt-10 px-6">
        {products.length === 0 ? (
          <div>
            <h1 className="text-3xl font-bold">
              You have not upvoted any products yet
            </h1>
            <p className="text-gray-500 pt-4">
              Upvote products to get started, and they will display here
            </p>
          </div>
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-bold">Your Upvotes</h1>
              <p className="text-gray-500">
                View all the products you have upvoted
              </p>
            </div>

            <div className="px-5 sm:px-0 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-10 mt-10 transition-all">
              {products.map((product: any) => (
                <Link href={`/product/${product.slug}`} key={product.id}>
                  <div>
                    <div
                      className="rounded-lg justify-center items-center border 
                    hover:-translate-y-1 transition-all duration-300"
                    >
                      <Image
                        src={product.logo}
                        alt="logo"
                        width={700}
                        height={700}
                        className="rounded-t-lg object-cover h-40"
                      />

                      <h2 className="font-semibold text-lg p-4 capitalize">
                        {product.name}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </AnimateContainer>
  );
};

export default MyUpvotedProductsPage;
