import { AnimateContainer } from "@/components/landing-page/AnimatePageContainer";
import { getActiveProducts } from "@/lib/actions";
import ActiveProducts from "@/components/ActiveProducts";

const ProductsPage = async () => {
  const activeProducts = await getActiveProducts();

  return (
    <AnimateContainer>
      <main className="w-full md:w-4/5 xl:w-3/5 mx-auto max-w-screen-xl py-10 px-5 transition-all">
        <ActiveProducts activeProducts={activeProducts} />
      </main>
    </AnimateContainer>
  );
};

export default ProductsPage;
