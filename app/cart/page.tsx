"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return <h2 style={{ padding: 40 }}>Your cart is empty</h2>;
  }

  return (
   
    <div style={{ padding: "48px" }}>
      <Link
  href="/"
  style={{
    display: "inline-block",
    marginBottom: "20px",
    padding: "10px 16px",
    borderRadius: "8px",
    background: "#30276cff",
    color: "#fff",
    textDecoration: "none",
    fontSize: "14px",
  }}
>
  ← Back to Home
</Link>

      <h1 style={{ marginBottom: 32 }}>My Cart</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1.4fr",
          gap: "32px",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#fff",
                borderRadius: 14,
                padding: "16px 20px",
                display: "grid",
                gridTemplateColumns: "90px 1fr auto",
                alignItems: "center",
                boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  height: 70,
                  width: 70,
                  objectFit: "contain",
                }}
              />

              <div>
                <div style={{ fontWeight: 600 }}>{item.title}</div>

                <div
                  style={{
                    fontSize: 14,
                    color: "#6b7280",
                    marginBottom: 8,
                  }}
                >
                  ₹ {item.price}
                </div>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 12,
                    background: "#111827",
                    color: "#fff",
                    borderRadius: 8,
                    padding: "4px 10px",
                  }}
                >
                  <button onClick={() => decreaseQty(item.id)} style={qtyBtn}>
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQty(item.id)} style={qtyBtn}>
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    marginLeft: 12,
                    background: "#fee2e2",
                    border: "1px solid #fecaca",
                    color: "#991b1b",
                    padding: "6px 10px",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>

              <div style={{ fontWeight: 600 }}>
                ₹ {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            background: "#05057aff",
            color: "#fff",
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h2 style={{ marginBottom: 24 }}>Order Summary</h2>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <span>Total</span>
            <strong>₹ {totalPrice.toFixed(2)}</strong>
          </div>

          <button
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: 8,
              border: "none",
              background: "#111827",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

const qtyBtn = {
  background: "transparent",
  border: "none",
  color: "#fff",
  fontSize: 18,
  cursor: "pointer",
};
