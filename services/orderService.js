import { isMockMode, apiClient, createSuccessResponse } from "./apiClient";
import { orders } from "@/data/orders";

/**
 * DTO Mapper: Transforms backend order schema to frontend UI schema
 */
export function mapOrderDTO(raw) {
  if (!raw) return null;
  const parsedTotal = typeof raw.total === "number" ? raw.total : Number.parseFloat(raw.total || 0);
  return {
    id: String(raw.id || raw.order_id),
    date: raw.date || raw.created_at || new Date().toISOString(),
    status: raw.status || "placed",
    statusLabel: raw.statusLabel || raw.status_label || "Order Placed",
    total: parsedTotal,
    items: Array.isArray(raw.items) ? raw.items : [],
    deliveryDate: raw.deliveryDate || raw.delivery_date || "",
    tracking: raw.tracking || {
      courier: "Vardhman Express",
      number: `TRK-${raw.id || "001"}`,
    },
    shippingAddress: raw.shippingAddress || raw.shipping_address || null,
    paymentMethod: raw.paymentMethod || raw.payment_method || "upi",
  };
}

export const orderService = {
  async getOrders(params = {}) {
    if (isMockMode()) {
      let result = [...orders];
      if (params.status && params.status !== "all") {
        result = result.filter((o) => o.status === params.status);
      }
      return createSuccessResponse(result.map(mapOrderDTO));
    }

    const queryParams = new URLSearchParams(params).toString();
    const suffix = queryParams ? `?${queryParams}` : "";
    const endpoint = `orders${suffix}`;
    const res = await apiClient.get(endpoint);
    if (res.success && Array.isArray(res.data)) {
      return createSuccessResponse(res.data.map(mapOrderDTO));
    }
    return res;
  },

  async getOrderById(id) {
    if (isMockMode()) {
      const found = orders.find((o) => String(o.id) === String(id));
      return createSuccessResponse(found ? mapOrderDTO(found) : null);
    }
    const res = await apiClient.get(`orders/${id}`);
    if (res.success && res.data) {
      return createSuccessResponse(mapOrderDTO(res.data));
    }
    return res;
  },

  async createOrder(payload) {
    if (isMockMode()) {
      const generatedId = `VU-${Math.floor(24620 + Math.random() * 900)}`;
      const newOrder = {
        id: generatedId,
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        status: "placed",
        statusLabel: "Order Placed",
        total: payload.total || 0,
        items: payload.items || [],
        paymentMethod: payload.paymentMethod || "upi",
        deliveryDate: "Expected in 2-3 business days",
      };
      return createSuccessResponse(mapOrderDTO(newOrder));
    }
    const res = await apiClient.post("orders", payload);
    if (res.success && res.data) {
      return createSuccessResponse(mapOrderDTO(res.data));
    }
    return res;
  },
};
