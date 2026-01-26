export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string; // DummyJSON ki main image property
  images: string[];  // Saari images ka array
  rating: number;    // DummyJSON mein ye sirf ek number hai (e.g. 4.69)
  stock: number;     // Extra info jo DummyJSON deta hai
  brand?: string;    // Optional, assignment mein kaam aa sakta hai
  discountPercentage?: number; 
}

// API Response ke liye bhi type bana lo taaki 'any' ka error na aaye
export interface DummyJSONResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}