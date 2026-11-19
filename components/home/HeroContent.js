"use client";

import Link from "next/link";
import { Truck } from "lucide-react";
import { heroContent } from "@/data/heroContent";
import { cn } from "@/lib/cn";

export default function HeroContent({
  currentSlide,
  totalSlides,
  onSelectSlide,
}) {
  return (
    <div className="relative z-30 mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10 py-10 md:py-20 pointer-events-none">
      <div className="max-w-2xl space-y-4 pointer-events-auto text-center md:text-left mx-auto md:mx-0">
        {/* Eyebrow Badge */}
        <div className="inline-block">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-black/60 backdrop-blur-md border border-white/20 text-[10px] md:text-xs font-bold tracking-widest uppercase text-white shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" aria-hidden="true" />
            {heroContent.eyebrow}
          </span>
        </div>

        {/* Headline: Line 1 Bold upright, Line 2 Italic lighter weight */}
        <h1 className="text-[clamp(1.75rem,4.2vw,3.25rem)] text-white leading-[1.12] tracking-tight">
          <span className="block font-bold">
            {heroContent.headlineLine1}
          </span>
          <span className="block font-normal italic text-white/95 mt-0.5">
            {heroContent.headlineLine2}
          </span>
        </h1>

        {/* Subline with Red Truck Icon */}
        <div className="flex items-center justify-center md:justify-start gap-2 text-xs md:text-sm text-white/90">
          <Truck
            size={18}
            className="text-brand shrink-0"
            strokeWidth={2.2}
            aria-hidden="true"
          />
          <span className="leading-relaxed">{heroContent.subline}</span>
        </div>

        {/* Action Buttons: SHOP COLLECTION (red) and FIND YOUR SCHOOL (white) */}
        <div className="pt-2 flex flex-row items-center justify-center md:justify-start gap-3 w-full [&>*]:flex-1 md:[&>*]:flex-initial">
          <Link
            href={heroContent.primaryCta.href}
            className="inline-flex items-center justify-center px-6 py-2.5 md:py-3 rounded-btn bg-brand text-white font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-brand-dark transition duration-150 active:scale-[0.98] shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand text-center whitespace-nowrap"
          >
            {heroContent.primaryCta.label}
          </Link>
          <Link
            href={heroContent.secondaryCta.href}
            className="inline-flex items-center justify-center px-6 py-2.5 md:py-3 rounded-btn bg-surface text-ink font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-tile transition duration-150 active:scale-[0.98] shadow-md border border-line focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ink text-center whitespace-nowrap"
          >
            {heroContent.secondaryCta.label}
          </Link>
        </div>

        {/* Dots Indicator: 5 total, active = elongated light pill */}
        <div
          className="pt-6 flex items-center justify-center md:justify-start gap-2"
          role="tablist"
          aria-label="Hero slide selection"
        >
          {Array.from({ length: totalSlides }).map((_, idx) => {
            const isActive = currentSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={isActive ? "true" : undefined}
                aria-selected={isActive}
                role="tab"
                className={cn(
                  "h-2 rounded-pill transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white",
                  isActive
                    ? "w-8 bg-white/90 shadow-sm"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
