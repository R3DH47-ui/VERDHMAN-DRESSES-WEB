import { isMockMode, apiClient, createSuccessResponse } from "./apiClient";
import { schools } from "@/data/schools";

/**
 * DTO Mapper: Transforms backend school schema to frontend UI schema
 */
export function mapSchoolDTO(raw) {
  if (!raw) return null;
  return {
    id: String(raw.id || raw.school_id || raw.slug),
    name: raw.name || "",
    slug: raw.slug || raw.id,
    location: raw.location || raw.city || "",
    board: raw.board || "CBSE",
    type: raw.type || "public",
    monogram: raw.monogram || raw.logo || "/images/schools/greenfield.png",
    classLevels: raw.classLevels || raw.class_levels || [
      "N", "LKG", "UKG", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
    ],
    uniformColors: raw.uniformColors || raw.uniform_colors || ["#1B3A5C", "#8B0000"],
    deliveryDays: raw.deliveryDays || raw.delivery_days || "2-3 Days",
    address: raw.address || "",
    studentCount: raw.studentCount || raw.student_count || 0,
  };
}

export const schoolService = {
  async getSchools(params = {}) {
    if (isMockMode()) {
      let result = [...schools];
      if (params.type && params.type !== "all") {
        result = result.filter((s) => s.type === params.type);
      }
      if (params.query) {
        const q = params.query.toLowerCase().trim();
        result = result.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.location.toLowerCase().includes(q) ||
            s.board.toLowerCase().includes(q)
        );
      }
      return createSuccessResponse(result.map(mapSchoolDTO));
    }

    const queryParams = new URLSearchParams(params).toString();
    const suffix = queryParams ? `?${queryParams}` : "";
    const endpoint = `schools${suffix}`;
    const res = await apiClient.get(endpoint);
    if (res.success && Array.isArray(res.data)) {
      return createSuccessResponse(res.data.map(mapSchoolDTO));
    }
    return res;
  },

  async getSchoolBySlug(slug) {
    if (isMockMode()) {
      const found = schools.find((s) => s.slug === slug);
      return createSuccessResponse(found ? mapSchoolDTO(found) : null);
    }
    const res = await apiClient.get(`schools/${slug}`);
    if (res.success && res.data) {
      return createSuccessResponse(mapSchoolDTO(res.data));
    }
    return res;
  },
};
