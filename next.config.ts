import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This tells Next.js/Turbopack to leave the SDK alone
  serverExternalPackages: ['node-appwrite'],
};

export default nextConfig;