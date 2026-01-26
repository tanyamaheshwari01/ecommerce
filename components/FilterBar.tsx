/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

type FilterBarProps = {
  category: string;
  sort: string;
  setCategory: (value: string) => void;
  setSort: (value: string) => void;
};

export default function FilterBar({
  category,
  sort,
  setCategory,
  setSort,
}: FilterBarProps) {
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    async function getCategories() {
      try {
        const res = await fetch("https://dummyjson.com/products/categories");
        const data = await res.json();
        const names = data.map((item: any) => typeof item === 'string' ? item : item.slug);
        setCategoriesList(names);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    }
    getCategories();
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "30px 0",
        gap: "10px",
        flexWrap: "wrap"
      }}
    >
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
          cursor: "pointer",
          minWidth: "150px"
        }}
      >
        <option value="">All Categories</option>
        {categoriesList.map((cat) => (
          <option key={cat} value={cat}>
            {cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' ')}
          </option>
        ))}
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{
          padding: "10px 14px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          backgroundColor: "#fff",
          cursor: "pointer",
          minWidth: "150px"
        }}
      >
        <option value="">Sort By: Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Highest Rated</option>
      </select>
    </div>
  );
}