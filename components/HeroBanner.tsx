import Image from "next/image";

export default function HeroBanner() {
  return (
    // Main banner container
    <div
      style={{
        margin: "30px 0",
        padding: "40px",
        borderRadius: "20px",
        background: "linear-gradient(135deg, #0d0420ff, #584594ff)",
        color: "#e1d3d3ff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Text content section */}
      <div>
        <h1>Big Savings Day 🎉</h1>
        <p>
          Up to <b>50% OFF</b> on top products
        </p>

        {/* shop now button */}
        <button
        suppressHydrationWarning
          style={{
            marginTop: 20,
            padding: "10px 20px",
            borderRadius: 20,
            border: "none",
            cursor: "pointer",
          }}
        >
          Shop Now
        </button>
      </div>

      <Image
      loading="eager"
        src="https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
        alt="sale"
        height={130}
        width={130}
      />

    </div>
  );
}
