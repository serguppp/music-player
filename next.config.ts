import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-images.dzcdn.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
