import { isMockMode, apiClient, createSuccessResponse } from "./apiClient";
import { user } from "@/data/user";

const DEFAULT_SCHOOLS = ["Sacred Heart Senior Secondary School", "DPS"];

function resolveLinkedSchools(raw) {
  if (Array.isArray(raw.linkedSchools)) return raw.linkedSchools;
  if (Array.isArray(raw.linked_schools)) return raw.linked_schools;
  return DEFAULT_SCHOOLS;
}

/**
 * DTO Mapper: Transforms backend user/profile schema to frontend UI schema
 */
export function mapUserDTO(raw) {
  if (!raw) return null;
  return {
    id: String(raw.id || raw.user_id || "user-001"),
    name: raw.name || "Rohan Sharma",
    email: raw.email || "rohan.sharma@example.com",
    phone: raw.phone || "+91 98765 43210",
    linkedSchools: resolveLinkedSchools(raw),
    savedAddresses: Array.isArray(raw.savedAddresses) ? raw.savedAddresses : [],
    avatar: raw.avatar || "",
  };
}

export const userService = {
  async getUserProfile() {
    if (isMockMode()) {
      return createSuccessResponse(mapUserDTO(user));
    }
    const res = await apiClient.get("user/profile");
    if (res.success && res.data) {
      return createSuccessResponse(mapUserDTO(res.data));
    }
    return res;
  },

  async updateUserProfile(profileData) {
    if (isMockMode()) {
      const updated = { ...user, ...profileData };
      return createSuccessResponse(mapUserDTO(updated));
    }
    const res = await apiClient.put("user/profile", profileData);
    if (res.success && res.data) {
      return createSuccessResponse(mapUserDTO(res.data));
    }
    return res;
  },
};
