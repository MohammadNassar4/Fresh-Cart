import { getCategoryById } from "@/apis/categoriesAPIs";
import { getAllSubcategories } from "@/apis/subcategoriesAPIS";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaFolderOpen } from "react-icons/fa6";

export default async function CategoryPage(props: { params: { id: string } }) {
  const params = await props.params;
  const { id } = params;
  const category = await getCategoryById(id);
  const subcategories = await getAllSubcategories();
  return (
    <>
      <div className="min-h-screen bg-gray-50/50">
        <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
          <div className="container mx-auto px-4 py-12 sm:py-16">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
              <Link className="hover:text-white transition-colors" href="/">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <Link
                className="hover:text-white transition-colors"
                href="/categories"
              >
                Categories
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">{category.name}</span>
            </nav>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30 overflow-hidden">
                <Image
                  width={100}
                  height={100}
                  alt={category.name}
                  className="w-12 h-12 object-contain"
                  src={category.image}
                />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  {category.name}
                </h1>
                <p className="text-white/80 mt-1">
                  Choose a subcategory to browse products
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <Link
            className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors mb-6"
            href="/categories"
          >
            <FaArrowLeft />
            <span>Back to Categories</span>
          </Link>
          {!subcategories?.length ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
                <FaFolderOpen className="text-3xl text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                No Subcategories Found
              </h3>
              <p className="text-gray-500 mb-6">
                This category doesn&apos;t have any subcategories yet.
              </p>
              <Link
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
                href="/products?category=6439d5b90049ad0b52b90048"
              >
                View All Products in Men&apos;s Fashion
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  {subcategories?.length} Subcategories in {category?.name}
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {subcategories?.map((subcategory) => (
                  <Link
                    key={subcategory._id}
                    className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
                    href={`/products?subcategory=${subcategory._id}`}
                  >
                    <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                      <FaFolderOpen className="text-2xl text-green-600" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors mb-2">
                      {subcategory.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Browse Products</span>
                      <FaArrowRight />
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
