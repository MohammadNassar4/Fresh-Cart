'use server';

import { ShippingDetails } from "@/app/_components/CheckoutForm/CheckoutForm";
import { getTokenData } from "@/utilities/getTokenData";

export async function onlinePayment(shippingAddress: ShippingDetails, cartId: string) {
  const token = await getTokenData();

  if (!token) throw new Error("Unauthorized");
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`,
    {
      method: 'POST',
      headers: {
        token: token,
      },
      body: JSON.stringify({shippingAddress: shippingAddress}),
      });
    if (!response.ok) throw new Error("Unauthorized");

    const payload = await response.json();
    return payload;
  } catch (error) {
    throw new Error("Unauthorized");
  }
}
