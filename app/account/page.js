"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Package,
  Heart,
  User,
  MapPin,
  Globe,
  Bell,
  Shield,
  Smartphone,
  ChevronRight,
  LogOut,
  Pencil,
} from "lucide-react";
import { orders } from "@/data/orders";
import { useWishlist } from "@/context/WishlistContext";
import { useProfile } from "@/context/ProfileContext";
import ProfileModal from "@/components/profile/ProfileModal";

export default function AccountPage() {
  const { wishlist } = useWishlist();
  const { profile } = useProfile();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const activeOrdersCount = orders.filter(
    (o) =>
      o.status === "out-for-delivery" ||
      o.status === "packed" ||
      o.status === "shipped" ||
      o.status === "placed"
  ).length;

  const handleLogout = () => {
    if (confirm("Are you sure you want to log out of Vardhman School Uniforms?")) {
      alert("Logged out successfully.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10 py-6 md:py-10 space-y-6">
      {/* Desktop 2-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Left Column: Profile Card + Quick Tiles */}
        <div className="space-y-4">
          {/* Profile Card with Pencil Edit Button */}
          <div className="relative bg-surface border border-line rounded-card p-6 flex flex-col items-center text-center shadow-soft">
            {/* Pencil button */}
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              aria-label="Edit Profile"
              className="absolute top-4 right-4 w-8 h-8 rounded-full border border-line bg-surface hover:bg-tile text-muted hover:text-brand flex items-center justify-center transition shadow-xs"
            >
              <Pencil size={14} />
            </button>

            {/* Circular Avatar */}
            <div className="w-20 h-20 rounded-full bg-brand text-white text-2xl font-bold flex items-center justify-center ring-4 ring-brand-tint shadow-soft mb-3">
              {profile.initial || "R"}
            </div>

            <h1 className="text-xl md:text-2xl font-bold text-ink tracking-tight">
              Hey, {profile.name}
            </h1>
            <p className="text-xs text-muted mt-1 font-tabular">{profile.phone}</p>
            <p className="text-xs text-muted">{profile.email}</p>

            <div className="mt-4 pt-3 border-t border-line w-full text-xs text-muted">
              Linked schools:{" "}
              <span className="font-semibold text-ink">
                {(profile.linkedSchools || []).join(", ")}
              </span>
            </div>
          </div>

          {/* Quick Action Tiles: My Orders & My Wishlist */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/orders"
              className="bg-surface border border-line rounded-card p-4 flex flex-col items-center text-center hover:border-brand hover:shadow-card transition duration-150 group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-tint text-brand flex items-center justify-center mb-2 group-hover:scale-105 transition">
                <Package size={20} strokeWidth={1.8} />
              </div>
              <span className="text-xs md:text-sm font-bold text-ink">
                My Orders
              </span>
              <span className="text-[10px] text-brand font-semibold mt-0.5 font-tabular">
                {activeOrdersCount} active
              </span>
            </Link>

            <Link
              href="/wishlist"
              className="bg-surface border border-line rounded-card p-4 flex flex-col items-center text-center hover:border-brand hover:shadow-card transition duration-150 group"
            >
              <div className="w-10 h-10 rounded-full bg-brand-tint text-brand flex items-center justify-center mb-2 group-hover:scale-105 transition">
                <Heart size={20} strokeWidth={1.8} />
              </div>
              <span className="text-xs md:text-sm font-bold text-ink">
                My Wishlist
              </span>
              <span className="text-[10px] text-brand font-semibold mt-0.5 font-tabular">
                {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
              </span>
            </Link>
          </div>
        </div>

        {/* Right Column: Settings Groups */}
        <div className="lg:col-span-2 space-y-5">
          {/* Group 1: Profile Settings */}
          <div className="bg-surface border border-line rounded-card p-4 md:p-6 shadow-soft">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
              Profile settings
            </h2>

            <div className="divide-y divide-line">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(true)}
                className="w-full py-3 flex items-center justify-between text-left hover:text-brand transition group"
              >
                <div className="flex items-center gap-3 text-ink group-hover:text-brand">
                  <User size={18} strokeWidth={1.5} className="text-muted group-hover:text-brand" />
                  <span className="text-sm font-medium">Edit profile</span>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </button>

              <button
                type="button"
                onClick={() => alert(`Saved addresses: ${profile.address?.full || profile.address?.line || "Ludhiana"}`)}
                className="w-full py-3 flex items-center justify-between text-left hover:text-brand transition group"
              >
                <div className="flex items-center gap-3 text-ink group-hover:text-brand">
                  <MapPin size={18} strokeWidth={1.5} className="text-muted group-hover:text-brand" />
                  <span className="text-sm font-medium">Saved addresses</span>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </button>

              <button
                type="button"
                onClick={() => alert("Language switcher: English (Default)")}
                className="w-full py-3 flex items-center justify-between text-left hover:text-brand transition group"
              >
                <div className="flex items-center gap-3 text-ink group-hover:text-brand">
                  <Globe size={18} strokeWidth={1.5} className="text-muted group-hover:text-brand" />
                  <span className="text-sm font-medium">Change language</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted">
                  <span>{profile.language || "English"}</span>
                  <ChevronRight size={16} />
                </div>
              </button>

              <button
                type="button"
                onClick={() => alert("Notification settings configured.")}
                className="w-full py-3 flex items-center justify-between text-left hover:text-brand transition group"
              >
                <div className="flex items-center gap-3 text-ink group-hover:text-brand">
                  <Bell size={18} strokeWidth={1.5} className="text-muted group-hover:text-brand" />
                  <span className="text-sm font-medium">Notification settings</span>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </button>
            </div>
          </div>

          {/* Group 2: Privacy & Security */}
          <div className="bg-surface border border-line rounded-card p-4 md:p-6 shadow-soft">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted mb-3">
              Privacy & security
            </h2>

            <div className="divide-y divide-line">
              <button
                type="button"
                onClick={() => alert("Privacy policy and institutional data agreements.")}
                className="w-full py-3 flex items-center justify-between text-left hover:text-brand transition group"
              >
                <div className="flex items-center gap-3 text-ink group-hover:text-brand">
                  <Shield size={18} strokeWidth={1.5} className="text-muted group-hover:text-brand" />
                  <span className="text-sm font-medium">Privacy center</span>
                </div>
                <ChevronRight size={16} className="text-muted" />
              </button>

              <button
                type="button"
                onClick={() => alert(`Active devices: ${profile.devices || 2} devices connected`)}
                className="w-full py-3 flex items-center justify-between text-left hover:text-brand transition group"
              >
                <div className="flex items-center gap-3 text-ink group-hover:text-brand">
                  <Smartphone size={18} strokeWidth={1.5} className="text-muted group-hover:text-brand" />
                  <span className="text-sm font-medium">Manage devices</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted">
                  <span>{profile.devices || 2} active devices</span>
                  <ChevronRight size={16} />
                </div>
              </button>
            </div>
          </div>

          {/* Red LOG OUT button */}
          <div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full py-3 px-6 rounded-btn bg-brand text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-dark transition duration-150 flex items-center justify-center gap-2 active:scale-[0.98] shadow-soft"
            >
              <LogOut size={16} />
              LOG OUT
            </button>
          </div>

          {/* Footer Version Notice */}
          <p className="text-center text-[11px] text-muted pt-2 font-tabular">
            Version 2.0.1 (Build 12) · Vardhman Uniforms since 1979
          </p>
        </div>
      </div>

      {/* Profile Edit Modal / Bottom Sheet */}
      {isEditModalOpen && (
        <ProfileModal onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
}
