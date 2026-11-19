"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Zap, LayoutGrid, Check } from "lucide-react";
import Tabs from "@/components/ui/Tabs";
import Chips from "@/components/ui/Chips";
import SearchBar from "@/components/ui/SearchBar";
import ProductCard from "@/components/product/ProductCard";
import { products, categories, shopTabs, bundleOffer } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const categoryParam = searchParams.get("category");

  const [activeTab, setActiveTab] = useState("for-you");
  const [internalCategory, setInternalCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart } = useCart();
  const [bundleAdded, setBundleAdded] = useState(false);

  // Directly derive activeCategory without cascading setState in an effect
  const activeCategory = categoryParam || internalCategory;

  const handleCategoryChange = (catId) => {
    setInternalCategory(catId);
    if (catId === "all") {
      router.replace("/shop", { scroll: false });
    } else {
      router.replace(`/shop?category=${catId}`, { scroll: false });
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.shortName?.toLowerCase().includes(q) ||
        product.schoolName?.toLowerCase().includes(q) ||
        product.schoolBadges?.some((badge) => badge.toLowerCase().includes(q));

      const matchesCategory =
        activeCategory === "all" || product.category === activeCategory;

      let matchesTab = true;
      if (activeTab === "primary") {
        matchesTab =
          product.classRange?.toLowerCase().includes("nursery") ||
          product.classRange?.includes("I") ||
          product.classRange?.includes("V") ||
          product.classRange?.toLowerCase().includes("primary") ||
          product.classRange?.toLowerCase().includes("all");
      } else if (activeTab === "middle") {
        matchesTab =
          product.classRange?.includes("VI") ||
          product.classRange?.includes("VIII") ||
          product.classRange?.includes("X") ||
          product.classRange?.toLowerCase().includes("all");
      } else if (activeTab === "secondary") {
        matchesTab =
          product.classRange?.includes("IX") ||
          product.classRange?.includes("X") ||
          product.classRange?.includes("XII") ||
          product.classRange?.toLowerCase().includes("all");
      }

      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [searchQuery, activeCategory, activeTab]);

  const handleAddBundle = () => {
    addToCart(
      {
        id: "bundle-complete-4pc",
        name: bundleOffer.title,
        price: bundleOffer.price,
        mrp: bundleOffer.mrp,
        image: bundleOffer.image,
      },
      "Standard Set",
      "Greenfield / DPS Standard"
    );
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-3 sm:px-4 md:px-6 lg:px-10 py-4 sm:py-6 md:py-8 space-y-5 bg-paper text-ink">
      {/* Search Input Bar */}
      <div>
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
          placeholder="Search shirts, trousers, school name..."
        />
      </div>

      {/* Stage Tabs: FOR YOU, PRIMARY, MIDDLE SCHOOL, SECONDARY */}
      <div>
        <Tabs tabs={shopTabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Heading with Layout Icon */}
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-ink">
          Complete Uniforms Catalog
        </h1>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <LayoutGrid size={16} strokeWidth={1.8} />
          <span className="font-tabular font-medium">{filteredProducts.length} items</span>
        </div>
      </div>

      {/* Complete 4-piece set Banner */}
      <div className="bg-surface border border-line rounded-card p-3 sm:p-4 flex items-center justify-between gap-3 shadow-soft">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-brand-tint text-brand flex items-center justify-center shrink-0 border border-brand-line">
            <Zap size={16} className="fill-brand" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-ink truncate">
              {bundleOffer.title} ·{" "}
              <span className="font-bold font-tabular text-ink">
                {formatPrice(bundleOffer.price)}
              </span>{" "}
              <span className="text-[11px] text-muted line-through font-tabular">
                {formatPrice(bundleOffer.mrp)}
              </span>
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddBundle}
          className="shrink-0 px-4 py-1.5 sm:py-2 rounded-btn bg-brand text-white font-bold text-[11px] uppercase tracking-wider hover:bg-brand-dark transition active:scale-[0.98] shadow-xs"
        >
          {bundleAdded ? (
            <span className="flex items-center gap-1">
              <Check size={13} strokeWidth={2.5} />
              ADDED
            </span>
          ) : (
            "ADD SET"
          )}
        </button>
      </div>

      {/* Category Chips: ALL ITEMS, SHIRTS & TOPS, etc. */}
      <div>
        <Chips
          chips={categories}
          activeChip={activeCategory}
          onChange={handleCategoryChange}
        />
      </div>

      {/* 16 Products Grid in 4 columns desktop (2 columns mobile) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-surface border border-line rounded-card p-8 shadow-soft">
          <p className="text-lg font-bold text-ink">No uniforms found</p>
          <p className="text-xs text-muted mt-1">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              handleCategoryChange("all");
              setActiveTab("for-you");
            }}
            className="mt-4 px-4 py-2 rounded-btn bg-ink text-white text-xs font-bold uppercase tracking-wider hover:bg-brand transition"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-paper" />}>
      <ShopContent />
    </Suspense>
  );
}
