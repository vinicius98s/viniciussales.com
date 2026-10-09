import { NextConfig } from "next";

const cmsUrl = process.env.CMS_URL ? new URL(process.env.CMS_URL) : null;

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    // Post images are uploaded to the CMS and optimized by next/image.
    remotePatterns: cmsUrl
      ? [
          {
            protocol: cmsUrl.protocol.replace(":", "") as "http" | "https",
            hostname: cmsUrl.hostname,
            port: cmsUrl.port,
            pathname: "/**",
          },
        ]
      : [],
    // Lets a CMS running on localhost serve images during development.
    dangerouslyAllowLocalIP: process.env.NODE_ENV === "development",
  },
  // Writing and Contact are now sections of the homepage.
  async redirects() {
    return [
      { source: "/writing", destination: "/#writing", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
    ];
  },
};

export default config;
