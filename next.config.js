/** @type {import('next').NextConfig} */
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_DOMAIN || "";
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/images/:slug*",
        destination: `${STORAGE_URL}/images/:slug*`,
      },
      {
        source: "/temp/:slug*",
        destination: `${STORAGE_URL}/temp/:slug*`,
      },
    ];
  },
  images: {
    domains: [STORAGE_URL.replace("https://", "")],
  },
};

module.exports = nextConfig;
