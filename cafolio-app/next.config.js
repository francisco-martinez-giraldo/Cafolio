/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rdtutjzejojnhpcmyqqx.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cafolio.vercel.app',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
