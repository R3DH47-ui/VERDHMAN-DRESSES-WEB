"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  GraduationCap,
  ClipboardList,
  ShoppingCart,
  User,
  Menu,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/cn";

const NAV_ITEMS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/shop", label: "Shop", Icon: ShoppingBag },
  { href: "/schools", label: "Schools", Icon: GraduationCap },
  { href: "/orders", label: "Orders", Icon: ClipboardList },
  { href: "/cart", label: "Cart", Icon: ShoppingCart },
  { href: "/account", label: "Account", Icon: User },
  { href: "#menu", label: "Menu", Icon: Menu },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-line px-1 pb-[env(safe-area-inset-bottom)] shadow-[0_-2px_10px_rgba(0,0,0,0.04)]"
      aria-label="Bottom navigation"
    >
      <div className="flex items-center justify-around h-14">
        {NAV_ITEMS.map(({ href, label, Icon }) => {
          const isActive =
            href === "/"
              ? pathname === "/"
              : href !== "#menu" && pathname?.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 w-12 py-1 transition duration-150",
                isActive ? "text-brand" : "text-muted hover:text-ink"
              )}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="relative">
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
                {label === "Cart" && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex items-center justify-center w-4 h-4 text-[9px] font-bold font-tabular text-white bg-brand rounded-full">
                    {totalItems}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-semibold leading-none">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
