import { ProdType, Subcategory } from "./types/productType";

export async function getAllSubcategories(): Promise<Subcategory[]> {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/subcategories`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(`Failed to fetch subcategories: ${error}`);
  }
}

export async function getSubcategoryById(id : string): Promise<Subcategory> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}subcategories/${id}`,
    );
    if (!response.ok) throw new Error("API Error");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("Failed to fetch subcategory: " + error);
  }
}

export async function getSubcategoryProducts(category: string): Promise<ProdType[] | null> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}products?subcategory[in]=${category}`,
    );
    if (!response.ok) throw new Error("API Error");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("Failed to fetch subcategory products: " + error);
  }
}