/**
 * Currency, date and pricing helpers for Vardhman School Uniforms
 */

/**
 * Format a number as Indian Rupee string (e.g., ₹1,650)
 * @param {number} amount
 * @returns {string}
 */
export function formatPrice(amount) {
  if (amount == null || isNaN(amount)) return "₹0";
  return `₹${Math.round(amount).toLocaleString("en-IN")}`;
}

/**
 * Calculate discount percentage and absolute savings between selling price and MRP
 * @param {number} price
 * @param {number} mrp
 * @returns {{ savings: number, discountPercent: number, hasDiscount: boolean }}
 */
export function calculateSavings(price, mrp) {
  if (!mrp || mrp <= price) {
    return { savings: 0, discountPercent: 0, hasDiscount: false };
  }
  const savings = mrp - price;
  const discountPercent = Math.round((savings / mrp) * 100);
  return {
    savings,
    discountPercent,
    hasDiscount: true,
  };
}

/**
 * Format date string into "14 Nov 2026" format (en-IN)
 * @param {string|Date} dateInput
 * @returns {string}
 */
export function formatDateEnIn(dateInput) {
  if (!dateInput) return "";
  try {
    const d = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(d.getTime())) return String(dateInput);
    const day = d.getDate();
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  } catch {
    return String(dateInput);
  }
}
