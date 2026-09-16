import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jjpmkukccvqkonvpxrgz.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
