import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Allow GIFs and other formats
    remotePatterns: [],
  },
};

export default nextConfig;
