/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchProducts } from "@/lib/api"; 
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import HeroBanner from "@/components/HeroBanner";
import FilterBar from "@/components/FilterBar";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.get("category") || "";
  const sortQuery = searchParams.get("sort") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadProducts = useCallback(async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    setLoading(true);
    try {
      const currentOffset = reset ? 0 : offset;
      const data = await fetchProducts({
        limit: 20,
        skip: currentOffset,
        category: categoryQuery,
        search: searchQuery,
      });

      if (!data.products || data.products.length === 0) {
        setHasMore(false);
        if (reset) setProducts([]); 
        return;
      }

      setProducts((prev) => (reset ? data.products : [...prev, ...data.products]));
      setOffset(reset ? 20 : currentOffset + 20);
      setHasMore(data.products.length === 20);
      
    } catch (err) {
      console.error(err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, offset, searchQuery, categoryQuery]);

  useEffect(() => {
    setHasMore(true); 
    loadProducts(true);
  }, [searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loadProducts, hasMore, loading]);

  const sortedProducts = [...products].sort((a, b) => {
    const rateA = typeof a.rating === 'number' ? a.rating : 0;
    const rateB = typeof b.rating === 'number' ? b.rating : 0;

    if (sortQuery === "price-asc") return a.price - b.price;
    if (sortQuery === "price-desc") return b.price - a.price;
    if (sortQuery === "rating-desc") return rateB - rateA;
    return 0;
  });

  const handleFilterChange = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) params.set("category", cat); else params.delete("category");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set("sort", val); else params.delete("sort");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <HeroBanner />
      
      <div style={{ marginTop: "40px" }}>
        <h1 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
          {categoryQuery ? `Category: ${categoryQuery}` : "Discover Products"}
        </h1>
        
        <FilterBar
          category={categoryQuery}
          sort={sortQuery}
          setCategory={handleFilterChange}
          setSort={handleSortChange}
        />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "25px",
        marginTop: "20px"
      }}>
        {sortedProducts.map((p, idx) => (
          <ProductCard key={`${p.id}-${idx}`} product={p} />
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "30px" }}>
          <p>Loading...</p>
        </div>
      )}

      {!loading && sortedProducts.length === 0 && (
        <div style={{ textAlign: "center", padding: "80px", color: "#888" }}>
          <h2>No products found</h2>
          <p>Try searching for something else.</p>
        </div>
      )}

      {hasMore && <div ref={loaderRef} style={{ height: "20px" }} />}
    </main>
  );
}