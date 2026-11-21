"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  ShoppingCart,
  Menu,
  X,
  ClipboardList,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useProfile } from "@/context/ProfileContext";
import BrandLogo from "@/components/layout/BrandLogo";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/schools", label: "Schools" },
  { href: "/orders", label: "Orders" },
  { href: "/cart", label: "Cart" },
  { href: "/account", label: "Account" },
];

const DRAWER_LINKS = [
  { href: "#", label: "Help Centre" },
  { href: "#", label: "Contact Us" },
  { href: "#", label: "Store Locator" },
  { href: "#", label: "Exchange Policy" },
  { href: "#", label: "Log Out" },
];

export default function Header() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { profile } = useProfile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const handleOpenMenu = () => setDrawerOpen(true);
    window.addEventListener("vardhman-open-menu", handleOpenMenu);
    return () => {
      window.removeEventListener("vardhman-open-menu", handleOpenMenu);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 px-3 pt-3 pb-2 md:px-6 md:pt-4 md:pb-3 bg-paper">
        <div className="mx-auto max-w-[1280px] flex items-center justify-between border border-brand rounded-pill px-4 py-2 md:px-6 md:py-2.5 bg-surface shadow-soft">
          {/* Logo block */}
          <BrandLogo />

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main navigation">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide rounded-pill transition duration-150",
                    isActive
                      ? "text-white bg-brand"
                      : "text-body hover:text-ink hover:bg-tile"
                  )}
                >
                  {link.label}
                  {link.label === "Cart" && totalItems > 0 && (
                    <span
                      className={cn(
                        "ml-1.5 inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold font-tabular",
                        isActive ? "bg-white text-brand" : "bg-brand text-white"
                      )}
                    >
                      {totalItems}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/shop"
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-line bg-surface text-ink hover:bg-tile transition duration-150"
              aria-label="Search"
            >
              <Search size={16} strokeWidth={1.8} />
            </Link>
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full border border-line bg-surface text-ink hover:bg-tile transition duration-150 relative"
              aria-label="Notifications"
            >
              <Bell size={16} strokeWidth={1.8} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-brand rounded-full" />
            </button>
            <Link
              href="/account"
              className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-tint border border-brand-line text-brand text-xs font-bold overflow-hidden hover:scale-105 transition"
              aria-label="My Account"
            >
              <span className="font-bold">{profile?.initial || "R"}</span>
            </Link>
            <button
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-full border border-line bg-surface text-ink hover:bg-tile transition duration-150"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu size={16} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* Slide-in drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[100]" aria-modal="true" role="dialog">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-72 bg-surface shadow-card p-6 flex flex-col gap-4 border-l border-line">
            <div className="flex items-center justify-between mb-2 border-b border-line pb-3">
              <span className="text-lg font-bold text-ink">Menu</span>
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-tile text-ink"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>

            {/* Orders and Cart rows for mobile menu */}
            <div className="flex flex-col border-b border-line pb-2 mb-1">
              <Link
                href="/orders"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between py-2.5 px-2 rounded-btn hover:bg-tile text-ink hover:text-brand transition duration-150 active:scale-[0.98] group"
              >
                <div className="flex items-center gap-3">
                  <ClipboardList size={18} className="text-brand" strokeWidth={1.8} />
                  <span className="text-sm font-semibold">Orders</span>
                </div>
                <ChevronRight size={16} className="text-muted group-hover:text-ink transition" />
              </Link>
              <Link
                href="/cart"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between py-2.5 px-2 rounded-btn hover:bg-tile text-ink hover:text-brand transition duration-150 active:scale-[0.98] group"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={18} className="text-brand" strokeWidth={1.8} />
                  <span className="text-sm font-semibold">Cart</span>
                </div>
                <div className="flex items-center gap-2">
                  {totalItems > 0 && (
                    <span className="inline-flex items-center justify-center px-1.5 py-0.2 rounded-full text-[10px] font-bold font-tabular bg-brand text-white">
                      {totalItems}
                    </span>
                  )}
                  <ChevronRight size={16} className="text-muted group-hover:text-ink transition" />
                </div>
              </Link>
            </div>

            {/* Standard drawer links */}
            {DRAWER_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  "text-sm text-body py-2.5 border-b border-line last:border-0 hover:text-brand transition duration-150 font-medium active:scale-[0.98]",
                  link.label === "Log Out" && "text-brand font-bold border-0 mt-4 hover:text-brand-dark"
                )}
              >
                {link.label}
              </Link>
            ))}
          </aside>
        </div>
      )}
    </>
  );
}
