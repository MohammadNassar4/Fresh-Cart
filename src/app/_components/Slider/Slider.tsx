"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

export default function Slider({ slides }: { slides: string[] }) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      loop={true}
      navigation
      pagination={{
        clickable: true,
        renderBullet(index, className) {
          return `<span class="${className} bg-white/50! opacity-100! h-3! w-3! hover:bg-white/70! hover:scale-110 transition-all duration-200"></span>`;
        },
        bulletActiveClass: "w-8! bg-white/100! rounded-md!",
      }}
      className="w-screen h-100 overflow-hidden  p-0   mb-0"
      spaceBetween={0}
      slidesPerView={1}
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="relative w-screen h-100 overflow-hidden"
        >
          <Image
            src={slide}
            alt={`Slide ${index}`}
            width={1000}
            height={400}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-linear-to-r from-teal-800/90 to-teal-500/50 z-10"></div>

          <div className="absolute z-20 inset-0 container mx-auto px-4 h-full content-center">
            <h2
              className="text-white text-3xl font-bold mb-4 max-w-96"
              style={{ opacity: 1, transform: "none" }}
            >
              {index === 0 && "Fresh Products Delivered to your Door"}
              {index === 1 && "Premium Quality Guaranteed"}
              {index === 2 && "Fast  &  Free Delivery"}
            </h2>
            <p className="text-white" style={{ opacity: 1, transform: "none" }}>
              {index === 0 && "Get 20% off your first order"}
              {index === 1 && "Fresh from farm to your table"}
              {index === 2 && "Same-day delivery available"}
            </p>
            <div className="mt-4" style={{ opacity: 1, transform: "none" }}>
              <Link
                className={`btn bg-white border-2 border-white/50 ${index === 0 ? "text-teal-500" : index === 1 ? "text-blue-500" : "text-purple-500"} inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform`}
                href="/products"
              >
                {index === 0 && "Shop Now"}
                {index === 1 && "Shop Now"}
                {index === 2 && "Order Now"}
              </Link>
              <Link
                className="btn bg-transparent border-2 border-white/50 text-white ml-2 inline-block px-6 py-2 rounded-lg font-semibold hover:scale-105 transition-transform"
                href="/deals"
              >
                {index === 0 && "View Deals"}
                {index === 1 && "Learn More"}
                {index === 2 && "Deliver Info"}
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
