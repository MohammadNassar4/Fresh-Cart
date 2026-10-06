import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Order } from "@/app/allorders/page";
import {
  FaBox,
  FaCalendar,
  FaChevronDown,
  FaClock,
  FaCreditCard,
  FaHashtag,
  FaLocationDot,
  FaMoneyBill,
  FaPhone,
  FaReceipt,
  FaTruck,
} from "react-icons/fa6";
import Image from "next/image";

export default function OrderCard({ order }: { order: Order }) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <AccordionItem
        value={order._id}
        className="bg-white rounded-2xl shadow border transition-all duration-300 hover:border-green-300 hover:shadow-green-300 overflow-hidden"
      >
        <div className="flex gap-5 p-4 md:p-6">
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-2xl border shrink-0">
            <Image
              className="w-full h-full object-contain"
              src={order.cartItems[0].product.imageCover}
              alt={order.cartItems[0].product.title}
              width={100}
              height={100}
            />
            {order.cartItems.length > 1 && <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black text-white flex justify-center items-center font-medium text-sm z-10">+{(order.cartItems.length - 1) }</div>}
          </div>
          <div className="flex flex-col w-full gap-3">
            <div className="flex justify-between ">
              <div>
                <div
                  className={`flex items-center gap-1 text-xs font-semibold py-1 px-2.5 rounded-full ${order.isDelivered ? "text-blue-600 bg-cyan-100" : "text-amber-600 bg-amber-100"}`}
                >
                  {order.isDelivered ? <FaTruck /> : <FaClock />}{" "}
                  {order.isDelivered ? "On the way" : "Processing"}
                </div>
                <div className="flex items-center gap-2 font-semibold mt-2">
                  <FaHashtag className="text-gray-400" /> {order.id}
                </div>
              </div>
              <div className="w-10 h-10 bg-gray-100 text-gray-600 flex justify-center items-center rounded-md">
                {order.paymentMethodType === "cash" ? (
                  <FaMoneyBill />
                ) : (
                  <FaCreditCard />
                )}
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500 gap-3">
              <div className="flex items-center gap-1">
                <FaCalendar /> {order.createdAt.slice(0, 10)}
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              <div className="flex items-center gap-1">
                <FaBox /> {order.cartItems.length} items
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-400"></div>
              <div className="flex items-center gap-1">
                <FaLocationDot /> {order.shippingAddress?.city || "Unknown"}
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="font-bold text-lg md:text-xl">
                {order.totalOrderPrice.toLocaleString()}{" "}
                <span className="text-gray-500 text-sm font-normal">EGP</span>
              </div>
              <AccordionTrigger className="p-0">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`py-2.5 px-4 rounded-xl flex gap-1 items-center cursor-pointer transition-all duration-200 text-sm ${isOpen ? "bg-green-600 hover:bg-green-700 text-white shadow shadow-green-300" : "hover:bg-gray-200 bg-gray-100"}`}
                >
                  {isOpen ? "Hide" : "Details"}{" "}
                  <FaChevronDown
                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </AccordionTrigger>
            </div>
          </div>
        </div>

        <AccordionContent className="p-4 md:p-6 bg-gray-50">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-sm bg-green-100 text-green-600 flex justify-center items-center text-xs">
                <FaReceipt />
              </div>
              <span className="text-sm font-semibold">Ordered Items</span>
            </div>

            <div className="flex flex-col w-full gap-4 mb-4">
              {order.cartItems.map((item) => (
                <div key={item._id} className="bg-white w-full border rounded-lg p-4 flex gap-4 items-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-md border overflow-hidden shrink-0">
                    <Image
                      className="w-full h-full object-cover"
                      width={100}
                      height={100}
                      src={item.product.imageCover} alt={item.product.title} />
                  </div>

                  <div className="w-full flex justify-between items-center">
                    <div>
                      <div className="font-medium mb-2">{item.product.title}</div>
                      <div className="text-sm text-gray-600">{ item.count} x ${item.price.toLocaleString()} EGP</div>
                    </div>

                    <div className="flex flex-col items-end">
                      <div className="font-bold text-lg">{ item.price.toLocaleString() }</div>
                      <div className="text-sm text-gray-500">EGP</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="p-4 bg-white border rounded-lg w-full md:w-1/2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-sm bg-cyan-100 text-blue-600 flex justify-center items-center text-xs">
                    <FaLocationDot />
                  </div>
                  <span className="text-sm font-semibold">Delivery Address</span>
                </div>

                <p className="p-0 m-0 font-medium">{order.shippingAddress?.city || 'Unknown'}</p>
                <p className="p-0 m-0 font-medium text-sm text-gray-500">{order.shippingAddress?.city || 'Unknown'}, {order.shippingAddress?.details || 'Unknown'}</p>
                <p className="p-0 m-0 font-medium text-sm text-gray-500 flex items-center gap-2"><FaPhone/>{order.shippingAddress?.phone || 'Unknown'}</p>

              </div>
              <div className="p-4 bg-amber-100 border border-amber-300 rounded-lg w-full md:w-1/2">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-sm bg-amber-500 text-white flex justify-center items-center text-xs">
                    <FaClock />
                  </div>
                  <span className="text-sm font-semibold">Order Summary</span>
                </div>

                <div className="w-full flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Subtotal</span>
                  <span className="text-sm text-gray-500">{order.totalOrderPrice.toLocaleString()} EGP</span>
                </div>
                <div className="w-full flex justify-between items-center border-b pb-4 mb-2">
                  <span className="text-sm text-gray-500">Shipping</span>
                  <span className="text-sm text-gray-500">{order.shippingPrice === 0 ? 'Free' : (order.shippingPrice.toLocaleString() + ' EGP')}</span>
                </div>

                <div className="w-full flex justify-between items-center">
                  <span className="text-base font-semibold">Total</span>
                  <span className="text-base font-bold">{(order.totalOrderPrice + order.shippingPrice).toLocaleString()} EGP</span>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
