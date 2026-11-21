/**
 * Unified API Client for Vardhman School Uniforms
 * 
 * Supports environment switch:
 * - NEXT_PUBLIC_USE_MOCK_DATA / EXPO_PUBLIC_USE_MOCK_DATA (default: true)
 * - NEXT_PUBLIC_API_BASE_URL / EXPO_PUBLIC_API_BASE_URL (default: "/api")
 */

const USE_MOCK_DATA =
  (typeof process !== "undefined" &&
    (process.env.NEXT_PUBLIC_USE_MOCK_DATA ??
      process.env.EXPO_PUBLIC_USE_MOCK_DATA)) !== "false";

const API_BASE_URL =
  (typeof process !== "undefined" &&
    (process.env.NEXT_PUBLIC_API_BASE_URL ??
      process.env.EXPO_PUBLIC_API_BASE_URL)) ||
  "/api";

export function isMockMode() {
  return USE_MOCK_DATA;
}

export function getApiBaseUrl() {
  return API_BASE_URL;
}

/**
 * Standard Error Envelope
 */
export function createErrorResponse(message, status = 500, code = "API_ERROR") {
  return {
    success: false,
    data: null,
    error: {
      message: message || "An unexpected error occurred",
      status,
      code,
    },
  };
}

/**
 * Standard Success Envelope
 */
export function createSuccessResponse(data) {
  return {
    success: true,
    data,
    error: null,
  };
}

/**
 * Central request dispatcher
 */
export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL.replace(/\/$/, "")}/${endpoint.replace(/^\//, "")}`;
  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      return createErrorResponse(
        errorBody.message || `Request failed with status ${response.status}`,
        response.status,
        `HTTP_${response.status}`
      );
    }
    const data = await response.json();
    return createSuccessResponse(data);
  } catch (err) {
    return createErrorResponse(
      err.message || "Network request failed",
      0,
      "NETWORK_ERROR"
    );
  }
}

export const apiClient = {
  get: (endpoint, options) => apiRequest(endpoint, { method: "GET", ...options }),
  post: (endpoint, body, options) =>
    apiRequest(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    }),
  put: (endpoint, body, options) =>
    apiRequest(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    }),
  delete: (endpoint, options) =>
    apiRequest(endpoint, { method: "DELETE", ...options }),
};
