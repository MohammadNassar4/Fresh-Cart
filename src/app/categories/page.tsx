import { getAllCategories } from '@/apis/categoriesAPIs';
import Image from 'next/image';
import Link from 'next/link'
import { FaArrowRight, FaLayerGroup } from 'react-icons/fa6'

export default async function Categories() {
  const categories = await getAllCategories();
  return (
    <div className='min-h-screen bg-gray-50/50'>
      
      <div className="bg-linear-to-br from-teal-600 via-teal-500 to-teal-400 text-white">
        <div className="container mx-auto px-4 py-12 sm:py-16">
          <nav className="flex items-center gap-2 text-sm text-white/70 mb-6">
            <Link className="hover:text-white transition-colors" href="/">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white font-medium">Categories</span>
          </nav>
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl ring-1 ring-white/30">
              <FaLayerGroup className="text-4xl" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                All Categories
              </h1>
              <p className="text-white/80 mt-1">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-teal-200 transition-all duration-300 hover:-translate-y-1"
              href={`/categories/${category._id}`}
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                <Image
                  width={232}
                  height={232}
                  alt="Electronics"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src={category.image}
                />
              </div>
              <h3 className="font-bold text-gray-900 text-center group-hover:text-teal-600 transition-colors">
                {category.name}
              </h3>
              <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-teal-600 flex items-center gap-1">
                  View Subcategories
                  <FaArrowRight />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
