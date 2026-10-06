"use client";
import {
  FaBagShopping,
  FaBox,
  FaCheck,
  FaCircleInfo,
  FaCity,
  FaCreditCard,
  FaHouse,
  FaLocationDot,
  FaMoneyBill,
  FaPhone,
  FaShieldHalved,
  FaTruck,
  FaWallet,
} from "react-icons/fa6";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FaMailBulk } from "react-icons/fa";
import { Button } from "@base-ui/react/button";
import { cashPayment } from "@/apis/actions/cartActions/payments/cashPayment";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { onlinePayment } from "@/apis/actions/cartActions/payments/onlinePayment";
import { useState } from "react";

export default function CheckoutForm({ cartId }: { cartId: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ShippingDetails>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
  });
  async function submitFormCash(data: ShippingDetails) {
    const payload = await cashPayment(data, cartId);
    if (payload.status === "success") {
      toast.add({
        type: "success",
        description: "Your order has been placed successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["getCart"] });
      router.push("/allorders");
    } else {
      toast.add({ type: "error", description: "Failed to place your order." });
    }
  }
  async function submitFormOnline(data: ShippingDetails) {
    const payload = await onlinePayment(data, cartId);
    if (payload.status === "success") {
      toast.add({
        type: "success",
        description: "Your order has been placed successfully.",
      });
      window.location.href = payload.session.url;
    } else {
      toast.add({ type: "error", description: "Failed to place your order." });
    }
  }
  return (
    <form
      onSubmit={handleSubmit(
        paymentMethod === "cash" ? submitFormCash : submitFormOnline,
      )}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-linear-to-r from-teal-600 to-teal-700 px-6 py-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FaHouse />
                Shipping Address
              </h2>
              <p className="text-teal-100 text-sm mt-1">
                Where should we deliver your order?
              </p>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <FaCircleInfo className="text-blue-600 text-sm" />
                </div>
                <div>
                  <p className="text-sm text-blue-800 font-medium">
                    Delivery Information
                  </p>
                  <p className="text-xs text-blue-600 mt-0.5">
                    Please ensure your address is accurate for smooth delivery
                  </p>
                </div>
              </div>
              <FieldGroup>
                <Controller
                  name="details"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="after:content-['*'] after:text-red-600"
                      >
                        Address
                      </FieldLabel>
                      <div className="relative">
                        <Textarea
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="Street name, building number, floor, apartment..."
                          autoComplete="off"
                          className="focus-visible:ring-teal-200 focus-visible:ring-2 focus-visible:border-teal-300 py-5 pl-9 rounded-md resize-none"
                        />
                        <FaLocationDot className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="after:content-['*'] after:text-red-600"
                      >
                        City
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. Cairo, Alexandria, Giza"
                          autoComplete="off"
                          type="text"
                          className="focus-visible:ring-teal-200 focus-visible:ring-2 focus-visible:border-teal-300 py-5 pl-9 rounded-md"
                        />
                        <FaCity className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="phone"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="after:content-['*'] after:text-red-600"
                      >
                        Phone Number
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. 01xxxxxxxxx"
                          autoComplete="off"
                          type="tel"
                          className="focus-visible:ring-teal-200 focus-visible:ring-2 focus-visible:border-teal-300 py-5 pl-9 rounded-md"
                        />
                        <FaPhone className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="postalCode"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel
                        htmlFor={field.name}
                        className="after:content-['*'] after:text-red-600"
                      >
                        Postal Code
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          id={field.name}
                          aria-invalid={fieldState.invalid}
                          placeholder="e.g. 11789"
                          autoComplete="off"
                          type="tel"
                          className="focus-visible:ring-teal-200 focus-visible:ring-2 focus-visible:border-teal-300 py-5 pl-9 rounded-md"
                        />
                        <FaMailBulk className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-linear-to-r from-teal-600 to-teal-700 px-6 py-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FaWallet />
                Payment Method
              </h2>
              <p className="text-teal-100 text-sm mt-1">
                Choose how you&apos;d like to pay
              </p>
            </div>
            <div className="p-6 space-y-4">
              <button
                onClick={() => setPaymentMethod("cash")}
                type="button"
                className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group cursor-pointer ${paymentMethod === "cash" ? " border-teal-500 bg-linear-to-r from-teal-50 to-teal-50 shadow-sm" : "border-gray-200 hover:border-teal-200 hover:bg-gray-50 "}`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${paymentMethod === "cash" ? "bg-linear-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}
                >
                  <FaMoneyBill className="text-2xl" />
                </div>
                <div className="flex-1 text-left">
                  <h3
                    className={`font-bold ${paymentMethod === "cash" ? "text-teal-700" : "text-gray-900"}`}
                  >
                    Cash on Delivery
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Pay when your order arrives at your doorstep
                  </p>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${paymentMethod === "cash" ? "bg-teal-600 text-white" : "border-2 border-gray-200"}`}
                >
                  {paymentMethod === "cash" && <FaCheck className="text-xs" />}
                </div>
              </button>
              <button
                onClick={() => setPaymentMethod("online")}
                type="button"
                className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group cursor-pointer ${paymentMethod === "online" ? "border-teal-500 bg-linear-to-r from-teal-50 to-blue-50 shadow-sm" : "border-gray-200 hover:border-teal-200 hover:bg-gray-50"}`}
              >
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${paymentMethod === "online" ? "bg-linear-to-br from-teal-500 to-blue-600 text-white shadow-lg shadow-teal-500/30" : "bg-gray-100 text-gray-400 group-hover:bg-gray-200"}`}
                >
                  <FaCreditCard className="text-xl" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-900">Pay Online</h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Secure payment with Credit/Debit Card via Stripe
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Image
                      width={30}
                      height={30}
                      alt="Visa"
                      className="h-5 w-fit"
                      src="https://img.icons8.com/color/48/visa.png"
                    />
                    <Image
                      width={30}
                      height={30}
                      alt="Mastercard"
                      className="h-5 w-fit"
                      src="https://img.icons8.com/color/48/mastercard.png"
                    />
                    <Image
                      width={30}
                      height={30}
                      alt="Amex"
                      className="h-5 w-fit"
                      src="https://img.icons8.com/color/48/amex.png"
                    />
                  </div>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${paymentMethod === "online" ? "bg-teal-600 text-white" : "border-2 border-gray-200"}`}
                >
                  {paymentMethod === "online" && (
                    <FaCheck className="text-xs" />
                  )}
                </div>
              </button>
              <div className="flex items-center gap-3 p-4 bg-linear-to-r from-teal-50 to-teal-50 rounded-xl border border-teal-100 mt-4">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center shrink-0">
                  <FaShieldHalved className="text-teal-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-teal-800">
                    Secure &amp; Encrypted
                  </p>
                  <p className="text-xs text-teal-600 mt-0.5">
                    Your payment info is protected with 256-bit SSL encryption
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-25">
            <div className="bg-linear-to-r from-teal-600 to-teal-700 px-6 py-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FaBagShopping className="text-white" />
                Order Summary
              </h2>
              <p className="text-teal-100 text-sm mt-1">4 items</p>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">44,352 EGP</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span className="flex items-center gap-2">
                    <FaTruck className="text-gray-400" />
                    Shipping
                  </span>
                  <span className="text-teal-600 font-semibold">FREE</span>
                </div>
                <hr className="border-gray-100" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-teal-600">
                      44,352
                    </span>
                    <span className="text-sm text-gray-500 ml-1">EGP</span>
                  </div>
                </div>
              </div>
              {paymentMethod === "cash" ? (
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full mt-6 bg-linear-to-r from-teal-600 to-teal-700 text-white py-4 rounded-xl font-bold hover:from-teal-700 hover:to-teal-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 active:scale-[0.98] cursor-pointer"
                >
                  <FaBox className="text-white" />
                  Place Order {isSubmitting && <Spinner />}
                </Button>
              ) : (
                <Button
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full mt-6 bg-linear-to-r from-teal-600 to-teal-700 text-white py-4 rounded-xl font-bold hover:from-teal-700 hover:to-teal-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-teal-600/20 active:scale-[0.98] cursor-pointer"
                >
                  <FaShieldHalved className="text-white" />
                  Proceed to Payment {isSubmitting && <Spinner />}
                </Button>
              )}
              <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <FaShieldHalved className="text-teal-500" />
                  <span>Secure</span>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <FaTruck className="text-blue-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="w-px h-4 bg-gray-200" />
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <FaBox className="text-orange-500" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export interface ShippingDetails {
  details: string;
  phone: string;
  city: string;
  postalCode: string;
}
