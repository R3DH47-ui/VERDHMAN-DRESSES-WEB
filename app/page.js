"use client";

import Link from "next/link";
import Image from "next/image";
import { Award, Ruler, RotateCcw } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import HeroSlideshow from "@/components/home/HeroSlideshow";
import CategorySlider from "@/components/home/CategorySlider";
import { recommendedForUser } from "@/data/products";
import { useProfile } from "@/context/ProfileContext";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

const TRUST_BADGES = [
  {
    icon: Award,
    title: "Since 1979",
    subtitle: "45+ yrs legacy",
  },
  {
    icon: Ruler,
    title: "Doorstep fit",
    subtitle: "Home size trial",
  },
  {
    icon: RotateCcw,
    title: "Easy exchange",
    subtitle: "7-day doorstep",
  },
];

export default function HomePage() {
  const { profile } = useProfile();
  const userName = profile?.name || "Rohan";
  const userSchools = (profile?.linkedSchools || [
    "Sacred Heart Senior Secondary School",
    "DPS",
  ]).join(" & ");

  return (
    <div className="w-full space-y-8 md:space-y-12 pb-14 bg-paper text-ink">
      {/* 1. Dynamic RTL Full-Bleed Hero Section (Single Source) */}
      <HeroSlideshow />

      {/* 2. "Rohan, still looking for these?" with REAL photographic cards */}
      <section className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10">
        <SectionHeader
          title={`${userName}, still looking for these?`}
          subtitle={`Based on ${userSchools} uniform records`}
          viewAllHref="/shop"
        />

        {/* 3 real cards side-by-side matching the Figma mockup */}
        <div className="flex md:grid md:grid-cols-3 gap-3 md:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
          {recommendedForUser.map((item) => (
            <Link
              key={item.id}
              href={`/product/${item.productId}`}
              className="group bg-surface border border-line rounded-card p-3 flex flex-col justify-between w-[210px] sm:w-[240px] md:w-auto shrink-0 snap-start hover:shadow-card hover:border-line-strong transition duration-200"
            >
              {/* Product Photo Box: bg-tile with border-line */}
              <div className="relative w-full aspect-square bg-tile rounded-[10px] overflow-hidden flex items-center justify-center mb-2.5 border border-line">
                <span
                  className={cn(
                    "absolute top-2 left-2 z-10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-[4px] shadow-xs",
                    item.tagColor === "ink"
                      ? "bg-ink text-white"
                      : "bg-brand text-white"
                  )}
                >
                  {item.tag}
                </span>
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 640px) 210px, (max-width: 1024px) 33vw, 380px"
                />
              </div>

              {/* Text details with tabular price & strike-through MRP */}
              <div className="space-y-1">
                <p className="text-[10px] text-muted uppercase font-semibold tracking-wider">
                  {item.school}
                </p>
                <h3 className="font-semibold text-xs sm:text-sm text-ink truncate group-hover:text-brand transition">
                  {item.title}
                </h3>
                <div className="flex items-baseline gap-2 pt-0.5">
                  <span className="text-sm sm:text-base font-bold text-ink font-tabular">
                    {formatPrice(item.price)}
                  </span>
                  {item.mrp && (
                    <span className="text-xs text-muted line-through font-tabular">
                      {formatPrice(item.mrp)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. "Shop uniforms" 6-Category Dynamic Auto-Slider */}
      <section className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10">
        <SectionHeader title="Shop uniforms" viewAllHref="/shop" />
        <CategorySlider />
      </section>

      {/* 4. "Why Parents Trust Vardhman" Trust Badges */}
      <section className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10">
        <div className="space-y-4">
          <h2 className="text-lg md:text-xl font-bold text-ink">
            Why parents trust Vardhman
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {TRUST_BADGES.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className="bg-surface border border-line rounded-card p-4 flex items-center gap-3.5 shadow-soft hover:shadow-card transition duration-200"
                >
                  <div className="w-11 h-11 rounded-full bg-brand-tint text-brand flex items-center justify-center shrink-0 border border-brand-line">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-xs sm:text-sm">
                      {badge.title}
                    </h3>
                    <p className="text-xs text-muted mt-0.5">
                      {badge.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
