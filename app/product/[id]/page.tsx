"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "@/lib/api";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsPage() {
  const params = useParams();
  const id = Number(params.id); 

  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    getProductById(id)
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (!product) return <p style={{ padding: 40 }}>Product not found</p>;

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      {/* IMAGE */}
      <div
        style={{
          height: "420px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* DETAILS BELOW */}
      <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>
        {product.title}
      </h1>

      <p style={{ color: "#666", marginBottom: "10px" }}>
        Category: {product.category}
      </p>

      <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        ₹ {product.price}
      </p>

      <p style={{ lineHeight: "1.7", marginBottom: "20px" }}>
        {product.description}
      </p>

      <div style={{ marginBottom: "24px" }}>
        ⭐ {product.rating.rate} / 5 ({product.rating.count} reviews)
      </div>

      <button
        onClick={() => addToCart(product)}
        style={{
          padding: "14px 28px",
          background: "#6C5CE7",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Add to Cart
      </button>
    </div>
  );
}
