import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Note: Keeping Unsplash remote pattern temporarily in case other components still use external images
    // Remove this configuration once all images are migrated to local storage
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
