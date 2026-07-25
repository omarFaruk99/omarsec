# OmarSec

Bengali-language cybersecurity documentation site — **[omarsec.com](https://omarsec.com)**.

Next.js 15 + Nextra 4. Almost all work is writing MDX pages under `content/`.

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

That's the whole deploy. Nothing to do on the server. Watch it in the
**Actions** tab — about 40 seconds for a content change, ~7 minutes if
`package.json` changed.

---

## How it deploys

```
git push  →  GitHub builds a Docker image  →  pushes it to ghcr.io
          →  SSHes into the server  →  docker compose pull && up -d
          →  health check; rolls back to the previous image if it fails
```

The server builds nothing. It only pulls a finished image.

Pull requests run a build check without deploying.

---

## Where things are

| | |
|---|---|
| Server | `ssh aws-lab` (`3.0.40.40`, user `ubuntu`) |
| Server files | `/opt/omarsec/` — only `compose.yaml` and `.env`. No source code. |
| App | Docker container on `127.0.0.1:3001` |
| Nginx | `/etc/nginx/sites-available/omarsec.com` → port 3001, SSL via Certbot |
| Image | `ghcr.io/omarfaruk99/omarsec` — package is public, so no login needed |
| Secrets | `SERVER_HOST`, `SERVER_USER`, `SSH_PRIVATE_KEY` in repo settings |

`SSH_PRIVATE_KEY` is a key made only for Actions, not the `.pem` you use for
`ssh aws-lab`. To revoke it, delete its line from the server's
`~/.ssh/authorized_keys`.

---

## Check or roll back

```bash
ssh aws-lab
cd /opt/omarsec

docker compose ps          # running?
docker compose logs -f     # errors
cat .env                   # which commit is live

# roll back — no rebuild, old images are kept 14 days
docker images ghcr.io/omarfaruk99/omarsec
sed -i "s|^TAG=.*|TAG=<old-sha>|" .env
docker compose up -d
```

When a deploy fails, open the run in **Actions**, click the first red X, read
the last 20 lines.

---

## Gotchas

- **Cloudflare caches `.js`, `.css` and images** (not HTML). If a static file
  looks stale after a deploy: Cloudflare → Caching → **Purge Everything**.
- **Search needs the `postbuild` script.** It builds the Pagefind index.
  Remove it and search silently 404s.
- **Only add a `_meta.js` key after the file exists**, or the build fails.
- **Run `npm run build` only** when you add a page or edit `_meta.js` — the dev
  server does not validate those. Delete `.next` afterwards.
