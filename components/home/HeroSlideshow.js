"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/heroSlides";
import HeroContent from "./HeroContent";
import {
  HERO_INTERVAL_MS,
  SLIDE_DURATION_MS,
  SLIDE_DIRECTION,
} from "@/lib/config";

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = heroSlides.length;
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Dynamic RTL auto-advance timer
  useEffect(() => {
    if (isPaused) return;

    // WCAG: Disable autoplay if user prefers reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = setInterval(() => {
      if (SLIDE_DIRECTION === "rtl") {
        nextSlide();
      } else {
        prevSlide();
      }
    }, HERO_INTERVAL_MS);

    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(timer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [isPaused, nextSlide, prevSlide]);

  // Touch swipe support (RTL swipe)
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      className="relative w-full bg-ink text-white overflow-hidden min-h-[520px] md:min-h-[520px] flex items-center group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Official School Uniforms Hero Slideshow"
      aria-roledescription="carousel"
    >
      {/* Background Slider Track (Contains ONLY background images) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div
          className="flex h-full w-full will-change-transform ease-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
            transitionDuration: `${SLIDE_DURATION_MS}ms`,
            transitionProperty: "transform",
          }}
        >
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.id}
              className="relative w-full h-full flex-shrink-0"
              aria-hidden={currentSlide !== idx}
              role="group"
              aria-roledescription="slide"
              aria-label={`${slide.title} (${idx + 1} of ${totalSlides})`}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                loading={idx === 0 ? "eager" : "lazy"}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Dark gradient overlay for WCAG AA contrast (≥ 4.5:1 on white text) */}
        <div
          className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-black/85 via-black/60 to-black/40"
          aria-hidden="true"
        />
      </div>

      {/* Manual Navigation Arrows (Hover / Focusable) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous hero slide"
        className="absolute left-3 md:left-6 z-30 p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/75 text-white/80 hover:text-white backdrop-blur-sm transition border border-white/20 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next hero slide"
        className="absolute right-3 md:right-6 z-30 p-2 md:p-3 rounded-full bg-black/40 hover:bg-black/75 text-white/80 hover:text-white backdrop-blur-sm transition border border-white/20 opacity-0 group-hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" aria-hidden="true" />
      </button>

      {/* Dedicated Single HeroContent Layer (Rendered exactly once, higher z-index) */}
      <HeroContent
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        onSelectSlide={setCurrentSlide}
      />
    </section>
  );
}
