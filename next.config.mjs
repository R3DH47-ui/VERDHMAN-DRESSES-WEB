/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['10.82.83.176', '192.168.56.1', 'localhost', '127.0.0.1'],
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
