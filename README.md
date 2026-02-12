# JPG Infotech Website Rebuild

Astro + TypeScript + Tailwind rebuild for https://www.jpginfotech.com targeting **Cloudflare Pages**.

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Correct Cloudflare deployment target (important)

This repo is built for **Cloudflare Pages**, not a standalone **Cloudflare Worker** project.

If you see a Cloudflare screen with:
- `Deploy command: npx wrangler deploy`
- Worker runtime settings

then the repo is connected to the wrong product type.

## Deploy on Cloudflare Pages (recommended)

1. Cloudflare Dashboard → **Workers & Pages** → **Create application** → **Pages**.
2. Connect GitHub repository.
3. Build settings:
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
4. Deploy.
5. Add environment variables (Production and Preview):
   - `CONTACT_TO_EMAIL`
   - `CONTACT_FROM_EMAIL`
   - `CONTACT_RATE_LIMIT`
6. Add custom domains:
   - `jpginfotech.com`
   - `www.jpginfotech.com`
7. Confirm HTTPS is active and DNS records are proxied.

## Contact form behavior

- Frontend posts to `POST /api/contact`.
- Cloudflare Pages Function in `functions/api/contact.ts` validates payload, checks honeypot and minimum submit time, applies in-memory rate limiting, and sends via MailChannels.
- Fallback link: `mailto:vaigunth@jpginfotech.com`.

## Post-deploy verification checklist

- Home and all required routes return HTTP 200.
- `POST /api/contact` returns success for valid requests.
- Response headers include policies from `public/_headers`.
- `https://www.jpginfotech.com/robots.txt` loads.
- `https://www.jpginfotech.com/sitemap.xml` loads.

## GitHub Pages fallback (static only)

If you deploy to GitHub Pages, `/api/contact` will not run (no Pages Functions). Use only the mailto fallback in that setup.
