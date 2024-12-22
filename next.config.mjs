/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      "rpc-websockets/dist/lib/client.cjs": false,
      "rpc-websockets/dist/lib/client/websocket.cjs": false,
      "./dist/lib/client.cjs": false,
      "./dist/lib/client/websocket.cjs": false
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      '@ellipsis-labs/phoenix-sdk/node_modules/@solana/web3.js': '@solana/web3.js'
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