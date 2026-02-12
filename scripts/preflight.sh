#!/usr/bin/env bash
set -euo pipefail

required_files=(
  "astro.config.mjs"
  "public/_headers"
  "public/robots.txt"
  "public/sitemap.xml"
  "functions/api/contact.ts"
  "src/pages/index.astro"
  "src/pages/services/index.astro"
  "src/pages/services/it-infrastructure-development.astro"
  "src/pages/services/application-development.astro"
  "src/pages/services/cloud-migration.astro"
  "src/pages/services/cloud-security.astro"
  "src/pages/services/middleware-administration.astro"
  "src/pages/partners.astro"
  "src/pages/about.astro"
  "src/pages/contact.astro"
  "src/pages/privacy.astro"
  "src/pages/terms.astro"
  "src/pages/security.astro"
  "src/pages/case-studies/index.astro"
)

for f in "${required_files[@]}"; do
  [[ -f "$f" ]] || { echo "Missing required file: $f"; exit 1; }
done

if ! grep -q "Content-Security-Policy" public/_headers; then
  echo "Missing CSP in public/_headers"
  exit 1
fi

if ! grep -q "Sitemap: https://www.jpginfotech.com/sitemap.xml" public/robots.txt; then
  echo "robots.txt does not point to sitemap.xml"
  exit 1
fi

if ! grep -q "onRequestPost" functions/api/contact.ts; then
  echo "Contact function missing onRequestPost"
  exit 1
fi

echo "Preflight checks passed."
