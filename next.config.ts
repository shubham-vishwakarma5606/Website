import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — the site builds to plain HTML/CSS/JS in ./out
  // and can be deployed anywhere (GitHub Pages, Netlify, Vercel, S3...).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
