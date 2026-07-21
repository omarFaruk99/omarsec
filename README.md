# OmarSec — Cybersecurity Knowledge Base

Official repository for **[omarsec.com](https://www.omarsec.com)** — a personal
cybersecurity knowledge base covering Pentesting, Linux, and Server engineering.

> **Note to future me:** Read this file first when you come back after a break.
> It has everything: how to run locally, how the server works, and how to deploy.

---

## Tech Stack

- **Framework:** Next.js 16
- **Docs engine:** Nextra v4 (Markdown / MDX based)
- **Styling:** Vanilla CSS (Geist Mono & Geist typography)
- **Server:** AWS EC2 (Ubuntu) + Nginx + PM2
- **Live domain:** https://omarsec.com

---

## Part 1 — Working on LOCAL (your computer)

This is where you write and preview content. Never edit directly on the server.

### First time setup

```bash
git clone git@github.com:omarFaruk99/omarsec.git
cd omarsec
npm install
```

### Daily work

```bash
npm run dev
```

Then open http://localhost:3000 — it auto-reloads when you save a file.

### When you finish writing

```bash
git add .
git commit -m "describe your change"
git push origin main
```

Pushing to `main` on GitHub is step 1 of deploy. The server pulls from here.

### Common commands

| Command | What it does |
|---|---|
| `npm run dev` | Start local preview (development) |
| `npm run build` | Test a production build locally |
| `npm run start` | Run the production build locally |

---

## Part 2 — The SERVER (AWS EC2)

You do **not** write code here. The server only runs the live site.
You connect from local, pull the latest code, and restart.

### How to connect

SSH config is already set up on your local machine (`~/.ssh/config`):

```bash
ssh aws-lab
```

### Server facts (important — memorize these)

| Thing | Value |
|---|---|
| SSH shortcut | `aws-lab` |
| Login user | `ubuntu` |
| Project location | `/var/www/omarsec` |
| Process manager | PM2 |
| PM2 app name | `omarsec` |
| App runs on | port `3000` |
| Web server | Nginx (reverse proxy → localhost:3000) |
| Node version | v24.14.0 (via nvm) |

### The full path layout

```
/var/www/omarsec        ← the project lives here (convention for web apps)
/etc/nginx/sites-enabled/omarsec.com   ← Nginx config for the domain
~/.pm2/                 ← PM2 stores app info and logs here
```

### ⚠️ Gotcha: the `pm2` command "not found" over SSH

When you run a command like `ssh aws-lab "pm2 list"`, it may say
`pm2: command not found`. Reason: a non-interactive SSH session does not load
`nvm`, so `pm2` is not on the PATH.

**Fix — use the full path to pm2:**

```bash
~/.nvm/versions/node/v24.14.0/bin/pm2 list
```

Or log in fully first (`ssh aws-lab`, then run `pm2 list`) — that works normally.

---

## Part 3 — DEPLOY (make changes go live)

Full flow, in order:

```
LOCAL: write → commit → push to GitHub
   ↓
SERVER: pull from GitHub → install → build → restart PM2
```

### Step 1 — On local

```bash
git add .
git commit -m "your change"
git push origin main
```

### Step 2 — On the server

Connect and run the deploy. One command from local:

```bash
ssh aws-lab "cd /var/www/omarsec && \
  git pull && \
  npm install && \
  npm run build && \
  ~/.nvm/versions/node/v24.14.0/bin/pm2 restart omarsec"
```

### Step 3 — Check it worked

```bash
ssh aws-lab "~/.nvm/versions/node/v24.14.0/bin/pm2 status"
```

Then open https://omarsec.com in a browser.

### If deploy breaks — check logs

```bash
ssh aws-lab "~/.nvm/versions/node/v24.14.0/bin/pm2 logs omarsec --lines 50"
```

---

## Conventions & Rules (don't break these)

| Rule | Why |
|---|---|
| Write code only on LOCAL | Server is for running, not editing |
| Always go through GitHub | Server pulls from `main`, keeps history |
| Web projects live in `/var/www/` | Standard Linux convention |
| Use PM2, never `npm run dev` on server | PM2 keeps the app alive + auto-restart |
| Never commit `.env` or secrets | They are in `.gitignore` — keep it that way |
| `git pull` blocked? | A file was edited on server. Run `git checkout <file>` first, then pull |

---

## Quick Reference (copy-paste)

```bash
# --- LOCAL: preview ---
npm run dev

# --- LOCAL: publish ---
git add . && git commit -m "msg" && git push origin main

# --- DEPLOY to live ---
ssh aws-lab "cd /var/www/omarsec && git pull && npm install && npm run build && ~/.nvm/versions/node/v24.14.0/bin/pm2 restart omarsec"

# --- CHECK live app ---
ssh aws-lab "~/.nvm/versions/node/v24.14.0/bin/pm2 status"
```

---

## Project Structure

- `content/index.mdx` — landing page
- `content/docs/` — all documentation modules
- `app/layout.jsx` — layout shell + footer
- `app/globals.css` — branding and typography

---

*Maintained by [OmarSec](https://www.omarsec.com).*
