# OmarSec — Cybersecurity Knowledge Base

Documentation site for **[omarsec.com](https://www.omarsec.com)**.

- **Framework:** Next.js 16 + Nextra v4 (MDX)
- **Server:** AWS EC2 (Ubuntu) + Nginx + PM2

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

## Server

The server only runs the live site. Never edit code here — pull from GitHub.

| Item | Value |
|---|---|
| SSH | `ssh aws-lab` |
| Project path | `/var/www/omarsec` |
| Process manager | PM2 (app name: `omarsec`) |
| Port | `3000` (Nginx proxies from omarsec.com) |

---

## Deploy (make changes live)

After `git push` from local, run this from local:

```bash
ssh aws-lab "cd /var/www/omarsec && git pull && npm install && npm run build && pm2 restart omarsec"
```

Check the app:

```bash
ssh aws-lab "pm2 status"      # is it running?
ssh aws-lab "pm2 logs omarsec"  # see errors
```

---

## Notes

- Write code on local only; the server pulls from `main`.
- If `git pull` is blocked, a file was changed on the server. Run `git checkout <file>` then pull again.
- If `pm2` is "command not found" over SSH, use the full path: `~/.nvm/versions/node/v24.14.0/bin/pm2`.
- Never commit secrets or `.env` files (they are in `.gitignore`).
