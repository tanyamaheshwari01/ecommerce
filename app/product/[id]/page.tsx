"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
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
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ padding: 60, textAlign: "center" }}>Loading...</p>;
  if (!product) return <p style={{ padding: 60, textAlign: "center" }}>Product not found</p>;

  return (
    <main style={{
      maxWidth: "1000px",
      margin: "40px auto",
      padding: "0 20px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "40px",
      alignItems: "start"
    }}>
      <div style={{
        background: "#f9f9f9",
        borderRadius: "20px",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "450px"
      }}>
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={400}
          height={400}
          priority
          style={{
            maxHeight: "100%",
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      <div>
        <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "12px", color: "#111" }}>
          {product.title}
        </h1>

        <p style={{ 
          display: "inline-block",
          padding: "4px 12px",
          background: "#eee",
          borderRadius: "6px",
          fontSize: "14px",
          marginBottom: "20px" 
        }}>
          {product.category}
        </p>

        <p style={{ fontSize: "28px", fontWeight: "800", color: "#6C5CE7", marginBottom: "20px" }}>
          ${product.price}
        </p>

        <p style={{ lineHeight: "1.8", color: "#444", marginBottom: "30px" }}>
          {product.description}
        </p>

        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "10px", 
          marginBottom: "30px",
          fontSize: "18px"
        }}>
          <span style={{ color: "#facc15" }}>⭐</span>
          <span style={{ fontWeight: "600" }}>{product.rating}</span>
          <span style={{ color: "#888", fontSize: "14px" }}>(Verified Rating)</span>
        </div>

        <button
          onClick={() => addToCart(product)}
          style={{
            width: "100%",
            padding: "16px",
            background: "#09052b",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "opacity 0.2s"
          }}
        >
          Add to Cart
        </button>
      </div>
    </main>
  );
}