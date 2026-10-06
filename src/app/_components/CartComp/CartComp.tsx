"use client";
import { clearCart } from "@/apis/actions/cartActions/clearCart";
import { CartResponse, Product } from "@/apis/types/cartType";
import { toast } from "@/components/ui/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  FaArrowRight,
  FaBagShopping,
  FaBoxOpen,
  FaCartShopping,
  FaLock,
  FaShieldHalved,
  FaSpinner,
  FaTag,
  FaTrash,
  FaTruck,
} from "react-icons/fa6";
import CartItemCard from "../CartItemCard/CartItemCard";

export default function CartComp() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<CartResponse>({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed to fetch cart");
      return response.json();
    },
  });

  // clear cart
  const { mutate: clearCartItems } = useMutation({
    mutationFn: clearCart,
    onSuccess() {
      toast.add({ type: "success", description: "Cart cleared successfully" });
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
    onError() {
      toast.add({ type: "error", description: "Failed to clear cart" });
    },
  });

  const loading = (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-teal-600" />
        </div>
      </div>
      <p className="text-gray-600 mt-6 font-medium">Loading your cart...</p>
      <p className="text-gray-400 text-sm mt-1">Just a moment</p>
    </div>
  );

  if (isLoading) return loading;

  const emptyCart = (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-100 to-gray-50 flex items-center justify-center mx-auto">
            <FaBoxOpen className="text-6xl text-gray-300" />
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-100 rounded-full blur-md" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Looks like you haven&apos;t added anything to your cart yet.
          <br />
          Start exploring our products!
        </p>
        <Link
          className="inline-flex items-center gap-2 bg-linear-to-r from-teal-600 to-teal-700 text-white py-3.5 px-8 rounded-xl font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg shadow-teal-600/20 active:scale-[0.98]"
          href="/products"
        >
          Start Shopping
          <FaArrowRight />
        </Link>
        <div className="mt-12 pt-8 border-t border-gray-100">
          <p className="text-sm text-gray-400 mb-4">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              className="px-4 py-2 bg-gray-50 hover:bg-teal-50 hover:text-teal-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
              href="/products?category=6439d2d167d9aa4ca970649f"
            >
              Electronics
            </Link>
            <Link
              className="px-4 py-2 bg-gray-50 hover:bg-teal-50 hover:text-teal-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
              href="/products?category=6439d5b90049ad0b52b90048"
            >
              Men&apos;s Fashion
            </Link>
            <Link
              className="px-4 py-2 bg-gray-50 hover:bg-teal-50 hover:text-teal-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
              href="/"
            >
              Home
            </Link>
            <Link
              className="px-4 py-2 bg-gray-50 hover:bg-teal-50 hover:text-teal-600 text-gray-600 rounded-full text-sm font-medium transition-colors"
              href="/products?category=6439d30b67d9aa4ca97064b1"
            >
              Beauty
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  if (data?.numOfCartItems === 0) return emptyCart;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link className="hover:text-teal-600 transition" href="/">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-r from-teal-600 to-teal-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <FaCartShopping />
                </span>
                Shopping Cart
              </h1>
              <p className="text-gray-500 mt-2">
                You have{" "}
                <span className="font-semibold text-teal-600">
                  {data?.numOfCartItems} items
                </span>{" "}
                in your cart
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {data?.data.products &&
                data?.data.products.map((product: Product) => (
                  <CartItemCard key={product._id} product={product} />
                ))}

              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                <Link
                  className="text-teal-600 hover:text-teal-700 font-medium text-sm flex items-center gap-2"
                  href="/"
                >
                  <span>←</span> Continue Shopping
                </Link>
                <button
                  onClick={() => clearCartItems()}
                  className="group flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <FaTrash />
                  <span>Clear all items</span>
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-24 shadow-sm">
              <div className="bg-linear-to-r from-teal-600 to-teal-700 px-6 py-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FaBagShopping />
                  Order Summary
                </h2>
                <p className="text-teal-100 text-sm mt-1">
                  {data?.numOfCartItems} items in your cart
                </p>
              </div>
              <div className="p-6 space-y-5">
                <div className="bg-linear-to-r from-teal-50 to-teal-50 rounded-xl p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <FaTruck className="text-teal-600 text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold text-teal-700">
                      Free Shipping!
                    </p>
                    <p className="text-sm text-teal-600">
                      You qualify for free delivery
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">
                      {data?.data.totalCartPrice.toLocaleString()} EGP
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-medium text-teal-600">FREE</span>
                  </div>
                  <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-900 font-semibold">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">
                          {data?.data.totalCartPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50/50 transition-all cursor-pointer">
                  <FaTag />
                  <span className="text-sm font-medium">Apply Promo Code</span>
                </button>
                <Link
                  className="w-full bg-linear-to-r from-teal-600 to-teal-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-teal-700 hover:to-teal-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-teal-600/20 active:scale-[0.98]"
                  href={`/checkout/${data?.cartId}`}
                >
                  <FaLock />
                  <span>Secure Checkout</span>
                </Link>
                <div className="flex items-center justify-center gap-4 py-2">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaShieldHalved className="text-teal-500 text-lg" />
                    <span>Secure Payment</span>
                  </div>
                  <div className="w-px h-4 bg-gray-200" />
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <FaTruck className="text-blue-500 text-lg" />
                    <span>Fast Delivery</span>
                  </div>
                </div>
                <Link
                  className="block text-center text-teal-600 hover:text-teal-700 text-sm font-medium py-2"
                  href="/"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
