"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Scissors, CheckCircle, Package, Truck, RotateCcw } from "lucide-react";
import Tabs from "@/components/ui/Tabs";
import Badge from "@/components/ui/Badge";
import OrderStepper from "@/components/ui/OrderStepper";
import { orders } from "@/data/orders";
import { formatPrice } from "@/lib/format";

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("ongoing");

  // Dynamic order tabs with live counts
  const dynamicOrderTabs = useMemo(() => {
    const ongoingCount = orders.filter(
      (o) => o.status === "out-for-delivery" || o.status === "packed" || o.status === "shipped" || o.status === "placed"
    ).length;
    const deliveredCount = orders.filter((o) => o.status === "delivered").length;
    const cancelledCount = orders.filter((o) => o.status === "cancelled").length;

    return [
      { id: "ongoing", label: `ONGOING (${ongoingCount})` },
      { id: "delivered", label: `DELIVERED (${deliveredCount})` },
      { id: "cancelled", label: `CANCELLED (${cancelledCount})` },
    ];
  }, []);

  const activeOrdersCount = useMemo(() => {
    return orders.filter(
      (o) => o.status === "out-for-delivery" || o.status === "packed" || o.status === "shipped" || o.status === "placed"
    ).length;
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (activeTab === "ongoing") {
        return (
          order.status === "out-for-delivery" ||
          order.status === "packed" ||
          order.status === "shipped" ||
          order.status === "placed"
        );
      }
      if (activeTab === "delivered") {
        return order.status === "delivered";
      }
      if (activeTab === "cancelled") {
        return order.status === "cancelled";
      }
      return true;
    });
  }, [activeTab]);

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6 lg:px-10 py-6 md:py-10 space-y-6 bg-paper text-ink">
      {/* Page Title & Active Requests Pill */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-bold text-ink tracking-tight">
            My Orders
          </h1>
          <span className="px-2.5 py-0.5 rounded-pill bg-brand-tint text-brand border border-brand-line text-xs font-bold uppercase tracking-wide font-tabular">
            {activeOrdersCount} ACTIVE ORDERS
          </span>
        </div>
        <p className="text-xs md:text-sm text-muted">
          Track standard uniforms, tailoring dispatches, and exchange eligibility.
        </p>
      </div>

      {/* Status Tabs: ONGOING / DELIVERED / CANCELLED with live counts */}
      <div>
        <Tabs tabs={dynamicOrderTabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {/* Orders Grid (2 columns desktop, 1 column mobile) with equal height cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 items-stretch">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const isDelivered = order.status === "delivered";
            const isCancelled = order.status === "cancelled";
            const firstItem = order.items[0];

            return (
              <div
                key={order.id}
                className="bg-surface border border-line rounded-card p-4 md:p-6 flex flex-col justify-between gap-5 shadow-soft hover:shadow-card hover:border-line-strong transition duration-200 h-full"
              >
                {/* Header row: Order ID, status pill, formatted date */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-line">
                    <div>
                      <span className="text-sm md:text-base font-bold text-ink font-tabular">
                        Order #{order.id}
                      </span>
                      <p className="text-[11px] text-muted">
                        Placed on {order.formattedDate}
                      </p>
                    </div>

                    <Badge
                      variant={
                        isDelivered
                          ? "success"
                          : isCancelled
                          ? "neutral"
                          : order.status === "out-for-delivery"
                          ? "danger"
                          : "warning"
                      }
                      size="sm"
                    >
                      {order.statusLabel}
                    </Badge>
                  </div>

                  {/* Primary Item Thumbnail + Summary */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="relative w-16 h-16 bg-tile rounded-btn overflow-hidden shrink-0 border border-line">
                      <Image
                        src={firstItem.image}
                        alt={firstItem.name}
                        fill
                        className="object-cover p-1"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-xs md:text-sm text-ink truncate">
                        {firstItem.name}
                      </h3>
                      <p className="text-[11px] text-muted">
                        {firstItem.school || "Official Uniform"} · Size {firstItem.size}
                      </p>
                      {firstItem.note && (
                        <p className="text-[11px] font-semibold text-brand">
                          {firstItem.note}
                        </p>
                      )}
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-sm font-bold text-ink font-tabular">
                          {formatPrice(order.total)}
                        </span>
                        {order.moreItems > 0 && (
                          <span className="text-[11px] text-muted">
                            +{order.moreItems} more item{order.moreItems > 1 ? "s" : ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Stepper for ongoing orders */}
                  {!isDelivered && !isCancelled && order.tracking && (
                    <div className="mt-5 pt-3 border-t border-line">
                      <OrderStepper
                        current={order.tracking.current}
                        steps={order.tracking.steps}
                      />
                    </div>
                  )}

                  {/* Extra Status notes */}
                  <div className="mt-4 flex items-center justify-between text-xs text-muted">
                    <span className="font-medium text-ink flex items-center gap-1.5 truncate">
                      <Truck size={14} className="text-brand shrink-0" />
                      {order.tracking?.eta || "Standard Dispatch"}
                    </span>
                    <span className="flex items-center gap-1 text-success font-semibold shrink-0 ml-2">
                      <CheckCircle size={13} />
                      {order.payment}
                    </span>
                  </div>

                  {isDelivered && order.exchangeAvailable && (
                    <div className="mt-3 p-2 rounded-btn bg-tile text-[11px] text-muted border border-line flex items-center gap-1.5">
                      <RotateCcw size={13} className="text-brand" />
                      {order.exchangeAvailable}
                    </div>
                  )}

                  {isCancelled && order.note && (
                    <div className="mt-3 p-2 rounded-btn bg-tile text-[11px] text-muted border border-line">
                      {order.note}
                    </div>
                  )}
                </div>

                {/* Bottom Action Buttons */}
                <div className="pt-2 flex items-center gap-3 mt-auto">
                  {isDelivered ? (
                    <>
                      <button
                        type="button"
                        onClick={() => alert(`Reordering items from #${order.id}`)}
                        className="flex-1 py-2.5 px-4 rounded-btn bg-brand text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-dark transition duration-150 active:scale-[0.98]"
                      >
                        REORDER
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Exchange initiated for #${order.id}`)}
                        className="flex-1 py-2.5 px-4 rounded-btn border border-ink text-ink font-bold text-xs uppercase tracking-wider bg-surface hover:bg-tile transition duration-150 active:scale-[0.98]"
                      >
                        EXCHANGE
                      </button>
                    </>
                  ) : isCancelled ? (
                    <button
                      type="button"
                      onClick={() => alert(`Viewing cancellation invoice for #${order.id}`)}
                      className="w-full py-2.5 px-4 rounded-btn border border-ink text-ink font-bold text-xs uppercase tracking-wider bg-surface hover:bg-tile transition duration-150"
                    >
                      VIEW RECEIPT
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => alert(`Tracking live package #${order.id}`)}
                        className="flex-1 py-2.5 px-4 rounded-btn bg-brand text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-dark transition duration-150 active:scale-[0.98]"
                      >
                        TRACK ORDER
                      </button>
                      <button
                        type="button"
                        onClick={() => alert(`Viewing details for #${order.id}`)}
                        className="flex-1 py-2.5 px-4 rounded-btn border border-ink text-ink font-bold text-xs uppercase tracking-wider bg-surface hover:bg-tile transition duration-150 active:scale-[0.98]"
                      >
                        VIEW DETAILS
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full py-16 text-center bg-surface border border-line rounded-card p-8 shadow-soft">
            <Package size={36} className="mx-auto text-muted mb-2" />
            <h2 className="text-lg font-bold text-ink">No orders here</h2>
            <p className="text-xs text-muted mt-1">
              There are no orders matching this status tab.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Card: "Need fit adjustments?" */}
      <div className="bg-surface border border-line rounded-card p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft hover:shadow-card transition duration-200">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-brand-tint text-brand flex items-center justify-center shrink-0 border border-brand-line">
            <Scissors size={20} strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="text-base font-bold text-ink">
              Need fit adjustments?
            </h2>
            <p className="text-xs text-muted">
              Visit any Vardhman master store or request home tailor pickup for sleeve hems and waist fitting.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => alert("Tailor pickup request scheduled!")}
          className="w-full sm:w-auto shrink-0 px-4 py-2 rounded-btn border border-ink text-ink text-xs font-bold uppercase tracking-wider bg-surface hover:bg-tile transition"
        >
          Book Master Tailor
        </button>
      </div>
    </div>
  );
}
