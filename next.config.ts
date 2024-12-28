import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // productionBrowserSourceMaps: true,
    // output: 'export',
    images: {
        unoptimized: true,
    },
    async rewrites() {
        return [
          {
            source: '/blog',
            destination: '/blog/index.html',
          },
        ];
      },
};


export default nextConfig;
