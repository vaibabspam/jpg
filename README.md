# JPG Infotech Website Rebuild

Astro + TypeScript + Tailwind rebuild targeting Cloudflare Pages.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Cloudflare Pages

- Build command: `npm run build`
- Output directory: `dist`
- Functions directory: `functions`
- Set `CONTACT_EMAIL` env var if needed.
- Connect custom domain: `jpginfotech.com`

## Notes

- Legacy content placeholders are intentionally included to prevent content loss while migration inventory is completed.
- Security headers are defined in `public/_headers`.
