import type { NextConfig } from "next";

/**
 * When building for GitHub Pages (GITHUB_PAGES=true) we emit a fully static
 * export served from a repository sub-path. Local `next dev` / `next build`
 * are unaffected.
 *
 * NEXT_PUBLIC_BASE_PATH is inlined into the client bundle so local image
 * `src`s can be prefixed with the base path (next/image `unoptimized` does
 * not do this automatically).
 */
const isPages = process.env.GITHUB_PAGES === "true";
const repo = "dsm-longivlife";
const basePath = isPages ? `/${repo}` : "";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isPages
    ? {
        output: "export",
        basePath,
        assetPrefix: `/${repo}/`,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
