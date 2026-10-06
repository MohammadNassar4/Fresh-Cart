import Image from "next/image";
import Link from "next/link";
import { Category } from "../../../apis/types/productType";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
      href={`/categories/${category._id}`}
    >
      <div className="h-20 w-20 overflow-hidden bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-teal-200 transition">
        <Image
          alt={category.name}
          width={300}
          height={300}
          decoding="async"
          data-nimg={1}
          className="w-full h-full object-cover"
          src={category.image}
          style={{ color: "transparent" }}
        />
      </div>
      <h3 className="font-medium">{category.name}</h3>
    </Link>
  );
}