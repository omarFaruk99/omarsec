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
- The old PM2 setup is stopped but still installed. `/var/www/omarsec` and
  `/etc/nginx/sites-available/omarsec.com.bak-pm2` are kept as a fallback and
  can be removed once the Docker deploy has run for a while.
