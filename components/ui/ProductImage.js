"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImage({
  src,
  alt = "School uniform",
  fill,
  width,
  height,
  className = "",
  priority = false,
}) {
  const [error, setError] = useState(false);

  // If error occurs or no src provided, render an elegant, styled SVG uniform emblem
  if (error || !src) {
    const isHero = alt.toLowerCase().includes("student") || alt.toLowerCase().includes("hero");
    const isTie = alt.toLowerCase().includes("necktie") || alt.toLowerCase().includes("tie");
    const isSkirt = alt.toLowerCase().includes("skirt");
    const isBlazer = alt.toLowerCase().includes("blazer");

    return (
      <div
        className={`flex flex-col items-center justify-center bg-tile text-muted p-4 select-none ${className}`}
        style={fill ? { position: "absolute", inset: 0 } : { width, height }}
        role="img"
        aria-label={alt}
      >
        {isHero ? (
          <div className="flex flex-col items-center justify-center text-center p-6 space-y-2">
            <svg
              width="64"
              height="64"
              viewBox="0 0 64 64"
              fill="none"
              stroke="#B30000"
              strokeWidth="1.5"
              className="opacity-70"
            >
              <circle cx="32" cy="20" r="12" />
              <path d="M12 56c0-11 9-20 20-20s20 9 20 20" />
              <path d="M26 32l6 8 6-8" />
            </svg>
            <span className="text-[11px] font-bold uppercase tracking-widest text-brand">
              Vardhman Est. 1979
            </span>
          </div>
        ) : isTie ? (
          <svg width="44" height="60" viewBox="0 0 44 60" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 8h12l-2 8h-8z" fill="#1B365D" />
            <path d="M18 16l-6 24 10 14 10-14-6-24z" fill="#1B365D" />
            <path d="M14 26l16-6M12 36l18-6M18 46l10-4" stroke="#B30000" strokeWidth="1.2" />
          </svg>
        ) : isSkirt ? (
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M18 14h20l8 32H10z" fill="#203A43" />
            <line x1="22" y1="14" x2="16" y2="46" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="28" y1="14" x2="28" y2="46" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="34" y1="14" x2="40" y2="46" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />
          </svg>
        ) : isBlazer ? (
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 16l14-6 14 6 4 34H12z" fill="#1B263B" />
            <path d="M22 16l8 18 8-18" stroke="#FFFFFF" strokeWidth="1.2" />
            <circle cx="30" cy="40" r="1.5" fill="#C5A059" />
            <circle cx="30" cy="46" r="1.5" fill="#C5A059" />
            <rect x="36" y="28" width="6" height="8" rx="1" stroke="#C5A059" strokeWidth="1" />
          </svg>
        ) : (
          /* Standard Oxford Shirt & Uniform Top illustration */
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M16 14l12-4 12 4 6 34H10z" fill="#FFFFFF" stroke="#D6D0C7" />
            <path d="M22 14l6 8 6-8" stroke="#B30000" strokeWidth="1.2" />
            <line x1="28" y1="22" x2="28" y2="48" stroke="#D6D0C7" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="1.2" fill="#B30000" />
            <circle cx="28" cy="35" r="1.2" fill="#B30000" />
            <circle cx="28" cy="42" r="1.2" fill="#B30000" />
            <rect x="33" y="24" width="6" height="7" rx="1" stroke="#D6D0C7" strokeWidth="1" />
          </svg>
        )}
      </div>
    );
  }

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${className}`}
        onError={() => setError(true)}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      onError={() => setError(true)}
      priority={priority}
    />
  );
}
