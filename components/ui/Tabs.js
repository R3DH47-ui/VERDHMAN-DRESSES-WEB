"use client";

import { cn } from "@/lib/cn";

export default function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2 rounded-pill text-[11px] font-bold uppercase tracking-wider whitespace-nowrap transition duration-150 shrink-0 shadow-2xs",
              isActive
                ? "bg-ink text-white"
                : "bg-surface text-body border border-line hover:border-line-strong hover:text-ink hover:bg-tile"
            )}
            aria-pressed={isActive}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
