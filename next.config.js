/** @type {import('next').NextConfig} */

const STORAGE_URL = process.env.CLIENT_STORAGE_DOMAIN || "";
const envVariables = Object.keys(process.env).reduce((prev, next) => {
  if (next.startsWith("CLIENT_")) {
    return {
      ...prev,
      [next]: process.env[next],
    };
  }
  return prev;
}, {});

const nextConfig = {
  reactStrictMode: true,
  env: envVariables,
  async rewrites() {
    const STORAGE_URL = process.env.CLIENT_STORAGE_DOMAIN || "";
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
