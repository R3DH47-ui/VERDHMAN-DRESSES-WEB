"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Star, Heart, Shield, RotateCcw, Check, ShoppingCart } from "lucide-react";
import ProductImage from "@/components/ui/ProductImage";
import QtyStepper from "@/components/ui/QtyStepper";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/cn";

export default function ProductDetailClient({ productId }) {
  const router = useRouter();
  const product = products.find((p) => p.id === productId) || products[0];

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[1] || "30");
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addToCart(product, selectedSize, product.schoolBadges?.[0] || "");
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10 py-6 md:py-10 space-y-6">
      {/* Back button */}
      <div>
        <button
          type="button"
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink transition"
        >
          <ArrowLeft size={16} />
          Back to catalog
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left: Product Image Showcase */}
        <div className="bg-surface border border-line rounded-card p-6 md:p-8 flex items-center justify-center relative aspect-square shadow-soft">
          {product.schoolBadges?.[0] && (
            <span className="absolute top-4 left-4 z-10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-ink text-white rounded-[4px]">
              {product.schoolBadges[0]}
            </span>
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-surface border border-line flex items-center justify-center text-ink hover:text-brand transition shadow-soft"
            aria-label="Wishlist toggle"
          >
            <Heart
              size={18}
              className={wishlisted ? "fill-brand text-brand" : "text-muted"}
            />
          </button>

          <div className="relative w-full h-full max-w-sm max-h-sm bg-tile rounded-btn border border-line/60 p-4 flex items-center justify-center">
            <ProductImage
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right: Product Details & Purchase Form */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-warning-tint text-warning text-xs font-bold">
                <Star size={12} className="fill-amber-500 text-amber-500" />
                {product.rating}
              </span>
              <span className="text-xs text-muted">
                ({product.reviews} verified reviews)
              </span>
              <span className="text-xs text-success font-semibold ml-2">
                ● In Stock
              </span>
            </div>

            <h1 className="font-serif text-2xl md:text-3xl font-bold text-ink leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-muted mt-1">
              Prescribed for {product.classRange} · Certified fabric specification
            </p>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-3 pb-4 border-b border-line">
            <span className="text-2xl font-bold text-ink">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.mrp && product.mrp > product.price && (
              <>
                <span className="text-sm text-muted line-through">
                  ₹{product.mrp.toLocaleString("en-IN")}
                </span>
                <span className="text-xs font-bold text-brand uppercase tracking-wider">
                  Save ₹{(product.mrp - product.price).toLocaleString("en-IN")}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-xs md:text-sm text-body leading-relaxed">
            {product.description}. Manufactured strictly following institutional guidelines with high tensile stitching, color-fast dyeing, and anti-wrinkle finishing.
          </p>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-ink">
                  Select Size:
                </span>
                <button
                  type="button"
                  onClick={() => alert("Standard Indian School Uniform Size Chart (Inches)")}
                  className="text-brand font-semibold underline"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={cn(
                      "w-11 h-10 rounded-btn border text-xs font-bold uppercase transition",
                      selectedSize === sz
                        ? "border-brand bg-brand-tint text-brand ring-1 ring-brand"
                        : "border-line bg-surface text-ink hover:border-line-strong hover:bg-tile"
                    )}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-ink">
                Quantity:
              </span>
              <QtyStepper value={qty} onChange={setQty} />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-6 rounded-btn bg-ink text-white font-bold text-xs uppercase tracking-wider hover:bg-black transition duration-150 flex items-center justify-center gap-2 active:scale-[0.98] shadow-soft"
              >
                {added ? (
                  <>
                    <Check size={16} strokeWidth={2.5} />
                    ADDED TO CART
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    ADD TO CART · ₹{(product.price * qty).toLocaleString("en-IN")}
                  </>
                )}
              </button>

              <Link
                href="/cart"
                className="py-3 px-6 rounded-btn border border-line-strong bg-surface text-ink font-bold text-xs uppercase tracking-wider hover:bg-tile transition flex items-center justify-center shadow-soft"
              >
                VIEW CART
              </Link>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-line text-xs text-muted">
            <div className="flex items-center gap-2">
              <Shield size={16} className="text-brand shrink-0" />
              <span>Official Institutional Crest</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw size={16} className="text-brand shrink-0" />
              <span>7-Day Doorstep Exchange</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
