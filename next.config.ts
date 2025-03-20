import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  // webpack: (config, {webpack}) => {
  //   config.module.rules.push({
  //     test: /\.md$/,
  //     use: "raw-loader",
  //   });
  //   return config;
  // }
};

export default nextConfig;
