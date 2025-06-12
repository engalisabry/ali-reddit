/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'uploadthing.com',
      'lh3.googleusercontent.com',
      'cln0xzcfw1.ufs.sh',
    ],
    unoptimized: process.env.NODE_ENV === 'production', // For Netlify compatibility
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        child_process: false,
        fs: false,
        os: false,
        path: false,
        process: false,
        timers: false,
        stream: false,
        crypto: false,
      };
    }
    
    // Add this to help with prisma binary loading in serverless environments
    if (isServer) {
      config.externals = [...config.externals, '.prisma/client', 'prisma'];
    }
    
    return config;
  },
  // Enable more detailed error reporting in production
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 4,
  },
  poweredByHeader: false,
};

module.exports = nextConfig;
