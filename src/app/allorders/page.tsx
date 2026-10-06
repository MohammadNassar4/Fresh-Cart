"use client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import OrderCard from "../_components/OrderCard/OrderCard";
import { Accordion } from "@/components/ui/accordion";

export default function OrdersPage() {
  const { data, isLoading } = useQuery<OrdersResponse>({
    queryKey: ["getUserOrders"],
    queryFn: async () => {
      const response = await fetch("/api/orders");
      if (!response.ok) throw new Error("Failed to fetch orders");
      return response.json();
    },
  });

  const loading = (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-teal-600" />
        </div>
      </div>
      <p className="text-gray-600 mt-6 font-medium">Loading your orders...</p>
      <p className="text-gray-400 text-sm mt-1">Just a moment</p>
    </div>
  );

  if (isLoading) return loading;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link className="hover:text-teal-600 transition" href="/">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">My Orders</span>
          </nav>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-r from-teal-600 to-teal-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <FaCartShopping />
                </span>
                Shopping Cart
              </h1>
              <p className="text-gray-500 mt-2">
                Track and manage your {data?.length} orders
              </p>
            </div>
          </div>
        </div>

        <Accordion
          defaultValue={["orders"]}
          className="grid grid-cols-1 gap-4"
        >
          {data?.map(order => <OrderCard key={order._id} order={order} />)}
        </Accordion>
      </div>
    </div>
  );
}

export type OrdersResponse = Order[];

export interface Order {
  shippingAddress?: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
  paidAt?: string;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
  postalCode?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface Product {
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
