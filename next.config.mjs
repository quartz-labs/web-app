/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false
      };
      return config;
    },
    env: {
      NEXT_PUBLIC_REQUIRE_BETA_KEY: process.env.NEXT_PUBLIC_REQUIRE_BETA_KEY,
    },
    rewrites: async () => {
      return [
        {
          source: '/api/:path*',
          destination: 'https://api.quartzpay.io/:path*'
        }
      ]
    }
  };
  
  export default nextConfig;