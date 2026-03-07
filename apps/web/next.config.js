/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for GitHub Pages
  output: 'export',
  distDir: 'dist',
  
  // GitHub Pages base path (repo name)
  basePath: process.env.NODE_ENV === 'production' ? '/compliance' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/compliance/' : '',
  
  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
  },
  
  // Ready for future API integration
  // When switching to full-stack:
  // 1. Change output: 'standalone'
  // 2. Add rewrites() for API proxy
  // 3. Remove basePath and assetPrefix
};

module.exports = nextConfig;