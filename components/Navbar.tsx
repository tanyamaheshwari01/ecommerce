"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";

export default function Navbar() {
  const { cart } = useCart();
  const { search, setSearch } = useSearch();

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    // Header container 
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


      {/* Cart button with item count */}
      <div style={{ display: "flex", gap: 20 }}>
        <button
          style={{
            background: "#120c3f",
            color: "#ffffff",
            border: "none",
            padding: "10px 16px",
            borderRadius: "8px",
            fontSize: "15px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Link href="/cart" style={{ textDecoration: "none", color: "inherit" }}>
            🛒 {totalQty}
          </Link>
        </button>
      </div>
    </header>
  );
}
