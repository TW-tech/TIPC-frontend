import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds (if needed)
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      // Add 'drive.google.com' to allow Next.js to load images from this host
      'drive.google.com', 
      
      // If you're using other image hosts, they must be listed here too.
      // e.g., 'storage.googleapis.com' for GCS
    ],
  },
};

export default nextConfig;
