import {getAllProducts} from "@/apis/productsAPIs";
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { ProdType } from "./../../../apis/types/productType";

export default async function FeaturedProducts() {
  const data: ProdType[] | null = await getAllProducts();

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data &&
        data?.map((product: ProdType) => (
          <ProductCard key={product._id} product={product} />
        ))}
    </div>
  );
}
