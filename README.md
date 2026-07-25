# OmarSec

Bengali-language cybersecurity documentation site — **[omarsec.com](https://omarsec.com)**.

Almost all work here is writing MDX pages under `content/`. The app code rarely
changes.

---

## Quick reference

| | |
|---|---|
| Stack | Next.js 15 + Nextra 4 (MDX), plain JavaScript, vanilla CSS |
| Search | Pagefind, built during `npm run build` |
| Repo | `omarFaruk99/omarsec` (private) |
| Image | `ghcr.io/omarfaruk99/omarsec` (package is **public**) |
| Server | AWS EC2, Ubuntu 24.04 — `ssh aws-lab` (`3.0.40.40`, user `ubuntu`) |
| Server path | `/opt/omarsec` — two files, no source code |
| Runs as | Docker container on `127.0.0.1:3001` |
| In front | Nginx (SSL) → Cloudflare (CDN) |

---

## Everyday work

```bash
npm install        # first time only
npm run dev        # http://localhost:3000
```

Edit pages under `content/`, check them in the browser, then publish:

```bash
git add .
git commit -m "your message"
git push origin main
```

That is the whole deploy. Nothing to do on the server.

Watch it under the repo's **Actions** tab. Roughly:

- content-only change → **~40 seconds**
- `package.json` changed → **~7 minutes** (the image rebuilds from scratch)

### Before writing content

Read `DOCS_RULES.md`. Every page must follow it — language split, required
sections, heading style, file naming. `CLAUDE.md` has the short version.

### Validating a change

`npm run dev` catches most things. Run a full build only when you add a page or
edit a `_meta.js`, because Nextra validates those at build time and the dev
server does not:

```bash
npm run build
```

If you run it, delete `.next` afterwards or the dev server will complain:

```bash
rm -rf .next
```

---

## How deployment works

The server builds nothing. GitHub builds a Docker image, pushes it to a
registry, and the server pulls and runs it.

```
git push origin main
        │
        ▼
GitHub Actions  (.github/workflows/deploy.yml)
        │
        ├─ job "build"
        │    docker build  →  ghcr.io/omarfaruk99/omarsec:<commit-sha>
        │    also tagged   →  :latest
        │
        ▼  only if the build passed (needs: build)
        │
        └─ job "deploy"
             SSH into the server
             write the new sha into /opt/omarsec/.env
             docker compose pull
             docker compose up -d
             curl the site for up to 30s
                 ok    → done, prune images older than 14 days
                 fail  → put the old sha back, restart, exit 1
```

Pull requests run `.github/workflows/ci.yml`, which builds the same image but
does not push it. A broken page shows a red X before it can be merged.

### Why it is built this way

The server has 2 GB of RAM. A Next.js build needs most of that, so building
there competed with the live site and sometimes failed. Building on GitHub is
free, reproducible, and leaves the server with nothing to do but pull a
finished image. It also makes rollback instant — old images are still on disk.

---

## Where everything lives

### In this repo

| File | Purpose |
|---|---|
| `content/` | every page, as MDX |
| `app/[[...slug]]/page.jsx` | the single catch-all route that renders them |
| `Dockerfile` | 3-stage build, `node:22-alpine`, runs as non-root |
| `.dockerignore` | keeps `node_modules`, `.git`, env files out of the image |
| `next.config.mjs` | Nextra config + `output: 'standalone'` |
| `.github/workflows/deploy.yml` | build, push, deploy |
| `.github/workflows/ci.yml` | build check on pull requests |
| `DOCS_RULES.md` | content rules — read before writing |
| `TECH_STACK.md` | why each tool was chosen |

### On the server

Two files. That is all — no code, no `node_modules`, no Node.js installed.

```
/opt/omarsec/
├── compose.yaml     which image to run, on which port
└── .env             TAG=<commit sha>   PORT=3001
```

The deploy workflow rewrites `TAG` on every deploy. `PORT` is set by hand.

Nginx config lives at `/etc/nginx/sites-available/omarsec.com` and forwards
everything to `http://localhost:3001`. It is the only enabled site.
`www.omarsec.com` and plain HTTP both 301 to `https://omarsec.com`.
SSL is Let's Encrypt via Certbot, renewed automatically.

### In GitHub settings

Three repository secrets, under Settings → Secrets and variables → Actions:

| Secret | Value |
|---|---|
| `SERVER_HOST` | `3.0.40.40` |
| `SERVER_USER` | `ubuntu` |
| `SSH_PRIVATE_KEY` | contents of `~/.ssh/gh_actions_omarsec` |

That SSH key exists **only** for GitHub Actions. It is not the `.pem` used for
`ssh aws-lab`. If it ever leaks, delete its line from the server's
`~/.ssh/authorized_keys` and generate a new one — nothing else breaks.

No registry credentials are needed anywhere, because the GHCR package is
public. The repo stays private; only the built image is readable.

---

## Checking and debugging

```bash
ssh aws-lab
cd /opt/omarsec

docker compose ps          # is it running?
docker compose logs -f     # live logs
cat .env                   # which commit is live?
docker stats --no-stream   # CPU and memory
```

When a deploy fails, open the failed run in the **Actions** tab, click the
first red X, and read the **last 20 lines**. Later steps never run, so the
first error is the real one.

---

## Rolling back

Every deploy is tagged with its commit SHA and old images stay on the server
for 14 days. Going back does not rebuild anything.

```bash
ssh aws-lab
cd /opt/omarsec

docker images ghcr.io/omarfaruk99/omarsec     # what is available
sed -i "s|^TAG=.*|TAG=<old-sha>|" .env
docker compose up -d
```

The pipeline also does this by itself when the post-deploy health check fails.

---

## Gotchas

**Cloudflare caches static files.**
HTML is not cached, so text changes appear immediately. But `.js`, `.css`, and
images are. If a static file looks stale after a deploy:
Cloudflare → omarsec.com → Caching → Configuration → **Purge Everything**.

**Search needs the `postbuild` script.**
Nextra's search is Pagefind. `npm run build` triggers `postbuild`, which writes
the index into `public/_pagefind`. Remove that script and search silently
returns 404 — it did, for months, before this was fixed.

**The image name must be lowercase.**
`ghcr.io/omarfaruk99/...`, not `omarFaruk99`. GHCR rejects uppercase.

**Changing the port takes two edits.**
`PORT` in `/opt/omarsec/.env` **and** `proxy_pass` in the Nginx config, then:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

**Never commit `.env` or secrets.** They are in `.gitignore` and
`.dockerignore`. A leaked `.env` inside an image is readable by anyone, because
the package is public.

**Only add a `_meta.js` key after the file exists**, or the build fails.
