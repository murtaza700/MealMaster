/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    domains: ["www.themealdb.com"], // Allow external images
  },
};

export default nextConfig;