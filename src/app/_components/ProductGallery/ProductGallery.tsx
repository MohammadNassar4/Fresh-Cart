"use client";

import { useState } from "react";
import Image from "next/image";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {/* Main image */}
      <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden">
        <Image
          width={500}
          height={500}
          src={images[activeIndex]}
          alt={`${productName} - view ${activeIndex + 1}`}
          className="w-full h-full object-contain p-4"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 overflow-x-auto w-full px-2 pb-2">
        {images.map((img, index) => (
          <button
            key={img + index}
            type="button"
            onClick={() => setActiveIndex(index)}
            onMouseEnter={() => setActiveIndex(index)} // optional: hover-to-preview like the recording
            aria-label={`Show image ${index + 1} of ${productName}`}
            aria-current={activeIndex === index}
            className={`relative shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
              activeIndex === index
                ? "border-teal-600"
                : "border-transparent hover:border-gray-300"
            }`}
          >
            <Image
              width={100}
              height={100}
              src={img}
              alt={`${productName} thumbnail ${index + 1}`}
              className="w-full h-full object-contain bg-white p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
