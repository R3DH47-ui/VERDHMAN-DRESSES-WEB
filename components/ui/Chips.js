"use client";

import { cn } from "@/lib/cn";

export default function Chips({ chips, activeChip, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
      {chips.map((chip) => {
        const id = typeof chip === "string" ? chip : chip.id;
        const label = typeof chip === "string" ? chip : chip.label;
        const isActive = activeChip === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={cn(
              "px-3.5 py-1.5 rounded-pill text-xs font-bold uppercase tracking-wider whitespace-nowrap transition duration-150 shrink-0",
              isActive
                ? "bg-ink text-white"
                : "bg-surface text-body border border-line hover:border-line-strong hover:text-ink hover:bg-tile"
            )}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
