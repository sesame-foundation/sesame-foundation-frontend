/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/decentralized-factoring-challenge",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
