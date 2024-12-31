import { auth } from "@/auth";
import { AnimateContainer } from "@/components/landing-page/AnimatePageContainer";
import { getOwnerProducts, isUserPremium } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PiCrown, PiPlus } from "react-icons/pi";

const MyProducts = async () => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    redirect("/");
  }

  const products = await getOwnerProducts();

  const isPremium = await isUserPremium();

  return (
    <AnimateContainer>
      <div className="mx-auto lg:w-3/5 py-10 px-10 max-w-screen-xl transition-all">
        {products.length === 0 ? (
          <div>
            <h1 className="text-3xl font-bold">No products found </h1>
            <p className="text-gray-500">
              Looks like you have not created any products yet, click the button
              below to get started
            </p>

            <Link href={"/new-product"}>
              <div
                className="bg-indigo-200 text-neutral-800 p-4 
            rounded-md mt-4 w-52 h-40 flex items-center justify-center flex-col hover:scale-105 transition-all"
              >
                <PiPlus className="text-3xl mb-4" />
                <p className="text-lg">Create a product</p>
              </div>
            </Link>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl font-bold">Your Products</h1>
            <p>Manage your products here</p>

            {isPremium ? (
              <div className="flex gap-x-2 items-center mt-10">
                <PiCrown className="text-2xl text-orange-300" />
                <p className="text-lg">You are a premium user</p>
              </div>
            ) : (
              <>
                <p className="pt-6">({products.length}/2) Free products </p>
              </>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-10 mt-10 transition-all items-center">
              {products.map((product) => (
                <Link
                  href={`/edit/${product.id} `}
                  key={product.id}
                  className="flex flex-col gap-2 justify-center items-center hover:-translate-y-2 transition-all duration-500"
                >
                  <div>
                    <div className="rounded-lg border p-2">
                      <Image
                        src={product.logo}
                        alt="logo"
                        width={700}
                        height={700}
                        className="object-contain rounded-lg h-36 w-fit"
                      />
                    </div>
                  </div>

                  <h1 className="text-xl capitalize pl-4">{product.name}</h1>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </AnimateContainer>
  );
};

export default MyProducts;
