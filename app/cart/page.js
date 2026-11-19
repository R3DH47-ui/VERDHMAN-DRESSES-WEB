"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MapPin, Tag, ArrowRight, ShoppingBag, Trash2, Heart } from "lucide-react";
import QtyStepper from "@/components/ui/QtyStepper";
import ProductImage from "@/components/ui/ProductImage";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useProfile } from "@/context/ProfileContext";
import { user } from "@/data/user";
import { products } from "@/data/products";
import { formatPrice, calculateSavings } from "@/lib/format";

export default function CartPage() {
  const { cart, setQty, removeFromCart, addToCart, subtotal, totalItems, savings } = useCart();
  const { toggleWishlist } = useWishlist();
  const { profile } = useProfile();

  const [voucherCode, setVoucherCode] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [voucherError, setVoucherError] = useState("");
  const [showVoucherInput, setShowVoucherInput] = useState(false);

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    if (voucherCode.trim().toUpperCase() === "WELCOME10") {
      const discount = Math.round(subtotal * 0.1);
      setVoucherDiscount(discount);
      setVoucherApplied(true);
      setVoucherError("");
    } else {
      setVoucherError("Invalid code. Try WELCOME10 for 10% off!");
    }
  };

  const finalTotal = Math.max(0, subtotal - voucherDiscount);
  const totalCalculatedSavings = Math.max(0, savings + voucherDiscount);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10 py-6 md:py-10 space-y-6 bg-paper text-ink">
      {/* Top Header Row */}
      <div className="flex items-center justify-between border-b border-line pb-3">
        <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
          My Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
        </h1>
        {totalCalculatedSavings > 0 && (
          <span className="text-xs md:text-sm font-semibold text-success bg-success-tint px-3 py-1 rounded-pill border border-green-200 font-tabular">
            Total Savings: {formatPrice(totalCalculatedSavings)}
          </span>
        )}
      </div>

      {/* Delivery Address Strip: white card with red pin and CHANGE link */}
      <div className="bg-surface border border-line rounded-card p-3 md:p-4 flex items-center justify-between shadow-soft">
        <div className="flex items-center gap-2.5 min-w-0">
          <MapPin size={18} className="text-brand shrink-0" />
          <p className="text-xs md:text-sm text-ink truncate">
            Deliver to <span className="font-bold">{profile?.address?.name || profile?.name || user.address.name}</span>,{" "}
            <span className="text-muted">{profile?.address?.line || user.address.line}</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert(`Address: ${user.address.full}`)}
          className="text-xs font-bold text-brand uppercase tracking-wider hover:text-brand-dark hover:underline shrink-0 ml-3"
        >
          Change
        </button>
      </div>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => {
              const itemTotal = item.price * item.qty;
              const { discountPercent, hasDiscount } = calculateSavings(item.price, item.mrp);

              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="bg-surface border border-line rounded-card p-4 md:p-5 flex flex-col justify-between gap-4 shadow-soft hover:shadow-card hover:border-line-strong transition duration-200"
                >
                  <div className="flex gap-4">
                    {/* Item Thumbnail: sits on bg-tile with border-line */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 bg-tile rounded-btn overflow-hidden shrink-0 border border-line">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h2 className="text-sm md:text-base font-bold text-ink leading-snug">
                            {item.name}
                          </h2>
                          <p className="text-xs text-muted mt-0.5">
                            {item.school || "Prescribed School Uniform"} · Size {item.size}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="font-bold text-sm md:text-base text-ink font-tabular">
                            {formatPrice(itemTotal)}
                          </span>
                          {item.qty > 1 && (
                            <p className="text-[11px] text-muted font-tabular">
                              ({formatPrice(item.price)} each)
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Discounts & ETA */}
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                        {hasDiscount && (
                          <span className="px-1.5 py-0.5 rounded-sm bg-success-tint text-success font-semibold text-[10px] border border-green-200 font-tabular">
                            {discountPercent}% off
                          </span>
                        )}
                        <span className="text-[11px] text-muted">
                          Delivery by <span className="font-semibold text-ink">Tue, 17 Nov</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Stepper & Actions */}
                  <div className="pt-3 border-t border-line flex flex-wrap items-center justify-between gap-3">
                    <QtyStepper
                      value={item.qty}
                      onChange={(newQty) => setQty(item.id, item.size, newQty)}
                      size="sm"
                    />

                    <div className="flex items-center gap-3 text-xs font-semibold">
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-muted hover:text-brand transition flex items-center gap-1"
                      >
                        <Trash2 size={13} />
                        Remove
                      </button>
                      <span className="text-line">|</span>
                      <button
                        type="button"
                        onClick={() => {
                          toggleWishlist(item);
                          removeFromCart(item.id, item.size);
                        }}
                        className="text-muted hover:text-brand transition flex items-center gap-1"
                      >
                        <Heart size={13} />
                        Move to Wishlist
                      </button>
                      <span className="text-line">|</span>
                      <Link
                        href="/checkout"
                        className="text-brand hover:underline font-bold"
                      >
                        Buy now
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Price Details Card (strictly unclipped, full height) */}
          <div className="lg:sticky lg:top-24 space-y-4">
            <div className="bg-surface border border-line rounded-card p-5 md:p-6 space-y-4 shadow-soft">
              <h2 className="text-lg font-bold text-ink border-b border-line pb-3">
                Price Details
              </h2>

              <div className="space-y-2.5 text-xs md:text-sm">
                <div className="flex justify-between text-muted">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="text-ink font-medium font-tabular">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-muted">
                  <span>Delivery</span>
                  <span className="text-success font-bold uppercase">FREE</span>
                </div>

                {voucherApplied && (
                  <div className="flex justify-between text-success font-medium">
                    <span>Voucher Discount (WELCOME10)</span>
                    <span className="font-tabular">-{formatPrice(voucherDiscount)}</span>
                  </div>
                )}
              </div>

              {/* Voucher Apply Block */}
              <div className="pt-3 border-t border-line">
                {!showVoucherInput && !voucherApplied ? (
                  <button
                    type="button"
                    onClick={() => setShowVoucherInput(true)}
                    className="flex items-center justify-between w-full text-xs font-semibold text-brand hover:text-brand-dark hover:underline"
                  >
                    <span className="flex items-center gap-1.5">
                      <Tag size={14} />
                      Apply voucher
                    </span>
                    <span>›</span>
                  </button>
                ) : (
                  <form onSubmit={handleApplyVoucher} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                        placeholder="Try: WELCOME10"
                        className="flex-1 bg-surface border border-line rounded-btn px-3 py-1.5 text-xs uppercase font-bold outline-none focus:border-brand text-ink"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-btn bg-ink text-white text-xs font-bold uppercase hover:bg-brand transition"
                      >
                        Apply
                      </button>
                    </div>
                    {voucherError && (
                      <p className="text-[11px] text-brand font-medium">{voucherError}</p>
                    )}
                    {voucherApplied && (
                      <p className="text-[11px] text-success font-bold">
                        ✓ 10% coupon applied!
                      </p>
                    )}
                  </form>
                )}
              </div>

              {/* Total Amount */}
              <div className="pt-3 border-t border-line flex items-baseline justify-between">
                <span className="text-base font-bold text-ink">
                  Total
                </span>
                <span className="text-xl font-bold text-ink font-tabular">
                  {formatPrice(finalTotal)}
                </span>
              </div>

              {/* Red PROCEED TO CHECKOUT Button */}
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-btn bg-brand text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition duration-150 active:scale-[0.98] shadow-md"
              >
                PROCEED TO CHECKOUT
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-20 bg-surface border border-line rounded-card p-8 shadow-soft">
          <ShoppingBag size={48} className="mx-auto text-muted mb-3" />
          <h2 className="text-xl font-bold text-ink">Your cart is empty</h2>
          <p className="text-xs md:text-sm text-muted mt-1 max-w-sm mx-auto">
            Browse our authorized school catalog to add official shirts, trousers, and skirts.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-6 px-6 py-2.5 rounded-btn bg-brand text-white text-xs font-bold uppercase tracking-wider hover:bg-brand-dark transition shadow-soft"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
