import { Brand } from "./types/brandType";
import { ProdType } from "./types/productType";

export async function getAllBrands(): Promise<Brand[]> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}brands`,
    );
    if (!response.ok) throw new Error("API Error");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("Failed to fetch brands: " + error);
  }
}

export async function getBrandProducts(id: string): Promise<ProdType[]> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}products?brand=${id}`,
    );
    if (!response.ok) throw new Error("API Error");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("Failed to fetch brands: " + error);
  }
}

export async function getBrand(id: string): Promise<Brand> {
  try {
    const response = await fetch(
      `${process.env.API_BASE_URL}brands/${id}`,
    );
    if (!response.ok) throw new Error("API Error");
    const payload = await response.json();
    return payload.data;
  } catch (error) {
    throw new Error("Failed to fetch brand: " + error);
  }
}