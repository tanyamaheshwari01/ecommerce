const BASE_URL = "https://dummyjson.com";

interface FetchProductsParams {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
  signal?: AbortSignal;
}

export async function fetchProducts({
  limit = 20,
  skip = 0,
  category = "",
  search = "",
  signal
}: FetchProductsParams) {
  let url = `${BASE_URL}/products`;

  if (search) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(search)}`;
  } else if (category) {
    url = `${BASE_URL}/products/category/${category}`;
  }

  const separator = url.includes('?') ? '&' : '?';
  url += `${separator}limit=${limit}&skip=${skip}`;

  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error("Failed to fetch products from DummyJSON");
  }

  return res.json();
}

export async function getProductById(id: string | number) {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}