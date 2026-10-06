import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import Sidebar from "./Sidebar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <header>
        <div className="bg-linear-to-br from-green-600 via-green-500 to-green-400 text-white">
          <div className="container mx-auto px-4 py-10 sm:py-12">
            <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
              <Link className="hover:text-white transition-colors duration-200" href="/">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white font-medium">My Account</span>
            </nav>
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
                <FaUser className="text-3xl"/>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  My Account
                </h1>
                <p className="text-white/80 mt-1">
                  Manage your addresses and account settings
                </p>
              </div>
            </div>
          </div>
        </div>

      </header>


      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <Sidebar />
          { children }
        </div>
      </div>


      
    </div>
  );
}