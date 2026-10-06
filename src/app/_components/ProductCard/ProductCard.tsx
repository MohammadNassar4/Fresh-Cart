import AddToCartBTN from "../AddToCatBTN/AddToCatBTN";
import { ProdType } from "./../../../apis/types/productType";
import { FaArrowsRotate, FaPlus } from "react-icons/fa6";
import {
  FaRegHeart,
  FaRegEye,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { AddToWishlistBTN } from "../AddToWishlistBTN/AddToWishlistBTN";


export default function ProductCard(props: { product: ProdType }) {
  const { product } = props;

  const filledStars: number[] = [];
  const halfStars: number[] = [];
  const emptyStar: number[] = [];
  const rating = Math.round(product.ratingsAverage * 2) / 2;

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

  return (
    <div
      id="product-card"
      className="hover:shadow-lg hover:-translate-y-2 transition-all duration-300 bg-white border border-gray-200 rounded-lg overflow-hidden"
    >
      <div className="relative">
        <Image
          className="w-full h-60 object-contain bg-white"
          alt={product.title}
          src={product.imageCover}
          width={300}
          height={400}
        />
        {product.priceAfterDiscount && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              -
              {Math.round(
                ((product.price - product.priceAfterDiscount) / product.price) *
                  100,
              )}
              %
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          
          <AddToWishlistBTN cls='cursor-pointer bg-white h-8 w-8 rounded-full flex items-center justify-center transition shadow-sm text-gray-600 hover:text-red-500' child={<FaRegHeart />} prodId={product._id} />
          
          <button className="group cursor-pointer bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm">
            <FaArrowsRotate className="group-hover:text-teal-600" />
          </button>
          <Link
            href={`/productDetails/${product._id}`}
            className="group bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-primary-600 shadow-sm"
          >
            <FaRegEye className="group-hover:text-teal-600" />
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">
          {product?.category?.name}
        </div>
        <h3 className="font-medium mb-1 cursor-pointer " title={product.title}>
          <Link className="line-clamp-2" href={`/productDetails/${product._id}`}>
            {product.title}
          </Link>
        </h3>
        <div className="flex items-center mb-1">
          <div className="flex text-amber-400 mr-2">
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
          </div>
          <span className="text-xs text-gray-500">
            {product.ratingsAverage} ({product.ratingsQuantity})
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {product.priceAfterDiscount ? (
              <div>
                <span className="text-lg font-bold text-primary-600">
                  {product.priceAfterDiscount} EGP
                </span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  {product.price} EGP
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-800">
                {product.price} EGP
              </span>
            )}
          </div>
          <AddToCartBTN cls="h-10 w-10 cursor-pointer rounded-full flex items-center justify-center transition bg-teal-600 text-white hover:bg-teal-700 disabled:opacity-70" child={ <FaPlus className="text-2xl" /> } prodId={product._id} />
        </div>
      </div>
    </div>
  );
}
