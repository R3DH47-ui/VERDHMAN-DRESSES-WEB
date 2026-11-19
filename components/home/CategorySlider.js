"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { categoryCards, getCategoryMinPrice } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { SLIDER_INTERVAL_MS } from "@/lib/config";

export default function CategorySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalCards = categoryCards.length; // 6 cards

  // Determine max visible index based on screen width (desktop shows 4, so max starting index is 2)
  const getVisibleCount = useCallback(() => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }, []);

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [getVisibleCount]);

  const maxIndex = Math.max(0, totalCards - visibleCount);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay every 5000ms with pause on hover/focus and tab hide
  useEffect(() => {
    if (isPaused) return;

    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const interval = setInterval(() => {
      nextSlide();
    }, SLIDER_INTERVAL_MS);

    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isPaused, nextSlide]);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sliderRef}
    >
      {/* Carousel Track Container */}
      <div className="overflow-hidden py-1">
        <div
          className="flex transition-transform duration-500 ease-out gap-3 md:gap-5"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
        >
          {categoryCards.map((category) => {
            const minPrice = getCategoryMinPrice(category.id);

            return (
              <div
                key={category.id}
                className="shrink-0 w-[82%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
              >
                <Link
                  href={`/shop?category=${category.id}`}
                  className="group relative bg-surface border border-line rounded-card overflow-hidden p-3 md:p-4 flex flex-col justify-between aspect-[4/4.8] sm:aspect-[4/4.5] hover:shadow-card hover:border-line-strong transition duration-200 block h-full"
                  aria-label={`Shop ${category.title} uniforms from ${formatPrice(minPrice)}`}
                >
                  {/* Category Image */}
                  <div className="relative w-full h-3/5 bg-tile rounded-[10px] overflow-hidden mb-2 border border-line">
                    <Image
                      src={category.image}
                      alt={category.title}
                      fill
                      className="object-cover group-hover:scale-105 transition duration-500"
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  </div>

                  {/* Title & dynamic min price */}
                  <div className="flex items-end justify-between pt-1">
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-ink group-hover:text-brand transition">
                        {category.title}
                      </h3>
                      <p className="text-xs text-muted font-medium mt-0.5 font-tabular">
                        From {formatPrice(minPrice)}
                      </p>
                    </div>

                    {/* Red circular arrow CTA */}
                    <span
                      className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center shrink-0 group-hover:bg-brand-dark transition duration-150 shadow-xs"
                      aria-hidden="true"
                    >
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls: Arrows and Dots */}
      <div className="flex items-center justify-between mt-4">
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5" role="tablist" aria-label="Category slides">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide group ${idx + 1}`}
              aria-selected={currentIndex === idx}
              role="tab"
              className={`h-1.5 rounded-pill transition-all duration-300 ${
                currentIndex === idx
                  ? "w-6 bg-brand"
                  : "w-2 bg-ink/20 hover:bg-ink/50"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous categories"
            className="w-8 h-8 rounded-full border border-line bg-surface hover:bg-tile text-ink flex items-center justify-center transition disabled:opacity-40"
          >
            <ChevronLeft size={16} strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next categories"
            className="w-8 h-8 rounded-full border border-line bg-surface hover:bg-tile text-ink flex items-center justify-center transition disabled:opacity-40"
          >
            <ChevronRight size={16} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
