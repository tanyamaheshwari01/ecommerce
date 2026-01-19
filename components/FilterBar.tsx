/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";

type FilterBarProps = {
  categories: string[];
  category: string;
  sort: string;
  setCategory: (value: string) => void;
  setSort: (value: string) => void;
};

export default function FilterBar({
  categories,
  category,
  sort,
  setCategory,
  setSort,
}: FilterBarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) return null;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        margin: "30px 0",
      }}
    >
      {/* Category filter dropdown */}
      <select
        suppressHydrationWarning
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          padding: "10px 14px",
          borderRadius: "999px",
          border: "1px solid #ddd",
        }}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Sort options dropdown */}
      <select
        suppressHydrationWarning
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        style={{
          padding: "10px 14px",
          borderRadius: "999px",
          border: "1px solid #ddd",
        }}
      >
        <option value="">Sort By</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-desc">Rating</option>
      </select>
    </div>
  );
}
