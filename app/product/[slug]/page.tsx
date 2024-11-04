import { getProductBySlug } from "@/lib/actions";

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

  //   console.log(product);

  const productImageUrls = product.images.map((image: any) => image.url);

  return <div>ProductPage</div>;
};

export default ProductPage;
