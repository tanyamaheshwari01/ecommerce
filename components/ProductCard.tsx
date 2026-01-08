import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  const cartItem = cart.find(item => item.id === product.id);
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
    height: "100%",
  }}
>

      {/* IMAGE */}
      <div
        style={{
          height: "180px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "12px",
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

      {/* TITLE */}
      <h3
        style={{
          fontSize: "16px",
          marginBottom: "8px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.title}
      </h3>

      {/* PRICE + RATING */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
  <span style={{ color: "#facc15", fontSize: "14px" }}>⭐</span>
  <span style={{ fontSize: "14px", color: "#555" }}>
    {product.rating.rate}
  </span>
</div>

      {/* VIEW (OLD STYLE – SIMPLE LINK) */}
      <Link
  href={`/product/${product.id}`}
  style={{
    fontSize: "14px",
    color: "#6C5CE7",
    textDecoration: "none",
    marginTop: "6px",
    display: "inline-block",
  }}
>
  View details
</Link>


      {/* ADD TO CART / COUNTER */}
      <div style={{ marginTop: "auto", height: "44px" }}>
        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product)}
            style={{
              width: "100%",
              height: "44px",
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
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "0 12px",
            }}
          >
            <button
              onClick={() => decreaseQty(product.id)}
              style={{
                border: "none",
                background: "transparent",
                fontSize: "20px",
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
                fontSize: "20px",
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
