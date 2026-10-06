"use server";

import { getTokenData } from "@/utilities/getTokenData";

export async function clearCart() {
  const token = await getTokenData();

  if (!token) throw new Error("Unauthorized");

  try {
    const response = await fetch(`${process.env.API_BASE_URL}/cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });

    if (!response.ok) throw new Error("Unauthorized");

    const payload = await response.json();
    return payload;
  } catch {
    throw new Error("Unauthorized");
  }
}
