import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://rdtutjzejojnhpcmyqqx.supabase.co/**")],
  },
};

export default nextConfig;
