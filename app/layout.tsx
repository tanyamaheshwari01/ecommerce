"use client";

import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <SearchProvider>
            <Navbar />
            {children}
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}
