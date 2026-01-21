"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import HeroBanner from "@/components/HeroBanner";
import FilterBar from "@/components/FilterBar";
import { useSearch } from "@/context/SearchContext";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const { search } = useSearch();

  // FETCH PRODUCTS
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
      } catch {
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (search || category || sort) {
      setHasInteracted(true);
    }
  }, [search, category, sort]);

  // Categories
  const categories = Array.from(
    new Set(products.map((p) => p.category))
  );

  // FILTER
  let filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  // SORT 
  const sorted = [...filtered];

  if (sort === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  }

  if (sort === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  }

  if (sort === "rating-desc") {
    sorted.sort((a, b) => b.rating.rate - a.rating.rate);
  }

  // LOADING STATE
  if (loading) {
    return (
      <div style={{ padding: "80px", textAlign: "center" }}>
        <h3>Loading products...</h3>
      </div>
    );
  }

  // ERROR STATE
  if (error) {
    return (
      <div style={{ padding: "80px", textAlign: "center", color: "red" }}>
        <h3>{error}</h3>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "0 40px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      {/* HEADER */}
      <h1 style={{ marginTop: "24px" }}>Discover Products</h1>
      <p style={{ marginBottom: "24px", color: "#555" }}>
        Browse our curated collection of quality products
      </p>

      <HeroBanner />

      {/* FILTERS */}
      <FilterBar
        categories={categories}
        category={category}
        sort={sort}
        setCategory={setCategory}
        setSort={setSort}
      />

      {/* PRODUCTS GRID */}
      <div
    style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "56px",          
    marginTop: "32px",
    marginBottom: "40px",
  }}
>
        {hasInteracted && sorted.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "60px 0",
              color: "#555",
            }}
          >
            <h3>No products found</h3>
            <p>Try a different search or clear filters</p>
          </div>
        ) : (
          sorted.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </div>
  );
}
