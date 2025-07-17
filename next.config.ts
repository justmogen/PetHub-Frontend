import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "your-backend-domain.com", // Replace with actual domain when deployed
        port: "",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
