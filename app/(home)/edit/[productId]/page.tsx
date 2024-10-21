import { Badge } from "@/components/ui/badge";
import { getProductById } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { PiArrowLeft } from "react-icons/pi";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

interface IParams {
  authenticatedUser: any;
  productId: string;
}

const ProductIdPage = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params.productId);

  if (!product) {
    return <div>products not found</div>;
  }

  return (
    <div className="md:w-4/5 mx-auto px-6 md:px-0 py-10 transition-all">
      <Link href="/my-products" className="flex items-center gap-2 mb-5">
        <PiArrowLeft className="text-xl text-gray-500" />
        <p>Go Back</p>
      </Link>

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-x-4">
          <Image
            src={product.logo}
            alt="logo"
            width={500}
            height={500}
            className="h-24 w-24 md:h-40 md:w-40 border rounded-lg"
          />

          <div className="space-y-1 md:space-y-3">
            <h1 className="text-xl md:text-3xl font-medium">{product.name}</h1>
            <p className="text-gray-500 text-xs md:text-sm w-3/4">
              {product.website}
            </p>

            {product.status === "PENDING" && (
              <Badge className="bg-orange-400 hover:bg-orange-400">
                Pending
              </Badge>
            )}
            {product.status === "ACTIVE" && (
              <Badge className="bg-green-400 hover:bg-green-400">ACTIVE</Badge>
            )}
            {product.status === "REJECTED" && (
              <Badge className="bg-red-400 hover:bg-red-400">REJECTED</Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <EditProduct product={product} />
          <DeleteProduct productId={product.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductIdPage;
