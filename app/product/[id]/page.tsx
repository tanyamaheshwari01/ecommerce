"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct } from "@/lib/api";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getProduct(id)
      .then(setProduct)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <p style={{ padding: 40 }}>Loading product...</p>;
  }

  if (!product) {
    return <p style={{ padding: 40 }}>Product not found</p>;
  }

  return (
    <div
      style={{
        padding: "60px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
        alignItems: "center",
      }}
    >
      {/* LEFT – IMAGE */}
      <div style={{ textAlign: "center" }}>
        <img
          src={product.image}
          alt={product.title}
          style={{
            maxHeight: "420px",
            objectFit: "contain",
          }}
        />
      </div>

      {/* RIGHT – DETAILS */}
      <div>
        <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
          {product.title}
        </h1>

        <p style={{ color: "#6b7280", marginBottom: "10px" }}>
          Category: {product.category}
        </p>

        <h2 style={{ marginBottom: "15px" }}>₹ {product.price}</h2>

        <p style={{ marginBottom: "20px", lineHeight: 1.6 }}>
          {product.description}
        </p>

        <p style={{ marginBottom: "20px" }}>
          ⭐ {product.rating.rate} / 5
        </p>

        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "12px 24px",
            background: "#6C5CE7",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
