"use client";

export default function ProductSkeleton() {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          height: "180px",
          background: "#e5e7eb",
          borderRadius: "12px",
          marginBottom: "12px",
          animation: "pulse 1.5s infinite",
        }}
      />

      <div
        style={{
          height: "14px",
          width: "80%",
          background: "#e5e7eb",
          borderRadius: "6px",
          marginBottom: "8px",
          animation: "pulse 1.5s infinite",
        }}
      />

      <div
        style={{
          height: "14px",
          width: "40%",
          background: "#e5e7eb",
          borderRadius: "6px",
          animation: "pulse 1.5s infinite",
        }}
      />

      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.4;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
