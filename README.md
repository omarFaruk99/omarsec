# OmarSec

Bengali-language cybersecurity documentation site — **[omarsec.com](https://omarsec.com)**.

Next.js 15 + Nextra 4, hosted on Vercel. Almost all work is writing MDX pages
under `content/`.

---

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Read `DOCS_RULES.md` before writing a page.

## Publish

```bash
git add .
git commit -m "your message"
git push origin main
```

That's the whole deploy. Vercel picks up the push and builds. About a minute.
Watch it in the Vercel dashboard.

Open a pull request instead and Vercel gives you a preview URL for that branch
without touching production.

---

## How it deploys

```
git push  →  Vercel builds (npm run build + postbuild)  →  live on omarsec.com
```

There is no server, no Docker, no GitHub Actions. Vercel owns the build, the
CDN and the SSL certificate.

---

## Where things are

| | |
|---|---|
| Host | Vercel, project `omarsec`, connected to `omarFaruk99/omarsec` |
| Production branch | `main` |
| DNS | Cloudflare, records set to **DNS only** (grey cloud) |
| Search | Pagefind, built by the `postbuild` script into `public/_pagefind` |
| Env vars | none |

DNS is on Cloudflare but proxying is off, so Cloudflare only answers DNS
queries. Turning the orange cloud on would put a second CDN in front of
Vercel's own — that causes SSL errors and stale assets. Leave it grey.

---

## Check or roll back

Both live in the Vercel dashboard:

- **Deployments** — build logs for every push. A red one shows the failing step.
- **Roll back** — open the last good deployment → **Promote to Production**.
  No rebuild, takes seconds.

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
  dev server does not check this — Vercel does, and the deploy goes red.
- **Run `npm run build` only** when you add a page or edit `_meta.js`. Delete
  `.next` afterwards, or the running dev server breaks.
- **`output: 'standalone'` must stay out of `next.config.mjs`.** It is a
  self-hosting option and interferes with Vercel's own bundling.
