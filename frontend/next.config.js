/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS.split(','),
  },
};

module.exports = nextConfig;
