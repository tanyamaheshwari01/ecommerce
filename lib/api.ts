import { Product } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
export async function getProductById(id: number) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${BASE_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}
