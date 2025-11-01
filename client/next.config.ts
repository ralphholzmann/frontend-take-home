import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,           // sets viewBox + 1em sizing semantics
              svgo: true,
              svgoConfig: {
                plugins: [{ name: "removeDimensions", active: true }],
              },
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
