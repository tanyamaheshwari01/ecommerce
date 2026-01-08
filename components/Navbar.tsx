"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  
const totalQty = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
);

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        borderBottom: "1px solid #eee",
        background: "#ffffff",
      }}
    >
      <h2 style={{ color: "#120c3fff" }}>🛍️ ShopEase</h2>

      <input
        placeholder="Search in catalog..."
        style={{
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: "999px",
  padding: "10px 16px",
  width: "40%",
}}

      />

      <div style={{ display: "flex", gap: 20 }}>
        <span>❤️ 0</span>
      <Link href="/cart">🛒 {totalQty}</Link>

      </div>
    </header>
  );
}
