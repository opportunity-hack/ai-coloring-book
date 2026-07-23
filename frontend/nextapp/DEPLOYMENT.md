# Deploying the frontend

The frontend is hosted on **Vercel** (project `susieqsbooks` in the `ohack`
team). The Django backend stays on fly.io at `https://api.susieqsbooks.org`
and is not affected by anything in this document.

**Live URL:** https://susieqsbooks.vercel.app (until DNS cutover, below)

## Environment variables

Set in Vercel → Project Settings → Environment Variables (already configured):

| Variable | Preview | Production |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `https://api.susieqsbooks.org` | `https://api.susieqsbooks.org` |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | sandbox client ID | live client ID |
| `NEXT_PUBLIC_DONATION_AMOUNT_PER_BOOK` | `10` | `10` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | *(unset — GA off)* | `G-CTZWL4FZTT` |

For local development copy `.env.example` to `.env` (or run `vercel env pull`).

## Deploying

CLI (from `frontend/nextapp`):

```bash
vercel          # preview deployment
vercel --prod   # production deployment
```

Recommended: connect the GitHub repo in the Vercel dashboard
(Project Settings → Git) with **Root Directory = `frontend/nextapp`**. After
that, every PR gets a preview URL and merges to `main` deploy to production
automatically; the CLI is no longer needed.

## DNS cutover for susieqsbooks.org (one-time, manual)

1. A day ahead, lower the TTL on the apex `A`/`AAAA` records (and `www`) to
   300s at the DNS provider.
2. In Vercel → susieqsbooks → Settings → Domains, add `susieqsbooks.org` and
   `www.susieqsbooks.org` (redirecting www → apex).
3. Update DNS as Vercel instructs: apex `A 76.76.21.21`, `www` →
   `CNAME cname.vercel-dns.com`. **Do not touch `api.susieqsbooks.org`** — it
   must keep pointing at fly.io.
4. Wait for Vercel to issue certificates, then smoke-test on the real domain:
   home page, `/drawings` upload, `/sponsor` flow, `/admin` login.
5. After a few days of quiet operation, decommission the old frontend:
   `fly apps destroy susieqsbooks-frontend-1`, and delete `Dockerfile`,
   `fly.toml`, and `.dockerignore` from `frontend/nextapp` (they only exist
   for the fly.io deployment).

## Security follow-ups (backend, not blocking)

- `backend/suzie_api/.env` is committed with live credentials (AWS keys,
  Replicate and Resend tokens, DB password, Django SECRET_KEY). Rotate them
  all and move them to fly.io secrets (`fly secrets set ...`).
- Tighten Django CORS (`CORS_ORIGIN_ALLOW_ALL = True` today) to
  `https://susieqsbooks.org` and `https://*.vercel.app`, and set
  `DEBUG = False` in `settings.py`.
- The upload CAPTCHA is client-side only; a server-verified check
  (e.g. Cloudflare Turnstile) needs a small backend endpoint.
