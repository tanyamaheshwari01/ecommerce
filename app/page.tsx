/* eslint-disable react-hooks/set-state-in-effect */
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
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const { search } = useSearch();

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  useEffect(() => {
    if (search || category || sort) {
      setHasInteracted(true);
    }
  }, [search, category, sort]);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  let filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
  if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
  if (sort === "rating-desc")
    filtered.sort((a, b) => b.rating.rate - a.rating.rate);

  return (
    <div
      style={{
        padding: "0 40px",
        maxWidth: "1280px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginTop: "24px" }}>Discover Products</h1>
      <p style={{ marginBottom: "24px", color: "#555" }}>
        Browse our curated collection of quality products
      </p>

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
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 24,
          marginTop: "24px",
        }}
      >
        {hasInteracted && filtered.length === 0 ? (
          <div
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "60px 0",
              color: "#555",
            }}
          >
            <h3 style={{ marginBottom: "8px" }}>No products found</h3>
            <p>Try a different search or clear filters</p>
          </div>
        ) : (
          filtered.map((p) => <ProductCard key={p.id} product={p} />)
        )}
      </div>
    </div>
  );
}
