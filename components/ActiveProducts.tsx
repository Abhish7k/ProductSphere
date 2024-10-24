import { auth } from "@/auth";
import ProductItem from "./ProductItem";

interface Props {
  activeProducts: any;
}

const ActiveProducts = async ({ activeProducts }: Props) => {
  const authenticatedUser = await auth();

  const formattedActiveProducts = activeProducts?.map((product: any) => {
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
      discord,
      createdAt,
      updatedAt,
      userId,
      status,
      images,
      categories,
    } = product;

    const imageUrls = images.map((image: any) => image.url);
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
      discord,
      createdAt,
      updatedAt,
      userId,
      status,
      images: imageUrls,
      categories: categoryNames,
    };
  });

  console.log(formattedActiveProducts, "-> Formatted Products ");

  return (
    <div className="w-full">
      <div className="flex items-center border-b pb-3">
        <h1 className="text-2xl font-semibold">All Products</h1>
      </div>

      <div className="py-6 flex flex-col space-y-2">
        {formattedActiveProducts.map((product: any) => (
          <ProductItem
            key={product.id}
            product={product}
            authenticatedUser={authenticatedUser}
          />
        ))}
      </div>
    </div>
  );
};

export default ActiveProducts;
