"use client";
import ProductCard from "../ProductCard/ProductCard";
import { ProdType } from "../../../apis/types/productType";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function RecommendedProducts({
  products,
}: {
  products: ProdType[] | [];
}) {

  return (
    <section id="similar-products" className="py-10">
        <div className="container mx-auto px-4">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-1.5 bg-linear-to-b from-teal-500 to-teal-700 rounded-full" />
                <h2 className="text-2xl font-bold text-gray-800">
                  You May Also <span className="text-teal-600">Like</span>
                </h2>
              </div>
              <div className="flex space-x-2">
                <CarouselPrevious className="h-10 w-10 bg-gray-100 hover:bg-teal-100 hover:text-teal-600 cursor-pointer" />
                <CarouselNext className="h-10 w-10 bg-gray-100 hover:bg-teal-100 hover:text-teal-600 cursor-pointer" />
              </div>
            </div>

            <CarouselContent>
              {products?.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
    </section>
  );
}
