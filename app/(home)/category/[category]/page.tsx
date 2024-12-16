import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getProductsByCategoryName } from "@/lib/actions";
import { CategoryPageProductItem } from "./CategoryPageProductItem";

interface CategoryParams {
  category: string;
}

const CategoryPage = async ({ params }: { params: CategoryParams }) => {
  let capitalizedCategory = "";

  if (params.category === "ai") {
    console.log("hello");

    capitalizedCategory = "AI";
  } else {
    capitalizedCategory =
      params.category.charAt(0).toUpperCase() + params.category.slice(1);
  }

  const products = await getProductsByCategoryName(capitalizedCategory);

  return (
    <div className="pt-10 px-6 md:px-0 md:w-4/5 lg:w-3/5 mx-auto transition-all">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{capitalizedCategory}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-4xl font-semibold pt-10">{capitalizedCategory}</h1>

      <h3 className="text-gray-500 pt-2">
        Check out whats&apos;s going on in {capitalizedCategory} !
      </h3>

      <div className="pt-10 space-y-4">
        {products.map((product: any) => (
          <CategoryPageProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
