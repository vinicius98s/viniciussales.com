import { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  // Writing and Contact are now sections of the homepage.
  async redirects() {
    return [
      { source: "/writing", destination: "/#writing", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default config;
