# OmarSec — Cybersecurity Knowledge Base

Documentation site for **[omarsec.com](https://www.omarsec.com)**.

- **Framework:** Next.js 15 + Nextra v4 (MDX)
- **Server:** AWS EC2 (Ubuntu) + Nginx + Docker

---

## Local

Run and preview the site on your computer. All editing happens here.

```bash
git clone git@github.com:omarFaruk99/omarsec.git
cd omarsec
npm install
npm run dev        # preview at http://localhost:3000
```

Publish your changes:

```bash
git add .
git commit -m "your message"
git push origin main
```

---

## How deploy works

GitHub builds the Docker image. The server only pulls and runs it — it does
not build anything and holds no source code.

```
git push origin main
      ↓
GitHub Actions builds the image
      ↓
pushes it to ghcr.io/omarfaruk99/omarsec:<commit-sha>
      ↓
SSHes into EC2: docker compose pull && docker compose up -d
      ↓
health check; on failure it rolls back to the previous tag
```

Watch it under the repo's **Actions** tab. A push takes about 6–7 minutes,
most of it the image build.

Pull requests run `.github/workflows/ci.yml`, which builds the image without
pushing it. That catches broken MDX or bad `_meta.js` links before merge.

---

## Server

The server holds **two files only**. No code, no `node_modules`, no Node.js.

| Item | Value |
|---|---|
| SSH | `ssh aws-lab` |
| Path | `/opt/omarsec` |
| Files | `compose.yaml`, `.env` |
| Port | `3001` (Nginx proxies from omarsec.com) |
| Image | `ghcr.io/omarfaruk99/omarsec` (package is public, no login needed) |

`.env` holds two values — `TAG` (which commit is live) and `PORT`.
The deploy workflow rewrites `TAG` on every deploy.

### Nginx

One site is hosted on this server. Nginx terminates SSL and forwards
everything to the container.

| Item | Value |
|---|---|
| Config | `/etc/nginx/sites-available/omarsec.com` |
| Sites enabled | `omarsec.com` only |
| Forwards to | `http://localhost:3001` |
| SSL | Let's Encrypt via Certbot, auto-renewed |

The container binds to `127.0.0.1:3001`, so it is reachable only from the
server itself. All public traffic goes through Nginx.

`www.omarsec.com` and plain HTTP both 301-redirect to `https://omarsec.com`.

To change the port, edit `PORT` in `/opt/omarsec/.env` **and** `proxy_pass` in
the Nginx config, then `sudo nginx -t && sudo systemctl reload nginx`.

### Cloudflare

The domain sits behind Cloudflare. HTML pages are not cached, so content
changes appear as soon as a deploy finishes. Static files — `.js`, `.css`,
images — **are** cached.

If a static file looks stale after a deploy, purge it:
Cloudflare → omarsec.com → Caching → Configuration → Purge Everything.

### Check the app

```bash
ssh aws-lab
cd /opt/omarsec
docker compose ps          # is it running?
docker compose logs -f     # see errors
cat .env                   # which commit is live?
```

### Roll back by hand

Every deploy is tagged with its commit SHA, and old images stay on the server.
To go back, put the old SHA in `.env` and bring it up:

```bash
ssh aws-lab
cd /opt/omarsec
docker images ghcr.io/omarfaruk99/omarsec    # see what is available
sed -i "s|^TAG=.*|TAG=<old-sha>|" .env
docker compose up -d
```

---

## Notes

- Write code on local only. The server never sees the repository.
- Search is built by Pagefind in the `postbuild` script. It runs inside the
  Docker build, so the index ships with the image.
- Never commit secrets or `.env` files (they are in `.gitignore`).
- PM2, the old `/var/www/omarsec` checkout, and the `portfolio.omarsec.com`
  site have all been removed. The server runs Docker and Nginx, nothing else.
