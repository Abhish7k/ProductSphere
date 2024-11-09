import { getAllCategories } from "@/lib/actions";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const CategoriesPage = async () => {
  const categories = await getAllCategories();

  return (
    <div className="pt-6 md:py-10 mx-auto px-6 md:px-0 xl:w-3/5 w-4/5 ">
      <div className="bg-gray-100 rounded-md w-full p-10 ">
        <h1 className="text-4xl font-semibold">Categories</h1>

        <p className="text-gray-500 pt-2">
          Dive into our categories to uncover products for every passion and
          purpose
        </p>
      </div>

      <div>
        <div className="pt-10 grid grid-cols-2 gap-6">
          {categories?.map((category: any) => (
            <Link
              href={`/category/${category.name.toLowerCase()}`}
              key={category.id}
              className="space-x-10 p-5 rounded-xl shadow-md bg-indigo-100 group 
                  hover:ring-2 transition-transform duration-500 ease-in-out"
            >
              <div className="md:flex justify-between items-center">
                <h2 className="md:text-2xl font-semibold">{category.name}</h2>
                <BsArrowRight className="font-bold text-xl group-hover:translate-x-1 transition-all duration-300 will-change-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
