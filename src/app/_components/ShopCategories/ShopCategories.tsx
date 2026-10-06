import { FaArrowRight } from "react-icons/fa6";
import CategoryCard from "../CategoryCard/CategoryCard";
import { getAllCategories } from "@/apis/categoriesAPIs";
import Link from "next/link";

export default async function ShopCategories() {
  const categories = await getAllCategories();

  return (
    <section id="categories" className="py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
          <div className="flex  items-center gap-3 my-8">
            <div className="h-8 w-1.5 bg-linear-to-b from-teal-500 to-teal-700 rounded-full" />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Shop By <span className="text-teal-600">Category</span>
            </h2>
          </div>{" "}
          <Link
            className="text-teal-600 self-end sm:self-auto hover:text-teal-700 font-medium flex items-center cursor-pointer"
            href="categories"
          >
            View All Categories
            <FaArrowRight className="ms-2 text-xl" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories &&
            categories.map((category) => (
              <CategoryCard key={category._id} category={category} />
            ))}
        </div>
      </div>
    </section>
  );
}
