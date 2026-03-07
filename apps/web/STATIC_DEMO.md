# Static Demo Instructions

This is a **static demo** of AI Trust Layer deployed to GitHub Pages.

## What's Working
- ✅ Landing Page
- ✅ Dashboard with mock data
- ✅ Responsive design
- ✅ All UI components

## What's Mocked
- ⚠️ API calls (returns mock data)
- ⚠️ Authentication (bypassed)
- ⚠️ Database (mock data in memory)

## How to Switch to Full Stack

1. **Update `next.config.js`:**
   ```javascript
   output: 'standalone',  // instead of 'export'
   // Remove: basePath, assetPrefix, images.unoptimized
   ```

2. **Start backend:**
   ```bash
   cd apps/api && npm run dev
   ```

3. **Update API calls:**
   - Replace `fetchProjects()` in `lib/mock-data.ts` with real API calls
   - Uncomment the `fetch()` lines

4. **Deploy to VPS** (Hostinger/Railway/etc.)

## Live Demo
https://miosjarvis-afk.github.io/compliance/

## Repo
https://github.com/Miosjarvis-afk/compliance