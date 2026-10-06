import { FaCheck, FaMinus, FaPlus, FaTrash, FaXmark } from "react-icons/fa6";
import { Spinner } from "@/components/ui/spinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartItem } from "@/apis/actions/cartActions/updateCartItem";
import { toast } from "@/components/ui/toast";
import { deleteCartItem } from "@/apis/actions/cartActions/deleteCartItem";
import { Product } from "@/apis/types/cartType";
import Link from "next/link";
import Image from "next/image";

export default function CartItemCard({product}: {product: Product}) {

  const queryClient = useQueryClient();

  // delete cart item
  const { mutate: delCartItem } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess() {
      toast.add({ type: "success", description: "Item removed from cart" });
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
    onError() {
      toast.add({
        type: "error",
        description: "Failed to remove item from cart",
      });
    },
  });

  // update cart item
  const { mutate: updateItem, isPending } = useMutation({
    mutationFn: updateCartItem,
    onSuccess() {
      toast.add({
        type: "success",
        description: "Quantity updated successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
    },
    onError() {
      toast.add({ type: "error", description: "Failed to update quantity" });
    },
  });

  function handleUpdateQuantity(prodId: string, count: number) {
    updateItem({ prodId, count });
  }

  return (
    <>
        <div
          key={product._id}
          className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 overflow-hidden"
        >
          {isPending && <div className="absolute bg-white/40 backdrop-blur-xs inset-0 z-10 flex justify-center items-center"><div className="bg-white flex items-center gap-2 shadow px-2 py-1 rounded-full"><Spinner className="text-green-600"/> Updating...</div></div>}
          <div className="p-4 sm:p-5">
            <div className="flex gap-4 sm:gap-6">
              <Link
                className="relative shrink-0 group"
                href={`/productDetails/${product.product._id}`}
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden">
                  <Image
                    width={200}
                    height={200}
                    alt="Woman Shawl"
                    className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                    src={product.product.imageCover}
                  />
                </div>
                {product.product.quantity < 1 ? (
                  <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FaXmark />
                    Out of Stock
                  </div>
                ) : (
                  <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FaCheck />
                    In Stock
                  </div>
                )}
              </Link>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="mb-3">
                  <Link
                    className="group/title"
                    href={`/productDetails/${product.product._id}`}
                  >
                    <h3 className="font-semibold text-gray-900 group-hover/title:text-green-600 transition-colors leading-relaxed text-base sm:text-lg">
                      {product.product.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-block px-2.5 py-1 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-medium rounded-full">
                      {product.product.category.name}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      SKU: {product.product._id.slice(-6).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-green-600 font-bold text-lg">
                      {product.price.toLocaleString()} EGP
                    </span>
                    <span className="text-xs text-gray-400">
                      per unit
                    </span>
                  </div>
                </div>
                <div
                  className="mt-auto flex flex-wrap items-center justify-between gap-4"
                  data-qb-rot="e800f34d-51c3-4fa7-97b7-4bdee061bc3d"
                  data-qb-rot-theme="green"
                >
                  <div className="flex items-center">
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            product.product._id,
                            product.count - 1,
                          )
                        }
                        className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all cursor-pointer"
                        aria-label="Decrease quantity"
                        disabled={product.count === 1}
                      >
                        <FaMinus />
                      </button>
                      <span
                        className="w-12 text-center font-bold text-gray-900"
                        data-qb-rot="1c0d573c-0a6a-491e-b6c1-4fcbd46a8c5a"
                        data-qb-rot-theme="green"
                      >
                        {product.count}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(
                            product.product._id,
                            product.count + 1,
                          )
                        }
                        className="h-8 w-8 rounded-lg bg-green-600 shadow-sm shadow-green-600/30 flex items-center justify-center text-white hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                        aria-label="Increase quantity"
                        disabled={
                          product.count === product.product.quantity
                        }
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 mb-0.5">
                        Total
                      </p>
                      <p className="text-xl font-bold text-gray-900">
                        {(
                          product.price * product.count
                        ).toLocaleString()}{" "}
                        <span className="text-sm font-medium text-gray-400">
                          EGP
                        </span>
                      </p>
                    </div>
                    <button
                      onClick={() => delCartItem(product.product._id)}
                      className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200 cursor-pointer"
                      title="Remove item"
                      aria-label="Remove from cart"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
