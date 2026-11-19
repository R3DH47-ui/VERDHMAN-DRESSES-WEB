"use client";

import { Minus, Plus } from "lucide-react";

export default function QtyStepper({
  value = 1,
  onChange,
  min = 1,
  max = 99,
  size = "md",
}) {
  const isSmall = size === "sm";

  return (
    <div className="inline-flex items-center border border-line rounded-btn bg-surface overflow-hidden shadow-soft">
      <button
        type="button"
        onClick={() => onChange?.(Math.max(min, value - 1))}
        disabled={value <= min}
        className={`flex items-center justify-center text-ink hover:bg-tile active:bg-line transition disabled:opacity-30 disabled:cursor-not-allowed ${
          isSmall ? "w-7 h-7" : "w-8 h-8"
        }`}
        aria-label="Decrease quantity"
      >
        <Minus size={isSmall ? 13 : 15} strokeWidth={2} />
      </button>

      <span
        className={`flex items-center justify-center font-bold text-ink border-x border-line ${
          isSmall ? "w-8 h-7 text-xs" : "w-10 h-8 text-sm"
        }`}
      >
        {value}
      </span>

      <button
        type="button"
        onClick={() => onChange?.(Math.min(max, value + 1))}
        disabled={value >= max}
        className={`flex items-center justify-center text-ink hover:bg-tile active:bg-line transition disabled:opacity-30 disabled:cursor-not-allowed ${
          isSmall ? "w-7 h-7" : "w-8 h-8"
        }`}
        aria-label="Increase quantity"
      >
        <Plus size={isSmall ? 13 : 15} strokeWidth={2} />
      </button>
    </div>
  );
}
