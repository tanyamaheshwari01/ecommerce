/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect} from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";

export default function Navbar() {
  const { cart } = useCart();
  const { search, setSearch } = useSearch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalQty = cart?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) setSearch(query);
  }, []); 

  // 2. Search Debouncing logic
  useEffect(() => {
    if (!search && !searchParams.get("search")) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }

      router.push(`/?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);

  }, [search, router]); 

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 40px",
        background: "#ffffff",
        borderBottom: "1px solid #eee",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Link href="/" style={{ textDecoration: "none" }}>
        <h2 style={{ color: "#120c3f", margin: 0 }}>🛍️ ShopEase</h2>
      </Link>

      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "45%",
          padding: "12px 18px",
          borderRadius: "999px",
          border: "1px solid #e5e7eb",
          outline: "none",
          fontSize: "15px",
        }}
      />

      <Link
        href="/cart"
        style={{
          background: "#120c3f",
          color: "#ffffff",
          padding: "10px 16px",
          borderRadius: "8px",
          fontSize: "15px",
          fontWeight: "600",
          textDecoration: "none",
        }}
      >
        🛒 {totalQty}
      </Link>
    </header>
  );
}