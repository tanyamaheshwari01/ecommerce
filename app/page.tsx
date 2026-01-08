"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import HeroBanner from "@/components/HeroBanner";
import FilterBar from "@/components/FilterBar";

export default function HomePage() {
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  console.log("HOME PAGE LOADED");

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  // ✅ categories for dropdown
  const categories = Array.from(new Set(products.map(p => p.category)));

  // ✅ STEP 1: filter
  let filteredProducts = category
    ? products.filter(p => p.category === category)
    : products;

  // ✅ STEP 2: sort
  if (sort === "price-asc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "price-desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.price - a.price
    );
  }

  if (sort === "rating-desc") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating.rate - a.rating.rate
    );
  }

  return (
    <div style={{ padding: "0 40px" }}>
      <h1>Discover Products</h1>
      <p>Browse our curated collection of quality products</p>

      <HeroBanner />

      <FilterBar
        categories={categories}
        category={category}
        sort={sort}
        setCategory={setCategory}
        setSort={setSort}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 20,
        }}
      >
        {filteredProducts.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
