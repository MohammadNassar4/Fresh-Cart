"use client";
import { IoMdSearch } from "react-icons/io";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "../../../assets/images/freshcart-logo.svg";
import {
  FaCog,
  FaHeadset,
  FaRegAddressBook,
  FaRegUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import MobileNav from "../MobileNav/MobileNav";
import { FiUser } from "react-icons/fi";
import { FaBoxOpen, FaRegHeart } from "react-icons/fa6";
import { handleSignOut } from "../FirstNav/FirstNav";
import { useQuery } from "@tanstack/react-query";
import { CartResponse } from "@/apis/types/cartType";

export default function Navbar() {
  const { status, data } = useSession();

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
    <div className="sticky top-0 w-full bg-white z-50 border-b border-gray-200">
      <NavigationMenu className="container mx-auto p-4">
        <NavigationMenuList className="flex justify-between gap-6">
          <Link href="/">
            <Image
              src={logo}
              alt="fresh cart logo"
              className="h-6 lg:h-8 w-fit"
            />
          </Link>
          <form className="hidden lg:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands and more..."
                className="w-full px-5 py-3 pr-12 rounded-full border border-gray-200 bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all text-sm"
              />
              <button
                type="submit"
                className="absolute cursor-pointer right-1.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition-colors"
              >
                <IoMdSearch className="text-white text-xl" />
              </button>
            </div>
          </form>
          <div className="gap-6 hidden xl:flex items-center">
            <NavigationMenuItem>
              <Link
                className="text-gray-800 hover:text-green-600 font-medium"
                href="/"
              >
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                className="text-gray-800 hover:text-green-600 font-medium"
                href="/products"
              >
                Shop
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-gray-800 hover:text-green-600 font-medium">
                Categories
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-0">
                <ul className="w-52 py-2">
                  <li className="hover:text-green-800 hover:bg-green-50 p-3 w-full">
                    <Link href="/categories">All Categories</Link>
                  </li>
                  <li className="hover:text-green-800 hover:bg-green-50 p-3 w-full">
                    <Link href="/products?category=6439d2d167d9aa4ca970649f">
                      Electronics
                    </Link>
                  </li>
                  <li className="hover:text-green-800 hover:bg-green-50 p-3 w-full">
                    <Link href="/products?category=6439d58a0049ad0b52b9003f">
                      Women&apos;s fashion
                    </Link>
                  </li>
                  <li className="hover:text-green-800 hover:bg-green-50 p-3 w-full">
                    <Link href="/products?category=6439d5b90049ad0b52b90048">
                      Men&apos;s fashion
                    </Link>
                  </li>
                  <li className="hover:text-green-800 hover:bg-green-50 p-3 w-full">
                    <Link href="/products?category=6439d30b67d9aa4ca97064b1">
                      Beauty & health
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                className="text-gray-800 hover:text-green-600 font-medium"
                href="/brands"
              >
                Brands
              </Link>
            </NavigationMenuItem>
          </div>
          <Link href="/contact">
            <div className="hidden lg:flex gap-2 items-center border-r pr-4 cursor-pointer hover:opacity-60 transition-all duration-200">
              <div className="rounded-full flex justify-center items-center w-10 h-10 bg-green-50">
                <FaHeadset className="text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Support</div>
                <div className="text-xs font-bold">24/7 Help</div>
              </div>
            </div>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/wishlist" prefetch={false}>
              <div className="group/wishList relative flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-100 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-gray-500 group-hover/wishList:text-green-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                {wishlistData?.length ? (
                  <div className="absolute -top-1 -right-1 inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-600 text-white">
                    {wishlistData?.length}
                  </div>
                ) : null}
              </div>
            </Link>
            <Link href="/cart" prefetch={false}>
              <div className="group/cart relative flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-100 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-gray-500 group-hover/cart:text-green-600"
                >
                  <path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>
                {cartData?.numOfCartItems ? (
                  <div className="absolute -top-1 -right-1 inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-green-600 text-white">
                    {cartData?.numOfCartItems}
                  </div>
                ) : null}
              </div>
            </Link>
            {status === "authenticated" ? (
              <NavigationMenuItem className="hidden lg:block">
                <NavigationMenuTrigger className="text-gray-800 hover:text-green-600 font-medium">
                  <div className="group/user w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-100">
                    <FaRegUserCircle className="text-xl text-gray-500 group-hover/user:text-green-600" />
                  </div>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="p-0 min-w-3xs">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <FaRegUserCircle className="text-2xl text-green-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">
                          {data?.user?.name}
                        </p>
                        <p className="text-xs text-gray-400 truncate">
                          {data?.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul className="py-2">
                    <li>
                      <Link
                        className="group hover:text-green-600 hover:bg-green-50 p-3 w-full flex items-center gap-2"
                        href="/profile"
                      >
                        <span>
                          <FiUser className="text-gray-400 group-hover:text-green-600" />
                        </span>{" "}
                        <span className="text-sm text-gray-600 group-hover:text-green-600">
                          My Profile
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="group hover:text-green-600 hover:bg-green-50 p-3 w-full flex items-center gap-2"
                        href="/allorders"
                      >
                        <span>
                          <FaBoxOpen className="text-gray-400 group-hover:text-green-600" />
                        </span>{" "}
                        <span className="text-sm text-gray-600 group-hover:text-green-600">
                          My Orders
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="group hover:text-green-600 hover:bg-green-50 p-3 w-full flex items-center gap-2"
                        href="/wishlist"
                      >
                        <span>
                          <FaRegHeart className="text-gray-400 group-hover:text-green-600" />
                        </span>{" "}
                        <span className="text-sm text-gray-600 group-hover:text-green-600">
                          My Wishlist
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="group hover:text-green-600 hover:bg-green-50 p-3 w-full flex items-center gap-2"
                        href="/profile/addresses"
                      >
                        <span>
                          <FaRegAddressBook className="text-gray-400 group-hover:text-green-600" />
                        </span>{" "}
                        <span className="text-sm text-gray-600 group-hover:text-green-600">
                          Addresses
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="group hover:text-green-600 hover:bg-green-50 p-3 w-full flex items-center gap-2"
                        href="/profile/settings"
                      >
                        <span>
                          <FaCog className="text-gray-400 group-hover:text-green-600" />
                        </span>{" "}
                        <span className="text-sm text-gray-600 group-hover:text-green-600">
                          Settings
                        </span>
                      </Link>
                    </li>
                  </ul>
                  <div className="border-t border-gray-100 py-2">
                    <button
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left cursor-pointer"
                      onClick={handleSignOut}
                    >
                      <FaSignOutAlt className="group-hover:text-red-600" />
                      Sign Out
                    </button>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <Link
                href="/login"
                className="hidden hover:bg-green-700 transition-all duration-200 lg:flex items-center gap-2 cursor-pointer bg-green-600 rounded-full text-white py-2.5 px-5 font-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.9}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                Sign In
              </Link>
            )}
            <MobileNav />
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
