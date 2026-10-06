import { getAllProducts, getProductReviews, getSingleProduct } from "@/apis/productsAPIs";
import ProductGallery from "@/app/_components/ProductGallery/ProductGallery";
import ProductInfo from "@/app/_components/ProductInfo/ProductInfo";
import ProductQuantity from "@/app/_components/ProductQuantity/ProductQuantity";
import RecommendedProducts from "@/app/_components/RecommendedProducts/RecommendedProducts";
import AddToCartBTN from "@/app/_components/AddToCatBTN/AddToCatBTN";
import Link from "next/link";
import {
  FaChevronRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
  FaShoppingCart,
  FaRegHeart,
  FaShareAlt,
  FaShippingFast,
  FaShieldAlt,
} from "react-icons/fa";
import { FaBolt, FaArrowRotateLeft } from "react-icons/fa6";
import { AddToWishlistBTN } from "@/app/_components/AddToWishlistBTN/AddToWishlistBTN";

export default async function ProductDetails(props: {
  params: { id: string };
}) {
  const { params } = await props;
  const { id } = await params;
  const data = await getSingleProduct(id);

  const filledStars: number[] = [];
  const halfStars: number[] = [];
  const emptyStar: number[] = [];
  const ratingsAverage: number = data?.ratingsAverage || 0;
  const rating = Math.round(ratingsAverage * 2) / 2;

  // Append filled whole stars
  for (let i = rating; i >= 1; i--) {
    filledStars.push(i);
  }

  // Append half star if needed
  if (rating % 1 !== 0) {
    halfStars.push(1);
  }

  // Fill remaining empty stars
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    emptyStar.push(i);
  }

  const reviews = await getProductReviews(id);

  const payload = await getAllProducts();
  const products = payload
    ?.filter((p) => p.category.name === data?.category.name)
    .slice(0, 9);

  return (
    <>
      {/* bread crumb */}
      <nav aria-label="Breadcrumb" className="py-4">
        <div className="container mx-auto px-4">
          <ol className="flex items-center flex-wrap gap-1 text-sm">
            <li className="flex items-center">
              <Link
                className="text-gray-500 hover:text-teal-600 transition flex items-center gap-1.5"
                href="/"
              >
                <svg
                  data-prefix="fas"
                  data-icon="house"
                  className="svg-inline--fa fa-house text-xs"
                  role="img"
                  viewBox="0 0 512 512"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M277.8 8.6c-12.3-11.4-31.3-11.4-43.5 0l-224 208c-9.6 9-12.8 22.9-8 35.1S18.8 272 32 272l16 0 0 176c0 35.3 28.7 64 64 64l288 0c35.3 0 64-28.7 64-64l0-176 16 0c13.2 0 25-8.1 29.8-20.3s1.6-26.2-8-35.1l-224-208zM240 320l32 0c26.5 0 48 21.5 48 48l0 96-128 0 0-96c0-26.5 21.5-48 48-48z"
                  />
                </svg>
                Home
              </Link>
              <FaChevronRight className="text-gray-400 mx-2" />
            </li>
            <li className="flex items-center">
              <Link
                className="text-gray-500 hover:text-teal-600 transition flex items-center gap-1.5"
                href={`/categories/${data?.category?._id}`}
              >
                {data?.category.name}
              </Link>
              <FaChevronRight className="text-gray-400 mx-2" />
            </li>
            <li className="flex items-center">
              <Link
                className="text-gray-500 hover:text-teal-600 transition flex items-center gap-1.5"
                href={`/categories/${data?.category?._id}/${data?.subcategory[0]?._id}`}
              >
                {data?.subcategory[0].name}
              </Link>
              <FaChevronRight className="text-gray-400 mx-2" />
            </li>
            <li className="text-gray-900 font-medium truncate max-w-xs">
              {data?.title}
            </li>
          </ol>
        </div>
      </nav>
      {/* product details section */}
      <section id="product-detail" className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div id="product-images" className="lg:w-1/4">
              <div className="bg-white rounded-xl shadow-sm p-2 sticky top-25">
                <ProductGallery
                  images={data?.images || [""]}
                  productName={data?.title || ""}
                />
              </div>
            </div>
            <div id="product-info" className="lg:w-3/4">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link
                    className="bg-teal-50 text-teal-700 text-xs px-3 py-1.5 rounded-full hover:bg-teal-100 transition"
                    href={`/categories/${data?.category._id}`}
                  >
                    {data?.category.name}
                  </Link>
                  <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
                    {data?.brand.name}
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  {data?.title}
                </h1>
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-yellow-400 flex">
                    {filledStars.map((i) => (
                      <FaStar key={i} />
                    ))}
                    {halfStars.map((i) => (
                      <FaStarHalfAlt key={i} />
                    ))}
                    {emptyStar.map((i) => (
                      <FaRegStar key={i} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {data?.ratingsAverage} ({data?.ratingsQuantity} reviews)
                  </span>
                </div>
                {data?.priceAfterDiscount ? (
                  <div className="flex items-center flex-wrap gap-3 mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                      {data?.priceAfterDiscount} EGP
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      {data?.price} EGP
                    </span>
                    <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      Save{" "}
                      {Math.round(
                        ((data?.price - data?.priceAfterDiscount) /
                          data?.price) *
                          100,
                      )}
                      %
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center flex-wrap gap-3 mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                      {data?.price} EGP
                    </span>
                  </div>
                )}
                {data?.quantity === 0 ? (
                  <div className="flex items-center gap-2 mb-6">
                    <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      In Stock
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-6">
                    <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-teal-50 text-teal-700">
                      <span className="w-2 h-2 rounded-full bg-teal-500" />
                      In Stock
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-5 mb-6">
                  <p className="text-gray-600 leading-relaxed">
                    {data?.description}
                  </p>
                </div>
                <ProductQuantity
                  prodPrice={data?.priceAfterDiscount || data?.price || 0}
                  prodQuantity={data?.quantity || 0}
                />
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <AddToCartBTN cls="cursor-pointer flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-teal-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/25 bg-teal-600" child={ <><FaShoppingCart />
                  Add to Cart</> } prodId={data?._id || ''} />
                  <button
                    id="buy-now"
                    className="cursor-pointer flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    <FaBolt />
                    Buy Now
                  </button>
                </div>
                <div className="flex gap-3 mb-6">
                  <AddToWishlistBTN cls="cursor-pointer flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-teal-300 hover:text-teal-600" child={ <><FaRegHeart />
                  Add to Wishlist</> } prodId={data?._id || ''} />

                  <button className="cursor-pointer border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-teal-300 hover:text-teal-600 transition">
                    <FaShareAlt />
                  </button>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0">
                        <FaShippingFast className="text-2xl" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Free Delivery
                        </h4>
                        <p className="text-xs text-gray-500">Orders over $50</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0">
                        <FaArrowRotateLeft className="text-2xl" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          30 Days Return
                        </h4>
                        <p className="text-xs text-gray-500">Money back</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center shrink-0">
                        <FaShieldAlt className="text-2xl" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 text-sm">
                          Secure Payment
                        </h4>
                        <p className="text-xs text-gray-500">100% Protected</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* product info section */}
      <ProductInfo product={data} reviews={reviews} />

      {/* recommendation section */}
      <RecommendedProducts products={products || []} />
    </>
  );
}
