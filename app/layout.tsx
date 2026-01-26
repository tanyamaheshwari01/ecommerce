"use client";

import { Suspense } from "react";
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
      <body className="antialiased">
        <CartProvider>
          <SearchProvider>
            <Navbar />

            <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
              {children}
            </Suspense>
          </SearchProvider>
        </CartProvider>
      </body>
    </html>
  );
}