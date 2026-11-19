"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";

export default function SearchBar({
  value = "",
  onChange,
  onClear,
  placeholder = "Search...",
  showFilter = true,
  onFilterClick,
}) {
  return (
    <div className="relative flex items-center w-full">
      <div className="absolute left-4 text-muted pointer-events-none">
        <Search size={18} strokeWidth={1.5} />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-surface border border-line rounded-pill py-2.5 pl-11 pr-12 text-sm text-ink placeholder:text-muted focus:border-brand focus:ring-1 focus:ring-brand outline-none transition duration-150 shadow-soft"
      />
      <div className="absolute right-3 flex items-center gap-1.5">
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="p-1 text-muted hover:text-ink rounded-full transition"
            aria-label="Clear search"
          >
            <X size={15} strokeWidth={1.5} />
          </button>
        )}
        {showFilter && (
          <button
            type="button"
            onClick={onFilterClick}
            className="p-1.5 text-muted hover:text-brand rounded-full transition"
            aria-label="Filter options"
          >
            <SlidersHorizontal size={16} strokeWidth={1.5} />
          </button>
        )}
      </div>
    </div>
  );
}
