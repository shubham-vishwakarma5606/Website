import type { NextConfig } from "next";

// Set at build time by the GitHub Pages workflow (e.g. "/Website").
// Empty for root-domain hosting (Netlify, Vercel, custom domain).
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Static export — the site builds to plain HTML/CSS/JS in ./out
  // and can be deployed anywhere (GitHub Pages, Netlify, Vercel, S3...).
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: { unoptimized: true },
};

export default nextConfig;

const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: { unoptimized: true },
};
