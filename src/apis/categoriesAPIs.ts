import { Category, ProdType } from "./types/productType";

export async function getAllCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}categories`,
    );
    if (!response.ok) throw new Error("API Error");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("Failed to fetch categories: " + error);
  }
}

export async function getCategoryById(id : string): Promise<Category> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}categories/${id}`,
    );
    if (!response.ok) throw new Error("API Error");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("Failed to fetch categories: " + error);
  }
}

export async function getCategoryProducts(category: string): Promise<ProdType[] | null> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}products?category[in]=${category}`,
    );
    if (!response.ok) throw new Error("API Error");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("Failed to fetch category products: " + error);
  }
}