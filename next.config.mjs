/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fallbacks for Node.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      "rpc-websockets/dist/lib/client.cjs": false,
      "rpc-websockets/dist/lib/client/websocket.cjs": false,
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      "@quartz-labs/sdk": "@quartz-labs/sdk/lib/node/index.browser.js"
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
      {
        source: "/ingest/decide",
        destination: "https://eu.i.posthog.com/decide",
      },
    ];
  }
};

export default nextConfig;