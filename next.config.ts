import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js dev indicator (bottom-right watermark in dev mode)
  devIndicators: false,

  // Optimize images for production
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
