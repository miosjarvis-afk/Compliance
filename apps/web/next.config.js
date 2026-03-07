/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  distDir: 'dist',
  
  // GitHub Pages base path (repo name)
  basePath: '/Compliance',
  assetPrefix: '/Compliance',
  
  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
  },
  
  // Trailing slash for static export
  trailingSlash: true,
  
  // Ready for future API integration
  // When switching to full-stack:
  // 1. Change output: 'standalone'
  // 2. Add rewrites() for API proxy
  // 3. Remove basePath and assetPrefix
};

module.exports = nextConfig;