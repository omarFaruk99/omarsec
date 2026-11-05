# OmarSec

Bengali-language tech learning documentation site — **[omarsec.com](https://omarsec.com)**.
Covers cybersecurity, Linux, Git, DevOps, cloud, and AI engineering for software engineers,
DevOps/cloud/AI engineers, security folks, and tech-savvy learners in general.

Next.js 15 + Nextra 4, self-hosted on a Contabo VPS (`faruk-eu-1`) behind Cloudflare.
Almost all work is writing MDX pages under `content/`.

---

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Read `DOCS_RULES.md` before writing a page.

## Publish

A push does **not** deploy by itself. Push, then build on the server:

```bash
# 1. on your PC
git push origin main

# 2. on the server
ssh faruk-eu-1
cd ~/apps
rm -rf omarsec-prev && cp -a omarsec omarsec-prev   # backup of the running site
cd omarsec
git pull --ff-only origin main
npm ci
npm run build                                      # ~2 min, also builds the search index
pm2 reload omarsec
```

Then open omarsec.com and check the page you changed.

---

## How it deploys

```
browser → Cloudflare (proxied) → nginx :443 → PM2 "omarsec" (next start, 127.0.0.1:3000)
```

There is no Vercel, no Docker, no GitHub Actions. The build runs on the server.

---

## Where things are

| | |
|---|---|
| Server | Contabo VPS, SSH host `faruk-eu-1` (user `molla`) |
| App folder | `~/apps/omarsec` — a git checkout of `main` |
| Backup of the last release | `~/apps/omarsec-prev` |
| Process | PM2 app `omarsec`, runs `next start -H 127.0.0.1 -p 3000` |
| Node | v24 via nvm |
| Web server | nginx, `/etc/nginx/sites-enabled/omarsec` |
| SSL | Cloudflare Origin certificate in `/etc/ssl/cloudflare/` |
| DNS | Cloudflare, **proxied** (orange cloud) |
| Pixie installer | `/var/www/pixie/Pixie-Setup.exe`, served by nginx at `/pixie/download` |
| Search | Pagefind, built by the `postbuild` script into `public/_pagefind` |
| Analytics | Google Tag Manager `GTM-TSQ23TG5` in `app/layout.jsx`; GA4 `G-RJNY32VVK8` lives inside the container |
| Env vars | none |

---

## Analytics

- The site loads **only** the Tag Manager container (`@next/third-parties`,
  `<GoogleTagManager>` in `app/layout.jsx`). GA4 is a tag inside that container.
- **Never add a separate GA `gtag` snippet** — it would count every page view twice.
- New tracking (events, other pixels) is added in Tag Manager, not in the code.
- Page changes inside Next.js are counted through GA's "browser history events"
  setting (Enhanced measurement). Keep it on.

---

## Check or roll back

- **Logs:** `pm2 logs omarsec` on the server.
- **Roll back** to the backup made before the last release:

```bash
cd ~/apps
mv omarsec omarsec-bad && mv omarsec-prev omarsec
pm2 reload omarsec
```

To reproduce a failed build locally:

```bash
rm -rf .next
npm run build
```

---

## Gotchas

- **Search needs the `postbuild` script.** It builds the Pagefind index. Remove
  it and search silently 404s.
- **Only add a `_meta.js` key after the file exists**, or the build fails. The
  dev server does not check this — `npm run build` does.
- **Run `npm run build` only** when you add a page or edit `_meta.js`. Delete
  `.next` afterwards, or the running dev server breaks.
- **`output: 'standalone'` stays out of `next.config.mjs`.** PM2 runs
  `next start` from the full checkout; standalone output would need a different
  start command.
- **`/pixie/download` is served by nginx, not Next.js.** A new Pixie release
  means replacing the `.exe` in `/var/www/pixie/` and updating
  `public/pixie/latest.json`.
