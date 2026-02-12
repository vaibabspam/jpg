# Super Simple Setup (No Terminal Required)

If you’re stuck, do **only these steps**.

## 1) Fix the GitHub PR conflict (button flow)

1. Open your PR in GitHub.
2. Click **Resolve conflicts**.
3. For each file shown, click **Accept incoming** (or keep the newer version), then **Mark as resolved**.
4. Click **Commit merge**.

If GitHub won’t let you resolve in-browser, ask someone to run this once locally:

```bash
git checkout <your-branch>
git fetch origin
git merge origin/main
# resolve conflicts
git add .
git commit -m "Resolve conflicts"
git push origin <your-branch>
```

---

## 2) Use Cloudflare **Pages** (not Worker Builds)

In Cloudflare:

1. Go to **Workers & Pages**.
2. Click **Create application** → **Pages**.
3. Connect your GitHub repo.
4. Set:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
5. Click **Deploy**.

> If you see `npx wrangler deploy`, you are in the wrong product (Worker), back out and choose **Pages**.

---

## 3) Add environment variables (copy/paste)

In Pages project settings → Environment variables, add:

- `CONTACT_TO_EMAIL` = `vaigunth@jpginfotech.com`
- `CONTACT_FROM_EMAIL` = `noreply@jpginfotech.com`
- `CONTACT_RATE_LIMIT` = `5`

Add them for both **Production** and **Preview**.

---

## 4) Add your domain

In Pages project → **Custom domains**:

- `jpginfotech.com`
- `www.jpginfotech.com`

Wait until both show active/verified.

---

## 5) Final check (open in browser)

Open these URLs:

- `/`
- `/services/`
- `/contact/`
- `/robots.txt`
- `/sitemap.xml`

If all load, you’re done.
