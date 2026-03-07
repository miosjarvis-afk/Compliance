#!/bin/bash

# Quick deploy script for AI Trust Layer
# This builds and can serve locally or prepare for deployment

set -e

echo "🚀 Building AI Trust Layer..."

cd /data/.openclaw/workspace/projects/ai-trust-layer/apps/web

# Clean and install
echo "📦 Installing dependencies..."
npm ci

# Build
echo "🔨 Building..."
npm run build

echo "✅ Build complete!"
echo ""
echo "Files in dist/:"
ls -la dist/

# Option 1: Serve locally
echo ""
echo "🌐 Starting local server on port 3456..."
echo "Open: http://localhost:3456"
echo ""
cd dist && python3 -m http.server 3456 || npx serve -p 3456
