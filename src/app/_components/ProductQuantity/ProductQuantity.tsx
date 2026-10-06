"use client";
import React, { useState } from "react";

import { FiMinus, FiPlus } from "react-icons/fi";

export default function ProductQuantity({
  prodPrice,
  prodQuantity,
}: {
  prodPrice: number;
  prodQuantity: number;
}) {
  const [quantity, setQuantity] = useState(1);
  const totalPrice = prodPrice * quantity;

  return (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => {
                setQuantity(quantity - 1);
              }}
              id="decrease-qty"
              className="cursor-pointer px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-teal-600 transition disabled:opacity-50"
              disabled={quantity < 2}
            >
              <FiMinus className="text-xl" />
            </button>
            <input
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
              min={1}
              max={prodQuantity}
              className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
              id="quantity"
              type="number"
            />
            <button
              onClick={() => {
                setQuantity(quantity + 1);
              }}
              id="increase-qty"
              className="cursor-pointer px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-teal-600 transition disabled:opacity-50"
              disabled={quantity === prodQuantity}
            >
              <FiPlus className="text-xl" />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {prodQuantity} available
          </span>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Price:</span>
          <span className="text-2xl font-bold text-teal-600">
            {totalPrice.toFixed(2)} EGP
          </span>
        </div>
      </div>
    </>
  );
}
