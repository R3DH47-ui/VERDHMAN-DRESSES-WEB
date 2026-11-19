"use client";

import Link from "next/link";
import { Heart, ShoppingCart } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export default function ProductCard({
  product,
  badge,
  badgeColor,
  showClassRange = true,
}) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product) return null;

  const activeBadge =
    badge || (product.inSet ? "IN SET" : product.schoolBadges?.[0] || null);
  const wishlisted = isWishlisted(product.id);

  const isBlackBadge =
    badgeColor === "ink" ||
    activeBadge?.includes("MARY") ||
    activeBadge?.includes("DAV") ||
    activeBadge?.includes("UNIVERSAL") ||
    activeBadge === "IN SET";

  return (
    <div className="group relative bg-surface border border-line rounded-card overflow-hidden flex flex-col justify-between p-2.5 sm:p-3 transition-all duration-200 hover:shadow-card hover:border-line-strong">
      {/* Top Image area: bg-tile with a border-line border so white shirts stay visible */}
      <div className="relative w-full aspect-square bg-tile rounded-[10px] overflow-hidden flex items-center justify-center mb-2.5 border border-line">
        {/* Top-left Badge */}
        {activeBadge && (
          <span
            className={cn(
              "absolute top-2 left-2 z-10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-[4px] shadow-xs",
              isBlackBadge
                ? "bg-ink text-white"
                : "bg-brand text-white"
            )}
          >
            {activeBadge}
          </span>
        )}

        {/* Top-right Wishlist Heart Button: circle in bg-surface with border-line */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-surface border border-line flex items-center justify-center text-muted hover:text-brand hover:scale-105 transition duration-150 shadow-xs"
        >
          <Heart
            size={13}
            strokeWidth={1.8}
            className={cn(
              "transition-colors",
              wishlisted ? "fill-brand text-brand" : "text-muted hover:text-brand"
            )}
          />
        </button>

        {/* Product Image Link */}
        <Link
          href={`/product/${product.id}`}
          className="block w-full h-full relative p-3"
        >
          <ProductImage
            src={product.image}
            alt={product.name}
            fill
            className="group-hover:scale-105 transition duration-300 object-contain p-2"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 justify-between gap-2">
        <div>
          {/* Title */}
          <Link
            href={`/product/${product.id}`}
            className="block font-medium text-xs sm:text-sm text-ink line-clamp-1 hover:text-brand transition duration-150 leading-snug"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Class range */}
          {showClassRange && (
            <p className="text-[11px] text-muted mt-0.5">
              {product.classRange || "Class I to X"}
            </p>
          )}

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1">
            <span className="text-[10px] font-bold text-brand flex items-center gap-0.5">
              ★ {product.rating || "4.8"}
            </span>
          </div>

          {/* Price & MRP */}
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-sm sm:text-base font-bold text-ink font-tabular">
              {formatPrice(product.price)}
            </span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-[11px] text-muted line-through font-tabular">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>
        </div>

        {/* Black ADD TO CART button with cart icon: bg-ink text-white */}
        <button
          type="button"
          onClick={() => addToCart(product, product.sizes?.[0] || "30")}
          className="w-full mt-1 bg-ink hover:bg-brand text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-wider py-2 px-2.5 rounded-btn transition duration-150 flex items-center justify-center gap-1.5 active:scale-[0.98] shadow-xs"
        >
          <ShoppingCart size={13} strokeWidth={2} />
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
