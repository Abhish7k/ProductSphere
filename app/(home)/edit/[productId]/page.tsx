import { Badge } from "@/components/ui/badge";
import { getProductById } from "@/lib/actions";
import Image from "next/image";
import Link from "next/link";
import { PiArrowLeft } from "react-icons/pi";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AnimateContainer } from "@/components/landing-page/AnimatePageContainer";

interface IParams {
  authenticatedUser: any;
  productId: string;
}

const ProductIdPage = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params.productId);

  if (!product) {
    return (
      <AnimateContainer>
        <div className="md:w-4/5 mx-auto px-6 md:px-0 py-10 transition-all">
          <Link
            href="/my-products"
            className="flex items-center gap-1 mb-5 group w-fit font-medium text-foreground/70 hover:text-foreground/90 transition-all"
          >
            <PiArrowLeft className="text-xl group-hover:-translate-x-0.5 transition" />
            <p>Go Back</p>
          </Link>

          <h1 className="mt-10 text-4xl font-medium">Product not found</h1>
        </div>
      </AnimateContainer>
    );
  }

  return (
    <AnimateContainer>
      <div className="md:w-4/5 mx-auto px-6 md:px-0 py-10 transition-all">
        <Link
          href="/my-products"
          className="flex items-center gap-1 mb-5 group w-fit font-medium text-foreground/70 hover:text-foreground/90 transition-all"
        >
          <PiArrowLeft className="text-xl group-hover:-translate-x-0.5 transition" />
          <p>Go Back</p>
        </Link>

        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-x-4">
            <Image
              src={product.logo}
              alt="logo"
              width={500}
              height={500}
              className="h-24 w-24 md:h-32 md:w-32 border rounded-lg"
            />

            <div className="space-y-1 md:space-y-3">
              <h1 className="text-xl md:text-3xl font-medium">
                {product.name}
              </h1>
              <p className="text-gray-500 text-xs md:text-sm w-3/4">
                {product.website}
              </p>

              {product.status === "PENDING" && (
                <Badge className="bg-orange-400 hover:bg-orange-400">
                  Pending
                </Badge>
              )}
              {product.status === "ACTIVE" && (
                <Badge className="bg-green-400 hover:bg-green-400">
                  ACTIVE
                </Badge>
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

        {/* Analytics */}
        <div className="mt-5 grid grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader
              className="flex flex-row items-center
          justify-between space-y-0 pb-2"
            >
              <CardTitle>Current Rank</CardTitle> 🏅
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                {/* {product.rank ? product.rank : "N/A"} */}
                {product.rank > 0 ? product.rank : "N/A"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              className="flex flex-row items-center
          justify-between space-y-0 pb-2"
            >
              <CardTitle>Comments </CardTitle> 💬
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{product.comments.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              className="flex flex-row items-center
          justify-between space-y-0 pb-2"
            >
              <CardTitle>Upvotes </CardTitle> 🔺
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{product.upvotes.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="py-5">
          <Separator />
        </div>

        {/* Comments */}
        <h2 className="font-semibold text-xl pt-5 ">Community Feedback </h2>

        {product.comments.length > 0 ? (
          <div className="mt-4 space-y-4">
            {product.comments.map((comment: any) => (
              <div key={comment.id} className="p-4 rounded-lg">
                <div className="flex gap-x-4 items-center">
                  <Image
                    src={comment.user.image}
                    alt="profile"
                    width={50}
                    height={50}
                    className="h-10 w-10 rounded-full"
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
            <h2 className="">No comments yet</h2>
          </div>
        )}
      </div>
    </AnimateContainer>
  );
};

export default ProductIdPage;
