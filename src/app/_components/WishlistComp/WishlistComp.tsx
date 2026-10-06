"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  FaArrowRight,
  FaCartShopping,
  FaCheck,
  FaHeart,
  FaRegHeart,
  FaTrash,
} from "react-icons/fa6";
import Loading from "./loading";
import Image from "next/image";
import { ProdType } from "@/apis/types/productType";
import AddToCatBTN from "../AddToCatBTN/AddToCatBTN";
import { CartResponse } from "@/apis/types/cartType";
import { deleteWishlistItem } from "@/apis/actions/wishlistActions/deleteWishlistItem";
import { toast } from "@/components/ui/toast";

export default function WishlistComp() {
  const queryClient = useQueryClient();
  const { data: wishlistData, isLoading } = useQuery({
    queryKey: ["getWishlist"],
    queryFn: async () => {
      const response = await fetch(`/api/wishlist`);
      if (!response.ok) throw new Error("Failed to fetch wishlist");
      const data = await response.json();
      return data.data;
    },
  });

  const { data: cartData } = useQuery<CartResponse>({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed to fetch cart");
      return response.json();
    },
  });

  // handle wishlist item deletion
  const { mutate: handleDeleteWishlistItem } = useMutation({
    mutationFn: deleteWishlistItem,
    onSuccess: () => {
      toast.add({ type: "success", description: "Item removed from wishlist" });
      queryClient.invalidateQueries({ queryKey: ["getWishlist"] });
    },
    onError: () => {
      toast.add({ type: "error", description: "Failed to remove item from wishlist" });
    },
  });

  const emptyWishlist = (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-sm mx-auto text-center">
        <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
          <FaRegHeart className="text-3xl text-gray-400" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Your wishlist is empty
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          Browse products and save your favorites here.
        </p>
        <div className="flex flex-col gap-3">
          <Link
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors"
            href="/products"
          >
            Browse Products
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {wishlistData.length === 0 || null ? (
        emptyWishlist
      ) : (
        <>
          <div className="bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 py-8">
              <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Link
                  className="hover:text-teal-600 transition-colors"
                  href="/"
                >
                  Home
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-medium">Wishlist</span>
              </nav>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
                    <FaHeart className="text-2xl text-red-500" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      My Wishlist
                    </h1>
                    <p className="text-gray-500 text-sm">
                      {wishlistData.length} items saved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-100 text-sm font-medium text-gray-500">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
              <div className="divide-y divide-gray-100">
                {wishlistData.map((item: ProdType) => (
                  <div
                    key={item._id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="md:col-span-6 flex items-center gap-4">
                      <Link
                        className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0"
                        href={`/productDetails/${item._id}`}
                      >
                        <Image
                          width={200}
                          height={200}
                          alt={item.title}
                          className="w-full h-full object-contain p-2"
                          src={item.imageCover}
                        />
                      </Link>
                      <div className="min-w-0">
                        <Link
                          className="font-medium text-gray-900 hover:text-teal-600 transition-colors line-clamp-2"
                          href={`/productDetails/${item._id}`}
                        >
                          {item.title}
                        </Link>
                        <p className="text-sm text-gray-400 mt-1">
                          {item.category.name}
                        </p>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                      <span className="md:hidden text-sm text-gray-500">
                        Price:
                      </span>
                      <div className="text-right md:text-center">
                        <div className="font-semibold text-gray-900">
                          {item.price.toLocaleString()} EGP
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 flex md:justify-center">
                      <span className="md:hidden text-sm text-gray-500 mr-2">
                        Status:
                      </span>
                      {item.quantity !== 0 ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Out Of Stock
                        </span>
                      )}
                    </div>
                    <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                      {cartData?.data.products.every(
                        (cartItem) => cartItem.product._id !== item._id,
                      ) && (
                        <AddToCatBTN
                          cls="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all bg-teal-600 text-white hover:bg-teal-700 cursor-pointer"
                          child={
                            <>
                              <FaCartShopping />
                              <span className="md:hidden lg:inline">
                                Add to Cart
                              </span>
                            </>
                          }
                          prodId={item._id}
                        />
                      )}
                      {cartData?.data.products.some(
                        (cartItem) => cartItem.product._id === item._id,
                      ) && (
                        <Link
                          className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all"
                          href="/cart"
                          prefetch={false}
                        >
                          <FaCheck className="text-teal-600" />
                          <span className="md:hidden lg:inline">View Cart</span>
                        </Link>
                      )}
                      <button
                        onClick={() => handleDeleteWishlistItem(item._id)}
                        className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all disabled:opacity-50 cursor-pointer"
                        title="Remove"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <Link
                className="text-gray-500 hover:text-teal-600 text-sm font-medium transition-colors"
                href="/products"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
