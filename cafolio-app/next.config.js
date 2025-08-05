/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rdtutjzejojnhpcmyqqx.supabase.co',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
