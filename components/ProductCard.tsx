import Link from "next/link";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  // find this product in cart
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
        height: "100%", // ✅ IMPORTANT
      }}
    >
      {/* TOP CONTENT (image + text) */}
     <div style={{ flexGrow: 1 }}>

  {/* IMAGE */}
  <div
    style={{
      height: "160px",
      display: "flex",
      width:"100%",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "10px",
    
    }}
  >
    <img
      src={product.image}
      alt={product.title}
      style={{
        maxWidth: "100%",
        maxHeight: "160px",
        objectFit: "contain",
      }}
    />
  </div>

  {/* TEXT */}
  <div style={{ height: "90px" }}>
    <h3
      style={{
        fontSize: "16px",
        marginBottom: "6px",
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
      }}
    >
      {product.title}
    </h3>

    <p style={{ fontWeight: 600, marginBottom: "4px" }}>
      ₹ {product.price}
    </p>

    <Link href={`/product/${product.id}`}>View</Link>
  </div>
</div>


      {/* ADD TO CART / COUNTER */}
      
      <div style={{ marginTop: "12px", height: "44px" }}>
  {quantity === 0 ? (
    <button
      onClick={() => addToCart(product)}
      style={{
        width: "100%",
        height: "44px",              // ✅ fixed height
        background: "#09052bff",
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
        height: "44px",              // ✅ same height
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
