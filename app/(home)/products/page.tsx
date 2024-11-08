import ActiveProducts from "@/components/ActiveProducts";
import { getActiveProducts } from "@/lib/actions";

const ProductsPage = async () => {
  const activeProducts = await getActiveProducts();

  return (
    <main className="w-full md:w-4/5 xl:w-3/5 mx-auto py-10 px-5 transition-all">
      <ActiveProducts activeProducts={activeProducts} />
    </main>
  );
};

export default ProductsPage;
