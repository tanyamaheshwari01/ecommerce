import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>
        404
      </h1>
      <p style={{ fontSize: "18px", marginBottom: "24px", color: "#555" }}>
        Page not found
      </p>

      <Link
        href="/"
        style={{
          padding: "10px 20px",
          borderRadius: "8px",
          background: "#6C5CE7",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        Go back to Home
      </Link>
    </div>
  );
}
