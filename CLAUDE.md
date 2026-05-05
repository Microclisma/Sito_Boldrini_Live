# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server on port 3000 (host 0.0.0.0)
npm run build      # Production build via Vite → dist/
npm run preview    # Preview the production build locally
npm run lint       # Type-check with tsc --noEmit (no ESLint configured)
npm run clean      # Remove dist/
```

Deploy to Firebase Hosting happens automatically via GitHub Actions on merge to `main`. PRs get preview deployments.

## Stack

- **React 19 + TypeScript 5** with Vite 6
- **Tailwind CSS 4** (via `@tailwindcss/vite` plugin — no `tailwind.config.js`)
- **Framer Motion 12** for page/section animations
- **Firebase 12**: Auth (email/password), Firestore, Storage, Analytics, Hosting
- **React Router 7** for client-side routing
- **react-markdown** for article content rendering
- **react-helmet-async** for SEO head management

## Architecture

This is a single-page application for Nazzareno Boldrini, a nutrition biologist. The site has a public-facing landing page and a Firebase-backed admin panel for blog management.

### Routing (`src/App.tsx`)
- Public: `/`, `/blog/:slug`, `/privacy-policy`, `/cookie-policy`, `/admin`
- Protected (requires Firebase Auth + admin email whitelist): `/admin/dashboard`, `/admin/articles/new`, `/admin/articles/:id/edit`
- All routes served from `index.html` (SPA rewrite in `firebase.json`)

### Auth & Admin Access (`src/lib/AuthContext.tsx`)
`AuthContext` wraps the app and exposes `user`, `isAdmin`, `loading`. Admin status is determined by matching the signed-in email against a hardcoded whitelist (`dallolion@gmail.com`, `nazzarenoboldrini@gmail.com`). `ProtectedRoute` uses this context to guard admin pages.

### Data Layer (`src/lib/services/articleService.ts`)
All Firestore operations for articles live here: CRUD on the `articles` collection. Articles have: `id`, `title`, `slug`, `excerpt`, `content` (markdown), `coverImage` (Storage URL), `createdAt`, `updatedAt`. Images upload to `images/<timestamp>_<filename>` in Firebase Storage.

### Firestore Rules (`firestore.rules`)
Public read on `articles`, write only for authenticated users.

### Path Aliases
`@/*` resolves to the repo root (configured in both `vite.config.ts` and `tsconfig.json`).

### Environment Variables
```
GEMINI_API_KEY   # Google Gemini AI integration
APP_URL          # Cloud Run service URL (auto-set)
```
See `.env.example`. Vite exposes `GEMINI_API_KEY` via `define` in `vite.config.ts`.

### Firebase Project
Project ID: `sito-boldrini` (see `.firebaserc`). Hosting deploys from `dist/`.
