import { auth } from "@/auth";
import { getOwnerProducts } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PiPlus } from "react-icons/pi";

const MyProducts = async () => {
  const authenticatedUser = await auth();

  if (!authenticatedUser) {
    redirect("/");
  }

  const products = await getOwnerProducts();

  return (
    <div className="mx-auto lg:w-3/5 py-10 px-5">
      {products.length === 0 ? (
        <div>
          <h1 className="text-3xl font-bold">No products found </h1>
          <p className="text-gray-500">
            Looks like you have not created any products yet, click the button
            below to get started
          </p>

          <Link href={"/new-product"}>
            <div
              className="bg-[#ff6154] text-white p-4 
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

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
            {products.map((product) => (
              <Link
                href={`/edit/${product.id} `}
                key={product.id}
                className="flex flex-col gap-2 hover:-translate-y-1 transition-all duration-500"
              >
                <div>
                  <div className="rounded-lg justify-center items-center border p-2">
                    <Image
                      src={product.logo}
                      alt="logo"
                      width={1000}
                      height={1000}
                      className="object-cover rounded-lg h-36 w-full"
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
  );
};

export default MyProducts;
