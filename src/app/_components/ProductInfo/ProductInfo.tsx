"use client";
import { ProdType, ReviewType } from "@/apis/types/productType";
import React, { useState } from "react";
import {
  FaBox,
  FaStar,
  FaTruck,
  FaStarHalfAlt,
  FaRegStar,
  FaCheck,
  FaShieldAlt,
} from "react-icons/fa";
import { FaArrowRotateLeft } from "react-icons/fa6";

export default function ProductInfo({
  product,
  reviews,
}: {
  product: ProdType | null;
  reviews: ReviewType[] | null;
}) {
  const [activeTab, setActiveTab] = useState("first");

  const filledStars: number[] = [];
  const halfStars: number[] = [];
  const emptyStar: number[] = [];
  const ratingsAverage: number = product?.ratingsAverage || 0;
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

  function getRatingPercentage(rating: number): number {
    const totalReviews = reviews?.length ?? 0;
    let ratingQuantity = 0;

    reviews?.forEach((review) => {
      if (review.rating === rating) ratingQuantity++;
    });

    if (totalReviews === 0) return 0;

    return Math.round((ratingQuantity / totalReviews) * 100);
  }

  const productInfo = (
    <>
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          About this Product
        </h3>
        <p className="text-gray-600 leading-relaxed">{product?.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">
            Product Information
          </h4>
          <ul className="space-y-2">
            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Category</span>
              <span className="text-gray-900 font-medium">
                {product?.category.name}
              </span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Subcategory</span>
              <span className="text-gray-900 font-medium">
                {product?.subcategory[0].name}
              </span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Brand</span>
              <span className="text-gray-900 font-medium">
                {product?.brand.name}
              </span>
            </li>
            <li className="flex justify-between text-sm">
              <span className="text-gray-500">Items Sold</span>
              <span className="text-gray-900 font-medium">
                {product?.sold}+ sold
              </span>
            </li>
          </ul>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
          <ul className="space-y-2">
            <li className="flex items-center text-sm text-gray-600">
              <svg
                data-prefix="fas"
                data-icon="check"
                className="svg-inline--fa fa-check text-green-600 mr-2 w-4"
                role="img"
                viewBox="0 0 448 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                />
              </svg>
              Premium Quality Product
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                data-prefix="fas"
                data-icon="check"
                className="svg-inline--fa fa-check text-green-600 mr-2 w-4"
                role="img"
                viewBox="0 0 448 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                />
              </svg>
              100% Authentic Guarantee
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                data-prefix="fas"
                data-icon="check"
                className="svg-inline--fa fa-check text-green-600 mr-2 w-4"
                role="img"
                viewBox="0 0 448 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                />
              </svg>
              Fast &amp; Secure Packaging
            </li>
            <li className="flex items-center text-sm text-gray-600">
              <svg
                data-prefix="fas"
                data-icon="check"
                className="svg-inline--fa fa-check text-green-600 mr-2 w-4"
                role="img"
                viewBox="0 0 448 512"
                aria-hidden="true"
              >
                <path
                  fill="currentColor"
                  d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"
                />
              </svg>
              Quality Tested
            </li>
          </ul>
        </div>
      </div>
    </>
  );

  const productRating = (
    <>
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900 mb-2">
            {product?.ratingsAverage}
          </div>
          <div className="text-yellow-400 flex justify-center">
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
          <p className="text-sm text-gray-500 mt-2">
            Based on ({product?.ratingsQuantity}) reviews
          </p>
        </div>
        <div className="flex-1 w-full">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-gray-600 w-8">5 star</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                style={{ width: getRatingPercentage(5) + "%" }}
              />
            </div>
            <span className="text-sm text-gray-500 w-10">
              {getRatingPercentage(5)}%
            </span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-gray-600 w-8">4 star</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                style={{ width: getRatingPercentage(4) + "%" }}
              />
            </div>
            <span className="text-sm text-gray-500 w-10">
              {getRatingPercentage(4) + "%"}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-gray-600 w-8">3 star</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                style={{ width: getRatingPercentage(3) + "%" }}
              />
            </div>
            <span className="text-sm text-gray-500 w-10">
              {getRatingPercentage(3) + "%"}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-gray-600 w-8">2 star</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                style={{ width: getRatingPercentage(2) + "%" }}
              />
            </div>
            <span className="text-sm text-gray-500 w-10">
              {getRatingPercentage(2) + "%"}
            </span>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-gray-600 w-8">1 star</span>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                style={{ width: getRatingPercentage(1) + "%" }}
              />
            </div>
            <span className="text-sm text-gray-500 w-10">
              {getRatingPercentage(1) + "%"}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <div className="text-center py-8">
          <FaStar className="text-gray-300 text-5xl mx-auto mb-4" />
          <p className="text-gray-500">
            Customer reviews will be displayed here.
          </p>
          <button className="mt-4 cursor-pointer text-green-600 hover:text-green-700 font-medium">
            Write a Review
          </button>
        </div>
      </div>
    </>
  );

  const shippingAndReturns = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
              <FaTruck className="text-2xl" />
            </div>
            <h4 className="font-semibold text-gray-900">
              Shipping Information
            </h4>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheck className="text-green-600" />
              <span>Free shipping on orders over $50</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheck className="text-green-600" />
              <span>Standard delivery: 3-5 business days</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheck className="text-green-600" />
              <span>Express delivery available (1-2 business days)</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheck className="text-green-600" />
              <span>Track your order in real-time</span>
            </li>
          </ul>
        </div>
        <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
              <FaArrowRotateLeft className="text-2xl" />
            </div>
            <h4 className="font-semibold text-gray-900">
              Returns &amp; Refunds
            </h4>
          </div>
          <ul className="space-y-3">
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheck className="text-green-600" />
              <span>30-day hassle-free returns</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheck className="text-green-600" />
              <span>Full refund or exchange available</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheck className="text-green-600" />
              <span>Free return shipping on defective items</span>
            </li>
            <li className="flex items-start gap-2 text-sm text-gray-700">
              <FaCheck className="text-green-600" />
              <span>Easy online return process</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
        <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
          <FaShieldAlt className="text-2xl" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-1">
            Buyer Protection Guarantee
          </h4>
          <p className="text-sm text-gray-600">
            Get a full refund if your order doesn&apos;t arrive or isn&apos;t as
            described. We ensure your shopping experience is safe and secure.
          </p>
        </div>
      </div>
    </>
  );

  return (
    <section id="product-details-tabs" className="py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto scrollbar-hide">
              <button 
              onClick={()=> setActiveTab('first')}
              className={`cursor-pointer flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'first' ? 'text-green-600 border-b-2 border-green-600 bg-green-50/50' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}>
                <FaBox />
                Product Details
              </button>
              <button 
              onClick={()=> setActiveTab('second')}
              className={`cursor-pointer flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'second' ? 'text-green-600 border-b-2 border-green-600 bg-green-50/50' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}>
                <FaStar />
                Reviews ({product?.ratingsQuantity})
              </button>
              <button 
              onClick={()=> setActiveTab('third')}
              className={`cursor-pointer flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap transition-all duration-200 ${activeTab === 'third' ? 'text-green-600 border-b-2 border-green-600 bg-green-50/50' : 'text-gray-600 hover:text-green-600 hover:bg-gray-50'}`}>
                <FaTruck />
                Shipping &amp; Returns
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {activeTab === "first" && productInfo}
              {activeTab === "second" && productRating}
              {activeTab === "third" && shippingAndReturns}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
