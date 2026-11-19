"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, ShieldCheck, Truck, CreditCard } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { user } from "@/data/user";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, clearCart } = useCart();
  const [step, setStep] = useState("review"); // review -> payment -> complete
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [orderNumber, setOrderNumber] = useState("");

  const finalTotal = subtotal;

  const handlePlaceOrder = () => {
    const generatedId = `VU-${Math.floor(24620 + Math.random() * 900)}`;
    setOrderNumber(generatedId);
    setStep("complete");
    clearCart();
  };

  if (step === "complete") {
    return (
      <div className="mx-auto w-full max-w-lg px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-success-tint text-success mx-auto flex items-center justify-center border border-success/30">
          <CheckCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-ink tracking-tight">
          Order Placed Successfully!
        </h1>
        <p className="text-sm text-muted">
          Your order <span className="font-bold text-ink">#{orderNumber}</span> has been confirmed. You will receive an SMS and email update shortly.
        </p>
        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/orders"
            className="px-6 py-2.5 rounded-btn bg-brand text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-dark transition shadow-soft"
          >
            Track Order
          </Link>
          <Link
            href="/shop"
            className="px-6 py-2.5 rounded-btn border border-line-strong bg-surface text-ink font-bold text-xs uppercase tracking-wider hover:bg-tile transition shadow-soft"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 md:px-6 lg:px-10 py-6 md:py-10 space-y-6">
      <div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-xs font-semibold text-muted hover:text-ink transition"
        >
          <ArrowLeft size={16} />
          Return to cart
        </Link>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Form: Delivery Address & Payment Method */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-surface border border-line rounded-card p-5 md:p-6 space-y-3 shadow-soft">
            <div className="flex items-center justify-between border-b border-line pb-2.5">
              <h2 className="text-base font-bold text-ink flex items-center gap-2">
                <Truck size={18} className="text-brand" />
                Delivery Address
              </h2>
              <span className="text-xs font-semibold text-brand">Verified</span>
            </div>
            <p className="text-sm font-bold text-ink">{user.address.name}</p>
            <p className="text-xs text-muted leading-relaxed">
              {user.address.full}
            </p>
            <p className="text-xs text-muted">Phone: {user.phone}</p>
          </div>

          {/* Payment Method */}
          <div className="bg-surface border border-line rounded-card p-5 md:p-6 space-y-4 shadow-soft">
            <h2 className="text-base font-bold text-ink flex items-center gap-2 border-b border-line pb-2.5">
              <CreditCard size={18} className="text-brand" />
              Select Payment Method
            </h2>

            <div className="space-y-2.5">
              {[
                { id: "upi", label: "UPI (Google Pay, PhonePe, Paytm)", note: "Instant confirmation" },
                { id: "card", label: "Credit / Debit Card", note: "Visa, Mastercard, RuPay" },
                { id: "cod", label: "Cash on Delivery (Doorstep Fit & Pay)", note: "Pay after trial" },
              ].map((m) => (
                <label
                  key={m.id}
                  className={`flex items-start gap-3 p-3 rounded-[10px] border cursor-pointer transition ${
                    paymentMethod === m.id
                      ? "border-brand bg-brand-tint"
                      : "border-line bg-surface hover:bg-tile"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={m.id}
                    checked={paymentMethod === m.id}
                    onChange={() => setPaymentMethod(m.id)}
                    className="mt-1 accent-brand"
                  />
                  <div>
                    <span className="text-xs font-bold text-ink">{m.label}</span>
                    <p className="text-[11px] text-muted">{m.note}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Summary */}
        <div className="space-y-4">
          <div className="bg-surface border border-line rounded-card p-5 md:p-6 space-y-4 shadow-soft">
            <h3 className="text-base font-bold text-ink border-b border-line pb-3">
              Order Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-muted">
                <span>Items Subtotal</span>
                <span className="text-ink font-semibold">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Shipping</span>
                <span className="text-success font-bold uppercase">FREE</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Guarantee & Insurance</span>
                <span className="text-ink font-semibold">₹0</span>
              </div>
            </div>

            <div className="pt-3 border-t border-line flex items-baseline justify-between">
              <span className="text-base font-bold text-ink">Total to Pay</span>
              <span className="text-xl font-bold text-ink font-tabular">
                ₹{finalTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              type="button"
              onClick={handlePlaceOrder}
              className="w-full py-3 px-6 rounded-btn bg-brand text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-dark transition duration-150 active:scale-[0.98] shadow-soft"
            >
              PLACE ORDER · ₹{finalTotal.toLocaleString("en-IN")}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted pt-2">
              <ShieldCheck size={14} className="text-brand" />
              <span>100% Encrypted & Authentic Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
