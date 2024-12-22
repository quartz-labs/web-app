/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Fallbacks for Node.js modules
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
      '@ellipsis-labs/phoenix-sdk/node_modules/@solana/web3.js': '@solana/web3.js',
      '@drift-labs/sdk/lib/node/adminClient.js': false,
      '@drift-labs/sdk/lib/node/index.js': false
    };

    // Ensure Node.js modules are excluded from the build
    config.module = {
      ...config.module,
      exprContextCritical: false,
      rules: [
        ...config.module.rules,
        {
          test: /node[/\\].*\.js$/,
          resolve: {
            fallback: {
              fs: false,
              net: false,
              tls: false,
              crypto: false
            }
          }
        }
      ]
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