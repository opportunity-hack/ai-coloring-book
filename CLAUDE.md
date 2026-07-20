# AI Coloring Book (susieqsbooks.org)

Kids upload drawings → AI (Replicate ControlNet-scribble) turns them into
coloring-book pages → local sponsors pay via PayPal for logo placement →
admin generates the printed-book PDF. Part fundraiser, part classroom
activity for the nonprofit Susie Q's Kids. Serves Warren/Sterling Heights MI
and greater Phoenix AZ.

## Architecture

- **Frontend**: `frontend/nextapp` — Next.js 14 App Router, JavaScript (no TS),
  Mantine v7, CSS modules. Hosted on **Vercel** (project `ohack/susieqsbooks`,
  live at susieqsbooks.vercel.app). See `frontend/nextapp/DEPLOYMENT.md`.
- **Backend**: `backend/suzie_api` — Django 3.2 + DRF on **fly.io**
  (`susieqsbooks-backend-1`, custom domain `api.susieqsbooks.org`). All
  endpoints under `/api/`. Assets (drawings, covers, PDFs) are public S3 URLs.

## Frontend conventions

- Public pages (`/`, `/drawings`, `/sponsor`) are **server components** in
  `src/app/(site)/` exporting `metadata`; interactivity lives in client-island
  components under `src/components/`. Keep it that way — it's the SEO story.
- All backend calls go through `src/lib/api.js` (axios instance; auth header +
  401 handling via interceptors). Never call axios directly in components.
- Auth/session helpers in `src/lib/auth.js`; `/dashboard` is guarded by
  `src/components/auth/RequireAdmin.js` (role 1 = admin, JWT in localStorage).
- GA4 events go through `src/lib/analytics.js` (no-ops unless
  `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set — production only).
- School list for uploads: `src/data/schools.js` (plain strings to the
  backend; Michigan school names must not change — existing DB rows use them).
- Design system: warm paper background, ink outlines, brand teal `#12b886`,
  crayon-yellow accents, Fredoka display font. Theme in `src/theme.js`.
- Tests: Vitest + Testing Library (`npm test`); config in `vitest.config.mjs`
  (note the jsx-in-.js esbuild loader). CI: `.github/workflows/ci.yml`.

## Gotchas

- Backend JWT header: any scheme prefix works (`Bearer x`); backend splits on
  the space. CORS is currently allow-all (tightening is a planned follow-up).
- The upload CAPTCHA is client-side only (deterrence, not security).
- `backend/suzie_api/.env` contains committed live secrets — rotation is a
  known follow-up; never copy those values anywhere.
- `frontend/nextapp/Dockerfile` + `fly.toml` are legacy; delete after the
  susieqsbooks.org DNS cutover to Vercel is verified.
