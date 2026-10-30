# PixelSeek

A premium React and Express image discovery app powered by the official Unsplash API. Search photography, browse a curated discovery view, and inspect each image without leaving the gallery.

## Features

- Real Unsplash search and curated discovery results
- Responsive masonry gallery with lazy-loaded responsive images
- Anchored hover/focus/click details popovers with photographer attribution
- Pagination, category searches, loading skeletons, error and empty states
- Secure Express API layer — credentials never reach the browser
- Production setup for a single Railway service

## Stack

React, Vite, Express, `unsplash-js`, Lucide React, CSS.

## Local setup

```bash
npm install
copy server\\.env.example server\\.env
# Add your own Unsplash access key to server/.env
npm run dev
```

Client: `http://localhost:5173` · API health: `http://localhost:3000/api/health`.

Required environment values in `server/.env`:

```env
UNSPLASH_ACCESS_KEY=your_unsplash_access_key
PORT=3000
```

Never commit the environment file. Create an Unsplash app and access key at [Unsplash Developers](https://unsplash.com/developers).

## API

- `GET /api/health`
- `GET /api/photos/featured?page=1&per_page=12`
- `GET /api/photos/search?q=nature&page=1&per_page=12`

The Express service validates page/query inputs, caps page size at 30, maps errors consistently, and calls the official Unsplash SDK with the server-only key.

## Production / Railway

1. Create a Railway project from this GitHub repository.
2. Add `UNSPLASH_ACCESS_KEY` in Railway Variables. Do not add it to GitHub.
3. Railway detects `npm run build` and runs it, then use `npm start` as the start command.
4. Deploy. Express serves `dist/`, the `/api` routes, and SPA fallback from one service using Railway’s `PORT`.

Build locally with `npm run build`; serve the production build with `npm start`.

## Project structure

```
src/                    React UI, components, styles and browser API client
server/routes/          Express endpoints
server/services/        Official Unsplash SDK integration
server/config.js        Environment configuration
```

## Unsplash attribution

PixelSeek uses the image URLs supplied by Unsplash, links every image and photographer back to Unsplash, and includes an attribution footer. It is not affiliated with Unsplash.

## Screenshots

Add verified project screenshots here after running the application.
