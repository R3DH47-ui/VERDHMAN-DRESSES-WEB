"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Share2 } from "lucide-react";
import Chips from "@/components/ui/Chips";
import ProductCard from "@/components/product/ProductCard";
import { schools } from "@/data/schools";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";

const SCHOOL_CHIPS = [
  { id: "all", label: "ALL" },
  { id: "shirts", label: "SHIRTS & TOPS" },
  { id: "bottoms", label: "BOTTOMS" },
  { id: "accessories", label: "ACCESSORIES" },
];

export default function SchoolUniformClient({ slug }) {
  const school = schools.find((s) => s.slug === slug) || schools[0];
  const [activeClass, setActiveClass] = useState("4");
  const [activeChip, setActiveChip] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const classLevels = school.classLevels || [
    "N",
    "LKG",
    "UKG",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  // School products with in-set tags
  const schoolProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      let matchesCategory = true;
      if (activeChip === "shirts") {
        matchesCategory = product.category === "shirts";
      } else if (activeChip === "bottoms") {
        matchesCategory =
          product.category === "trousers" || product.category === "skirts";
      } else if (activeChip === "accessories") {
        matchesCategory =
          product.category === "accessories" || product.category === "sweaters";
      }

      // Search filter
      const matchesSearch =
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeChip, searchQuery]);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-3 md:px-6 lg:px-10 py-4 md:py-6 space-y-4 bg-paper text-ink">
      {/* Top Bar with School Name & Location */}
      <div className="flex items-center justify-between border-b border-line pb-3">
        <div className="flex items-center gap-3">
          <Link
            href="/schools"
            className="w-9 h-9 rounded-full border border-line bg-surface flex items-center justify-center text-ink hover:text-brand hover:bg-tile transition"
            aria-label="Back to schools directory"
          >
            <ArrowLeft size={18} strokeWidth={1.8} />
          </Link>
          <div>
            <h1 className="font-serif text-base md:text-xl font-bold text-ink leading-tight">
              {school.name}
            </h1>
            <p className="text-xs text-muted">
              {school.board}, {school.location}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className="w-9 h-9 rounded-full border border-line bg-surface flex items-center justify-center text-ink hover:text-brand hover:bg-tile transition"
            aria-label="Search items"
          >
            <Search size={16} strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                if (navigator.share) {
                  navigator.share({
                    title: `${school.name} Uniforms`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Uniform link copied to clipboard!");
                }
              }
            }}
            className="w-9 h-9 rounded-full border border-line bg-surface flex items-center justify-center text-ink hover:text-brand hover:bg-tile transition"
            aria-label="Share uniform list"
          >
            <Share2 size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Expandable search bar */}
      {searchOpen && (
        <div className="pt-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter shirts, skirts, ties for this school..."
            className="w-full bg-surface border border-brand rounded-pill py-2 px-4 text-xs text-ink outline-none"
            autoFocus
          />
        </div>
      )}

      {/* Main content layout: Class rail on left + Uniform Grid on right */}
      <div className="flex gap-4 md:gap-6 items-start pt-2">
        {/* Left Vertical Class Rail */}
        <aside
          className="w-14 sm:w-16 shrink-0 bg-surface border border-line rounded-card py-2 px-1 flex flex-col items-center gap-1.5 shadow-soft sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar"
          aria-label="Class Selection Rail"
        >
          <span className="text-[9px] font-bold uppercase tracking-wider text-muted pb-1 border-b border-line w-full text-center">
            Class
          </span>

          {classLevels.map((lvl) => {
            const isActive = activeClass === lvl;
            return (
              <button
                key={lvl}
                type="button"
                onClick={() => setActiveClass(lvl)}
                className={cn(
                  "relative w-10 sm:w-12 h-10 rounded-btn flex items-center justify-center font-bold text-xs sm:text-sm transition duration-150",
                  isActive
                    ? "bg-brand text-white shadow-xs"
                    : "text-ink hover:bg-tile"
                )}
                aria-pressed={isActive}
              >
                {isActive && (
                  <span className="absolute -left-1.5 top-2 bottom-2 w-1 bg-brand rounded-r" />
                )}
                {lvl}
              </button>
            );
          })}
        </aside>

        {/* Right Uniform Products Content */}
        <section className="flex-1 min-w-0 space-y-4">
          {/* Header: Class 4 + Item Count */}
          <div className="flex items-baseline justify-between border-b border-line pb-2">
            <div>
              <h2 className="font-serif text-xl md:text-2xl font-bold text-ink">
                Class {activeClass}
              </h2>
              <p className="text-xs text-muted">
                Official prescribed kit for Academic Year 2024–25
              </p>
            </div>
            <span className="text-xs font-semibold text-muted">
              {schoolProducts.length} Items
            </span>
          </div>

          {/* Filter Chips: ALL / SHIRTS & TOPS / BOTTOMS / ACCESSORIES */}
          <div>
            <Chips
              chips={SCHOOL_CHIPS}
              activeChip={activeChip}
              onChange={setActiveChip}
            />
          </div>

          {/* Uniform Product Grid (2 columns mobile, 3-4 columns desktop) */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
            {schoolProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                badge="IN SET"
                showClassRange={true}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
