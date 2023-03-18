/** @type {import('next').NextConfig} */
const nextConfig = {
  resolve: {
    fallback: {
      fs: false,
    },
  },
};

module.exports = nextConfig;
