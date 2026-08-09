import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Fully static export: every route below is prerendered at build time and
  // shipped as plain HTML/CSS/JS, matching the previous Gatsby build model.
  output: 'export',
  // Live URLs on iagodahlem.com all resolve with a trailing slash
  // (e.g. /blog/some-post/) — keep that exact shape in the exported site.
  trailingSlash: true,
  images: {
    // next/image's optimization API needs a server; static export has none.
    unoptimized: true,
  },
}

export default nextConfig
