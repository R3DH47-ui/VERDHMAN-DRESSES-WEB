import { isMockMode, apiClient, createSuccessResponse } from "./apiClient";
import { products, categories, recommendedForUser } from "@/data/products";

/**
 * DTO Mapper: Transforms backend product schema to frontend UI schema
 */
export function mapProductDTO(raw) {
  if (!raw) return null;
  return {
    id: String(raw.id || raw.product_id || raw._id),
    name: raw.name || raw.title || "",
    shortName: raw.shortName || raw.short_name || raw.name || "",
    category: raw.category || "shirts",
    price: typeof raw.price === "number" ? raw.price : Number.parseFloat(raw.price || 0),
    mrp: typeof raw.mrp === "number" ? raw.mrp : Number.parseFloat(raw.mrp || raw.original_price || raw.price || 0),
    image: raw.image || raw.image_url || "/images/products/shirt-oxford-1.jpg",
    schoolBadges: raw.schoolBadges || raw.school_badges || (raw.school ? [raw.school] : []),
    rating: raw.rating != null ? Number(raw.rating) : 4.8,
    reviewsCount: raw.reviewsCount || raw.reviews_count || 120,
    sizes: raw.sizes || ["28", "30", "32", "34", "36"],
    description: raw.description || "",
    features: raw.features || [],
    specs: raw.specs || raw.specifications || {},
    fabric: raw.fabric || "",
    care: raw.care || "",
  };
}

export const productService = {
  async getProducts(params = {}) {
    if (isMockMode()) {
      let result = [...products];
      if (params.category && params.category !== "all") {
        result = result.filter((p) => p.category === params.category);
      }
      if (params.query) {
        const q = params.query.toLowerCase().trim();
        result = result.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.schoolBadges?.some((b) => b.toLowerCase().includes(q))
        );
      }
      return createSuccessResponse(result.map(mapProductDTO));
    }

    const queryParams = new URLSearchParams(params).toString();
    const suffix = queryParams ? `?${queryParams}` : "";
    const endpoint = `products${suffix}`;
    const res = await apiClient.get(endpoint);
    if (res.success && Array.isArray(res.data)) {
      return createSuccessResponse(res.data.map(mapProductDTO));
    }
    return res;
  },

  async getProductById(id) {
    if (isMockMode()) {
      const found = products.find((p) => String(p.id) === String(id));
      return createSuccessResponse(found ? mapProductDTO(found) : null);
    }
    const res = await apiClient.get(`products/${id}`);
    if (res.success && res.data) {
      return createSuccessResponse(mapProductDTO(res.data));
    }
    return res;
  },

  async getCategories() {
    if (isMockMode()) {
      return createSuccessResponse(categories);
    }
    return apiClient.get("categories");
  },

  async getRecommendedProducts(user) {
    if (isMockMode()) {
      return createSuccessResponse(recommendedForUser.map(mapProductDTO));
    }
    const res = await apiClient.get("products/recommended");
    if (res.success && Array.isArray(res.data)) {
      return createSuccessResponse(res.data.map(mapProductDTO));
    }
    return res;
  },
};
