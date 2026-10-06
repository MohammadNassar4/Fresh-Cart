import { ProdType, ReviewType } from "./types/productType";

export async function getAllProducts(): Promise<ProdType[] | null> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}products`,
    );
    if (!response.ok) throw new Error("API Error");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getSingleProduct(id: string): Promise<ProdType | null> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}products/${id}`,
    );
    if (!response.ok) throw new Error("API Error");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getProductReviews(
  id: string,
): Promise<ReviewType[] | null> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}products/${id}/reviews`,
    );
    if (!response.ok) throw new Error("API Error");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    console.log(error);
    return null;
  }
}


