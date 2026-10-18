/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/learn/tools', destination: '/tools', permanent: true },
      { source: '/learn/templates', destination: '/templates', permanent: true },
      { source: '/learn/borrowhub', destination: '/borrowhub', permanent: true },
      { source: '/learn/glossary', destination: '/glossary', permanent: true },
      { source: '/learn/faq', destination: '/faq', permanent: true },
      { source: '/learn/about', destination: '/about', permanent: true },
      { source: '/learn/start', destination: '/start', permanent: true },
      { source: '/learn/diagrams', destination: '/diagrams', permanent: true },
    ];
  },
};

export default nextConfig;
