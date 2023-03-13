/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  resolve: {
    fallback: {
      fs: false,
    },
  },
};

module.exports = nextConfig;
