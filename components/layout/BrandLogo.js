"use client";

import Link from "next/link";
import Image from "next/image";

const SHOW_HEADER_WORDMARK = true;

/**
 * BrandLogo component
 * Renders the official logo from /brand/vardhman-logo.jpeg
 * Uses mix-blend-mode: multiply to blend the near-white JPEG background.
 * Retains the "Vardhman / SCHOOL UNIFORMS / Est. 1979" text block via SHOW_HEADER_WORDMARK.
 */
export default function BrandLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 md:gap-2.5 shrink-0 group"
      aria-label="Vardhman School Uniforms - since 1979"
    >
      {/* Official VSU Logo graphic */}
      <div className="relative h-[40px] md:h-[48px] w-auto aspect-[880/593] flex items-center shrink-0">
        <Image
          src="/brand/vardhman-logo.jpeg"
          alt="Vardhman School Uniforms - since 1979"
          width={880}
          height={593}
          priority
          className="h-full w-auto object-contain mix-blend-multiply"
        />
      </div>

      {/* Text block next to the logo (Figma layout) */}
      {SHOW_HEADER_WORDMARK && (
        <div className="flex flex-col leading-tight">
          <span className="text-brand text-base md:text-lg font-bold tracking-tight">
            Vardhman
          </span>
          <span className="text-muted text-[9px] md:text-[10px] uppercase tracking-wider leading-none">
            School Uniforms
          </span>
          <span className="text-muted text-[8px] md:text-[9px] italic leading-none mt-0.5">
            Est. 1979
          </span>
        </div>
      )}
    </Link>
  );
}
