"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  const ratingValue = typeof product.rating === 'number' ? product.rating : 0;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "0px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        border: "1px solid #f0f0f0",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.08)";
      }}
    >
      <Link href={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div
          style={{
            height: "220px",
            background: "#f8f8f8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: "20px"
          }}
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={200}
            height={200}
            style={{ objectFit: "contain", mixBlendMode: "multiply" }}
          />
          {product.discountPercentage && (
            <span style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "#ff4757",
              color: "#fff",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold"
            }}>
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>

        <div style={{ padding: "15px", flexGrow: 1 }}>
          <p style={{ 
            fontSize: "12px", 
            color: "#888", 
            textTransform: "uppercase", 
            marginBottom: "4px",
            fontWeight: 600 
          }}>
            {product.category.replace(/-/g, ' ')}
          </p>
          
          <h3 style={{
            fontSize: "15px",
            fontWeight: 600,
            color: "#2d3436",
            marginBottom: "8px",
            height: "40px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: "1.4"
          }}>
            {product.title}
          </h3>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
             <div style={{
               display: "flex",
               alignItems: "center",
               background: "#26a541",
               color: "#fff",
               padding: "2px 6px",
               borderRadius: "4px",
               fontSize: "12px",
               fontWeight: "bold"
             }}>
               {ratingValue} <span style={{ marginLeft: "2px" }}>★</span>
             </div>
             <span style={{ fontSize: "12px", color: "#888" }}>(Stock: {product.stock})</span>
          </div>

          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#2d3436" }}>
              ${product.price}
            </span>
          </div>
        </div>
      </Link>

      <div style={{ padding: "15px", paddingTop: "0" }}>
        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product)}
            style={{
              width: "100%",
              height: "42px",
              background: "#0d0842",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#000"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#2d3436"}
          >
            Add to Bag
          </button>
        ) : (
          <div
            style={{
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "2px solid #2d3436",
              borderRadius: "8px",
              padding: "0 5px",
            }}
          >
            <button
              onClick={() => decreaseQty(product.id)}
              style={{ border: "none", background: "none", fontSize: "24px", cursor: "pointer", width: "40px" }}
            >
              -
            </button>
            <span style={{ fontWeight: "bold", fontSize: "16px" }}>{quantity}</span>
            <button
              onClick={() => increaseQty(product.id)}
              style={{ border: "none", background: "none", fontSize: "24px", cursor: "pointer", width: "40px" }}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}