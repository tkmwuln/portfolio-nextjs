import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/admin',
        destination: '/dashboard',
        permanent: true,
      },
      {
        source: '/admin/login',
        destination: '/login',
        permanent: true,
      },
      {
        source: '/admin/projects',
        destination: '/dashboard/projects',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
