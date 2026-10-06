'use server';

import { ShippingDetails } from "@/app/_components/CheckoutForm/CheckoutForm";
import { getTokenData } from "@/utilities/getTokenData";

export async function cashPayment(shippingAddress: ShippingDetails, cartId: string) {
  const token = await getTokenData();

  if (!token) throw new Error("Unauthorized");
  try {
    const response = await fetch(`${process.env.API_BASE_URL_V2}orders/${cartId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
