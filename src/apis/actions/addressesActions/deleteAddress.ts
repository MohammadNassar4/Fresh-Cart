'use server'

import { getTokenData } from "@/utilities/getTokenData";

export async function deleteAddress(id: string) {
  const token = await getTokenData();
  if (!token) throw new Error("Unauthorized");
  
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/addresses/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    if (!response.ok) throw new Error("Failed to delete address");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}