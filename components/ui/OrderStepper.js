"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export default function OrderStepper({
  current = 1,
  steps = ["Placed", "Packed", "Shipped", "Delivered"],
}) {
  return (
    <div className="w-full py-1">
      <div className="relative flex items-center justify-between">
        {/* Connecting horizontal line */}
        <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-0.5 bg-line z-0">
          <div
            className="h-full bg-brand transition-all duration-300"
            style={{
              width: `${((Math.max(1, current) - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>

        {/* Step dots */}
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < current;
          const isCurrent = stepNum === current;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              <div
                className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 transition-colors",
                  isCompleted
                    ? "bg-brand border-brand text-white"
                    : isCurrent
                    ? "bg-surface border-brand text-brand ring-4 ring-brand-tint"
                    : "bg-surface border-line-strong text-muted"
                )}
              >
                {isCompleted ? (
                  <Check size={12} strokeWidth={3} />
                ) : (
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      isCurrent ? "bg-brand" : "bg-line-strong"
                    )}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Aligned labels row: strictly aligned within container bounds */}
      <div className="flex items-center justify-between mt-2 pt-0.5 text-[10px] font-bold tracking-wider uppercase">
        {steps.map((step, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < current;
          const isCurrent = stepNum === current;
          const isFirst = idx === 0;
          const isLast = idx === steps.length - 1;

          return (
            <div
              key={step}
              className={cn(
                "flex-1",
                isFirst
                  ? "text-left"
                  : isLast
                  ? "text-right"
                  : "text-center",
                isCurrent
                  ? "text-brand"
                  : isCompleted
                  ? "text-ink"
                  : "text-muted"
              )}
            >
              <span>{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
