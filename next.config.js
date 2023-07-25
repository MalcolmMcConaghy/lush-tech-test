/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unicorn-staging.eu.saleor.cloud",
      },
    ],
  },
};

module.exports = nextConfig;
