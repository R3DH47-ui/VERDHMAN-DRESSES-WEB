import { cn } from "@/lib/cn";

const BADGE_VARIANTS = {
  brand: "bg-brand-tint text-brand border border-brand-line",
  success: "bg-success-tint text-success border border-green-200",
  warning: "bg-warning-tint text-warning border border-amber-200",
  danger: "bg-brand-tint text-brand border border-brand-line",
  neutral: "bg-tile text-muted border border-line",
  dark: "bg-ink text-white",
  school: "bg-brand text-white text-[10px] font-bold tracking-wider uppercase",
  inSet: "bg-ink text-white text-[10px] font-bold tracking-wider uppercase",
};

export default function Badge({
  children,
  variant = "neutral",
  size = "md",
  className = "",
  dotColor,
}) {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-xs",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-bold uppercase rounded-sm whitespace-nowrap",
        BADGE_VARIANTS[variant] || BADGE_VARIANTS.neutral,
        sizeClasses[size] || sizeClasses.md,
        className
      )}
    >
      {dotColor && (
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </span>
  );
}
