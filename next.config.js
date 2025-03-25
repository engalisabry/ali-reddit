/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['uploadthing.com', 'lh3.googleusercontent.com', 'cln0xzcfw1.ufs.sh'],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
