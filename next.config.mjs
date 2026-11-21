/** @type {import('next').NextConfig} */
const rawDevOrigins = process.env.DEV_ALLOWED_ORIGINS || "";
const devOrigins = rawDevOrigins
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig = {
  allowedDevOrigins: devOrigins,
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
