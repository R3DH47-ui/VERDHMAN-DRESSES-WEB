"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  // If empty on first mount, provide standard favorites from design
  const displayItems = wishlist.length > 0 ? wishlist : products.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10 py-6 md:py-10 space-y-6">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="w-9 h-9 rounded-full border border-line bg-surface flex items-center justify-center text-ink hover:text-brand hover:bg-tile transition"
            aria-label="Back to Account"
          >
            <ArrowLeft size={18} strokeWidth={1.8} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
              My Wishlist
            </h1>
            <p className="text-xs text-muted">
              Saved items for upcoming terms and seasonal uniform changes.
            </p>
          </div>
        </div>

        <span className="text-xs font-semibold text-muted bg-surface border border-line px-3 py-1 rounded-full">
          {displayItems.length} items saved
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {displayItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
