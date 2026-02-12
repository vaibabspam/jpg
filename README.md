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

## Deployment preflight (recommended)

Run this before opening or merging a PR:

```bash
./scripts/preflight.sh
```

It validates required routes/files, security header presence, sitemap linkage, and contact function entrypoint.

## Correct Cloudflare deployment target (important)

This repo is built for **Cloudflare Pages**, not a standalone **Cloudflare Worker** project.

If you see Cloudflare configuration values like:
- Deploy command: `npx wrangler deploy`
- Worker runtime settings / compatibility flags as the main deploy target

then your Git integration is connected to the wrong product.

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

## If your PR says “This branch has conflicts that must be resolved”

From your PR branch, run:

```bash
./scripts/fix-pr-branch.sh origin main
```

If conflicts are found, resolve files, then:

```bash
git add .
git commit -m "Resolve merge conflicts with main"
git push origin <your-branch>
```

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
