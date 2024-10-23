import ActiveProducts from "@/components/ActiveProducts";
import { getActiveProducts } from "@/lib/actions";

export default async function Home() {
  const activeProducts = await getActiveProducts();

  return (
    <main className="md:w-3/5 mx-auto py-10 px-5">
      <ActiveProducts activeProducts={activeProducts} />
    </main>
  );
}
