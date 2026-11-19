"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

const QUICK_LINKS = [
  { href: "/shop", label: "Shop All" },
  { href: "/schools", label: "Schools Directory" },
  { href: "/orders", label: "Track Orders" },
  { href: "#", label: "Exchange Policy" },
  { href: "#", label: "Contact Us" },
];

const emptySubscribe = () => () => {};
const getClientYear = () => new Date().getFullYear();
const getServerYear = () => 2026;

export default function Footer() {
  const year = useSyncExternalStore(emptySubscribe, getClientYear, getServerYear);
  return (
    <footer className="hidden md:block bg-surface border-t border-line text-body mt-auto">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand block */}
          <div>
            <div className="flex flex-col leading-tight mb-4">
              <span className="text-brand text-2xl font-bold tracking-tight">Vardhman</span>
              <span className="text-muted text-[10px] uppercase tracking-widest font-semibold">
                School Uniforms
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              Since 1979 · Official supplier for 80+ institutions across North India.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-body hover:text-brand transition duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpline */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted mb-4">
              Helpline
            </h3>
            <a
              href="tel:18002001979"
              className="inline-flex items-center gap-2 text-lg font-semibold text-ink hover:text-brand transition duration-150"
            >
              <Phone size={18} strokeWidth={1.5} className="text-brand" />
              1800-200-1979
            </a>
            <p className="text-muted text-xs mt-2">
              Toll-free · Mon–Sat, 9 AM – 7 PM
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-line flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs font-tabular" suppressHydrationWarning>
            © {year} Vardhman School Uniforms. All rights reserved.
          </p>
          <p className="text-muted text-xs text-center">
            Official supplier for 80+ premier educational institutions across North India
          </p>
        </div>
      </div>
    </footer>
  );
}
