"use client";
import { FaTruckMoving } from "react-icons/fa";
import { FaGift } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa6";
import { PiSignOutBold } from "react-icons/pi";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";


export function handleSignOut() {
  signOut({ redirect: true, callbackUrl: "/login" });
}

export default function FirstNav() {
  const { status, data } = useSession();

  
  return (
    <div className="hidden lg:block text-sm border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-10">
          <div className="flex items-center gap-6 text-gray-500">
            <span className="flex items-center gap-2">
              <FaTruckMoving className="text-teal-600" />
              <span>Free Shipping on Orders 500 EGP</span>
            </span>
            <span className="flex items-center gap-2">
              <FaGift className="text-teal-600" />
              <span>New Arrivals Daily</span>
            </span>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-gray-500">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-1.5 hover:text-teal-600 transition-colors"
              >
                <FaPhoneAlt />
                <span>+1 (800) 123-4567</span>
              </a>
              <a
                href="mailto:support@freshcart.com"
                className="flex items-center gap-1.5 hover:text-teal-600 transition-colors"
              >
                <FaRegEnvelope />
                <span>support@freshcart.com</span>
              </a>
            </div>
            <span className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-4">
              {status === "authenticated" ? (
                <Link
                  className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 transition-colors"
                  href="/profile"
                >
                  <FiUser />
                  <span>{data.user.name}</span>
                </Link>
              ) : (
                <Link
                  className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 transition-colors"
                  href="/login"
                >
                  <FiUser />
                  <span>Sign In</span>
                </Link>
              )}
              {status === "authenticated" ? (
                <button onClick={handleSignOut} className="flex items-center gap-1.5 text-gray-600 hover:text-red-500 transition-colors cursor-pointer">
                  <PiSignOutBold />
                  <span>Sign Out</span>
                </button>
              ) : (
                <Link
                  className="flex items-center gap-1.5 text-gray-600 hover:text-teal-600 transition-colors"
                  href="/register"
                >
                  <FaUserPlus />
                  <span>Sign Up</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
