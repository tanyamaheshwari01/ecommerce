"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";

export default function Navbar() {
  const { cart } = useCart();
  const { search, setSearch } = useSearch();

  const totalQty = cart?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

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
      <h2 style={{ color: "#120c3f" }}>🛍️ ShopEase</h2>

      <input
        suppressHydrationWarning
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
