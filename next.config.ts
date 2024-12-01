import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    productionBrowserSourceMaps: true,
    output: 'export',
    images: {
        unoptimized: true,
    },
};


export default nextConfig;
