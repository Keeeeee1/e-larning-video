/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeFonts: false,
  },
  images: {
    domains: ['img.youtube.com'],
  },
};

export default nextConfig;
