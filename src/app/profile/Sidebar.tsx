"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChevronRight, FaGear, FaLocationDot } from "react-icons/fa6";

export default function Sidebar() {
  const pathName = usePathname();
  return (
    <aside className="w-full lg:w-72 shrink-0">
      <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">My Account</h2>
        </div>
        <ul className="p-2">
          <li>
            <Link
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${pathName === "/profile/addresses" ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              href="/profile/addresses"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${pathName === "/profile/addresses" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}`}
              >
                <FaLocationDot />
              </div>
              <span className="font-medium flex-1">My Addresses</span>
              <FaChevronRight />
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${pathName === "/profile/settings" ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}`}
              href="/profile/settings"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${pathName === "/profile/settings" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}`}
              >
                <FaGear />
              </div>
              <span className="font-medium flex-1">Settings</span>
              <FaChevronRight />
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
