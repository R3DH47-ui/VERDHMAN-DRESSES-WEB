"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  GraduationCap,
  User,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/shop", label: "Shop", Icon: ShoppingBag },
  { href: "/schools", label: "Schools", Icon: GraduationCap },
  { href: "/account", label: "Account", Icon: User },
  { href: "#menu", label: "Menu", Icon: Menu },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-line px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.04)]"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isMenuTab = href === "#menu";
          const isActive = isMenuTab
            ? pathname?.startsWith("/orders") || pathname?.startsWith("/cart")
            : href === "/"
            ? pathname === "/"
            : pathname?.startsWith(href);

          if (isMenuTab) {
            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  window.dispatchEvent(new CustomEvent("vardhman-open-menu"));
                }}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 w-12 py-1 transition duration-150 cursor-pointer active:scale-95",
                  isActive ? "text-brand" : "text-muted hover:text-ink"
                )}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-[10px] font-semibold leading-none">{label}</span>
              </button>
            );
          }

          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-12 py-1 transition duration-150 active:scale-95",
                isActive ? "text-brand" : "text-muted hover:text-ink"
              )}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
              <span className="text-[10px] font-semibold leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
