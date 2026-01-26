"use client";

import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { SearchProvider } from "@/context/SearchContext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <SearchProvider>
        <Suspense fallback={<div className="p-20 text-center">Loading...</div>}>
          <Navbar />
          {children}
        </Suspense>
      </SearchProvider>
    </CartProvider>
  );
}
