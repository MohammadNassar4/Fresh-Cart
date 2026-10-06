import Image from "next/image";
import logo from "../../../assets/images/freshcart-logo.svg";
import { useState } from "react";
import {
  FaHeadset,
  FaMagnifyingGlass,
  FaRegHeart,
  FaXmark,
} from "react-icons/fa6";
import Link from "next/link";
import { FaRegUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";

import { handleSignOut } from "../FirstNav/FirstNav";
import { CartResponse } from "@/apis/types/cartType";
import { useQuery } from "@tanstack/react-query";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { data, status } = useSession();

  const { data: cartData } = useQuery<CartResponse>({
    queryKey: ["getCart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed to fetch cart");
      return response.json();
    },
  });

  const { data: wishlistData } = useQuery({
    queryKey: ["getWishlist"],
    queryFn: async () => {
      const response = await fetch(`/api/wishlist`);
      if (!response.ok) throw new Error("Failed to fetch wishlist");
      const data = await response.json();
      return data.data;
    },
  });
  
  return (
    <>
      <button
        className="text-white cursor-pointer hover:bg-teal-700 transition-all duration-200 bg-teal-600 h-10 w-10 rounded-full font-semibold flex lg:hidden justify-center items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <div
        className={`${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"} lg:hidden fixed top-0 right-0 bottom-0 left-0 h-full bg-black/50 shadow-2xl transition-opacity duration-300 overflow-y-auto z-50`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`${isOpen ? "translate-x-0" : "translate-x-full"} lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 overflow-y-auto z-50`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
          <Image
            alt="FreshCart"
            loading="lazy"
            width={160}
            height={31}
            className="h-8 w-auto"
            style={{ color: "transparent" }}
            src={logo}
          />
          <button
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <FaXmark />
          </button>
        </div>
        <form className="p-4 border-b border-gray-100">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm"
              defaultValue=""
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center"
            >
              <FaMagnifyingGlass />
            </button>
          </div>
        </form>
        <nav className="p-4">
          <div className="space-y-1">
            <Link
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
              href="/"
            >
              Home
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
              href="/products"
            >
              Shop
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
              href="/categories"
            >
              Categories
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
              href="/brands"
            >
              Brands
            </Link>
          </div>
        </nav>
        <div className="mx-4 border-t border-gray-100" />
        <div className="p-4 space-y-1">
          <Link
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-teal-50 transition-colors"
            href="/wishlist"
            prefetch={false}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <FaRegHeart className="text-red-500" />
              </div>
              <span className="font-medium text-gray-700">Wishlist</span>
            </div>
            {wishlistData && wishlistData?.length > 0 && <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{wishlistData?.length}</span>}
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-teal-50 transition-colors"
            href="/cart"
            prefetch={false}
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center">
                <FaShoppingCart className="text-teal-600" />
              </div>
              <span className="font-medium text-gray-700">Cart</span>
            </div>
            {cartData && cartData?.numOfCartItems > 0 && <span className="bg-teal-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">{cartData?.numOfCartItems}</span>}
          </Link>
        </div>
        <div className="mx-4 border-t border-gray-100" />
        {status === "authenticated" ? (
          <div className="p-4 space-y-1">
            <Link
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-teal-50 transition-colors"
              onClick={() => setIsOpen(false)}
              href="/profile"
            >
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">
                <FaRegUser />
              </div>
              <span className="font-medium text-gray-700">
                {data?.user?.name}
              </span>
            </Link>
            <button
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
              onClick={() => handleSignOut()}
            >
              <div className="w-9 h-9 rounded-full bg-red-50 flex items-center justify-center">
                <FaSignOutAlt className="text-red-600" />
              </div>
              <span className="font-medium text-red-600">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-1">
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors"
                href="/login"
              >
                Sign In
              </Link>
              <Link
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-teal-600 text-teal-600 font-semibold hover:bg-teal-50 transition-colors"
                href="/register"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
        <Link
          onClick={() => setIsOpen(false)}
          className="mx-4 mt-2 p-4 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-3 hover:bg-teal-50 transition-colors"
          href="/contact"
        >
          <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
            <FaHeadset className="text-teal-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-700">
              Need Help?
            </div>
            <div className="text-sm text-teal-600">Contact Support</div>
          </div>
        </Link>
      </div>
    </>
  );
}
