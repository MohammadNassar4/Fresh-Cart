'use server'
import { AddressFormDataType } from "@/app/_components/AddAddressDialog/AddAddressDialog";
import { getTokenData } from "@/utilities/getTokenData";

export async function addAddress(address: AddressFormDataType) {
  const token = await getTokenData();
  if (!token) throw new Error("Unauthorized");
  
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(address),
    });
    if (!response.ok) throw new Error("Failed to add address");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}