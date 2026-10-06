import { getAllProducts } from "@/apis/productsAPIs";
import Link from "next/link";
import {
  FaBoxOpen,
  FaFilter,
  FaFolderOpen,
  FaLayerGroup,
  FaTags,
  FaXmark,
} from "react-icons/fa6";
import ProductCard from "../_components/ProductCard/ProductCard";
import {
  getSubcategoryById,
  getSubcategoryProducts,
} from "@/apis/subcategoriesAPIS";
import { getBrand, getBrandProducts } from "@/apis/brandsAPIS";
import Image from "next/image";
import { getCategoryById, getCategoryProducts } from "@/apis/categoriesAPIs";

export default async function Shop(props: {
  searchParams: { subcategory: string; brand: string; category: string };
}) {
  const searchParams = await props.searchParams;
  const { subcategory, brand, category } = searchParams;
  // handle subcategory products
  let subcategoryProducts = null;
  let subcategoryData = null;
  if (subcategory) {
    subcategoryData = await getSubcategoryById(subcategory);
    subcategoryProducts = await getSubcategoryProducts(subcategory);
  }

  // handle category products
  let categoryProducts = null;
  let categoryData = null;
  if (category) {
    categoryData = await getCategoryById(category);
    categoryProducts = await getCategoryProducts(category);
  }

  // handle brand products
  let brandProducts = null;
  let brandData = null;
  if (brand) {
    brandProducts = await getBrandProducts(brand);
    brandData = await getBrand(brand);
  }

  // handle all products
  const products = await getAllProducts();

  const emptyProducts = (
    <div className="text-center py-20">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
        <FaBoxOpen className="text-4xl text-gray-500" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">
        No Products Found
      </h3>
      <p className="text-gray-500 mb-6">
        No products match your current filters.
      </p>
      <Link
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors"
        href="/products"
      >
        View All Products
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
        <div className="container mx-auto px-4 py-10 sm:py-14">
          {subcategory ? (
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
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
              <span className="text-white font-medium">
                {subcategoryData?.name}
              </span>
            </nav>
          ) : brand ? (
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
              <Link className="hover:text-white transition-colors" href="/">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <Link
                className="hover:text-white transition-colors"
                href="/brands"
              >
                Brands
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">{brandData?.name}</span>
            </nav>
          ) : category ? (
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
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
              <Link
                className="hover:text-white transition-colors"
                href={`/categories/${category}`}
              >
                {categoryData?.name}
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">
                {categoryData?.name}
              </span>
            </nav>
          ) : (
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6 flex-wrap">
              <Link className="hover:text-white transition-colors" href="/">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">All Products</span>
            </nav>
          )}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              {subcategory ? (
                <FaFolderOpen className="text-4xl" />
              ) : brand ? (
                <Image
                  src={brandData?.image || ""}
                  alt={brandData?.name || ""}
                  width={40}
                  height={40}
                />
              ) : category ? (
                <Image
                  src={categoryData?.image || ""}
                  alt={categoryData?.name || ""}
                  width={40}
                  height={40}
                />
              ) : (
                <FaBoxOpen className="text-4xl" />
              )}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {subcategory
                  ? subcategoryData?.name
                  : brand
                    ? brandData?.name
                    : category
                      ? categoryData?.name
                      : "All Products"}
              </h1>
              <p className="text-white/80 mt-1">
                {subcategory
                  ? `Browse ${subcategoryData?.name} products`
                  : brand
                    ? `Shop ${brandData?.name} products`
                    : category
                      ? `Browse products in ${categoryData?.name}`
                      : "Explore our complete product collection"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {subcategory && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <FaFilter />
              Active Filters:
            </span>
            <Link
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium hover:bg-emerald-200 transition-colors"
              href="/products"
            >
              <FaFolderOpen />
              {subcategoryData?.name}
              <FaXmark />
            </Link>
            <Link
              className="text-sm text-gray-500 hover:text-gray-700 underline"
              href="/products"
            >
              Clear all
            </Link>
          </div>
        )}

        {brand && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <FaFilter />
              Active Filters:
            </span>
            <Link
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-medium hover:bg-violet-200 transition-colors"
              href="/products"
            >
              <FaTags />
              {brandData?.name}
              <FaXmark />
            </Link>
            <Link
              className="text-sm text-gray-500 hover:text-gray-700 underline"
              href="/products"
            >
              Clear all
            </Link>
          </div>
        )}

        {category && (
          <div className="mb-6 flex items-center gap-3 flex-wrap">
            <span className="flex items-center gap-2 text-sm text-gray-600">
              <FaFilter />
              Active Filters:
            </span>
            <Link
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-medium hover:bg-emerald-200 transition-colors"
              href="/products"
            >
              <FaLayerGroup />
              {categoryData?.name}
              <FaXmark />
            </Link>
            <Link
              className="text-sm text-gray-500 hover:text-gray-700 underline"
              href="/products"
            >
              Clear all
            </Link>
          </div>
        )}

        <div className="mb-6 text-sm text-gray-500">
          Showing{" "}
          {subcategory
            ? subcategoryProducts?.length
            : brand
              ? brandProducts?.length
            : category
              ? categoryProducts?.length
              : products?.length}{" "}
          products
        </div>

        {subcategory && subcategoryProducts?.length === 0 ? (
          emptyProducts
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {subcategoryProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {brand && brandProducts?.length === 0 ? (
          emptyProducts
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {brandProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {category && categoryProducts?.length === 0 ? (
          emptyProducts
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {categoryProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!subcategory && !brand && !category && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
