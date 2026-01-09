"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        height: "100%", // 🔴 critical
        overflow: "hidden", // 🔴 prevents overlap
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          height: "180px",
          minHeight: "180px",
          maxHeight: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12px",
          overflow: "hidden",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            maxHeight: "160px",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* CONTENT */}
      <div style={{ flexGrow: 1 }}>
        <h3
          style={{
            fontSize: "15px",
            fontWeight: 600,
            marginBottom: "6px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.title}
        </h3>

        {/* PRICE */}
        <p style={{ fontSize: "16px", fontWeight: 700 }}>
          ₹ {product.price}
        </p>

        {/* RATING */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            margin: "6px 0",
          }}
        >
          <span style={{ color: "#facc15" }}>⭐</span>
          <span style={{ fontSize: "14px" }}>
            {product.rating.rate}
          </span>
        </div>

        <Link
          href={`/product/${product.id}`}
          style={{
            fontSize: "14px",
            color: "#6C5CE7",
            textDecoration: "none",
          }}
        >
          View details
        </Link>
      </div>

      {/* CART */}
      <div style={{ marginTop: "12px" }}>
        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product)}
            style={{
              width: "100%",
              height: "48px",
              background: "#09052b",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "15px",
            }}
          >
            Add to Cart
          </button>
        ) : (
          <div
            style={{
              height: "48px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "0 14px",
            }}
          >
            <button
              onClick={() => decreaseQty(product.id)}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              −
            </button>

            <span style={{ fontWeight: 600 }}>{quantity}</span>

            <button
              onClick={() => increaseQty(product.id)}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "22px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
