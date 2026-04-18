# OmarSec — Server Deployment Section Roadmap

## What Is This Section?

A documentation section for `omarsec.com` titled **"Server Deployment"**.

Teaches learners how to take a Next.js application and deploy it on a real Linux
server — the same way professional Software Engineers do in production.

Two dedicated sub-sections visible in the sidebar:
- **Foundation:** Manual deployment, understand every step hands-on
- **Full Production:** Docker, CI/CD, Database, Cloudflare, File Storage, Monitoring, Backups

> Docker and CI/CD will have their own dedicated sections on omarsec.com later.
> In this section, they are covered as overviews only — concept + why — linking to those future sections.

---

## Current Status

> **[AI CONTEXT NOTE]**
> Foundation is fully complete as of 2026-04-17.
> Full Production will begin approximately 1 week later (around 2026-04-24).
> When resuming work, start directly with `02-full-production/` folder creation.
> Do NOT re-create or modify any Foundation files unless the user explicitly asks.

### Foundation — COMPLETE

All 9 pages created and registered in `_meta.js`:

- [x] `index.mdx` — Phase 1 overview
- [x] `choose-server.mdx` — Contabo VPS + AWS EC2 walkthrough (two separate Step flows)
- [x] `secure-server.mdx` — Non-root user (`queen`), SSH key auth, disable password login, UFW firewall
- [x] `nginx.mdx` — Reverse proxy concept, installation, config, server_tokens off
- [x] `ssl-https.mdx` — DNS setup, Certbot, Let's Encrypt, MITM attack explanation
- [x] `github-setup.mdx` — SSH Deploy Key vs PAT, daily update workflow, dev vs production build
- [x] `env-variables.mdx` — .env on server, .gitignore, chmod 600, real breach example
- [x] `pm2.mdx` — Process manager, startup + save, logs, update workflow
- [x] `first-deployment.mdx` — End-to-end walkthrough with create-next-app

**Note:** `github-setup.mdx` was added during Phase 1 (not in original roadmap) because it is essential for production workflow understanding.

### Full Production — NOT STARTED

Planned to begin around **2026-04-24**. Full structure listed below.

---

## Navigation Structure (How It Looks on the Site)

When a user visits `omarsec.com/docs/server-deployment`, the sidebar shows:

```
Server Deployment
├── Overview (index)
│
├── Foundation
│   ├── Introduction              ✅
│   ├── Choose a Server           ✅
│   ├── Secure the Server         ✅
│   ├── Nginx & Reverse Proxy     ✅
│   ├── SSL & HTTPS               ✅
│   ├── GitHub Setup              ✅ (added — not in original plan)
│   ├── Environment Variables     ✅
│   ├── PM2 — Process Manager     ✅
│   └── First Deployment          ✅
│
└── Full Production
    ├── Introduction
    ├── Docker (Overview)
    ├── CI/CD Pipeline (Overview)
    ├── Database Setup
    ├── File Storage
    ├── Cloudflare & CDN
    ├── Monitoring & Alerts
    ├── Backup Strategy
    └── Client Project Checklist
```

---

## File Structure

```
content/docs/server-deployment/
├── _meta.js
├── index.mdx                              → Section overview, Vercel vs Server question, prerequisites
│
├── foundation/                                ← COMPLETE
│   ├── _meta.js
│   ├── index.mdx
│   ├── choose-server.mdx
│   ├── secure-server.mdx
│   ├── nginx.mdx
│   ├── ssl-https.mdx
│   ├── github-setup.mdx                  ← Added (production workflow essential)
│   ├── env-variables.mdx
│   ├── pm2.mdx
│   └── first-deployment.mdx
│
├── 02-full-production/                    ← NOT STARTED (begins ~2026-04-24)
│   ├── _meta.js
│   ├── index.mdx
│   ├── docker-overview.mdx
│   ├── cicd-overview.mdx
│   ├── database.mdx
│   ├── file-storage.mdx
│   ├── cloudflare-cdn.mdx
│   ├── monitoring.mdx
│   ├── backup.mdx
│   └── client-checklist.mdx
│
└── cheatsheet.mdx                         → All commands from both phases in one place
```

---

## Key Design Decisions (Foundation)

| Decision | Choice | Reason |
|---|---|---|
| Server providers | Contabo + AWS EC2 | Low cost, learner-friendly |
| VPS user | `queen` (not `deploy`) | User's preference |
| SSH key type | ed25519 | Modern, more secure than RSA |
| GitHub auth | SSH Deploy Key (primary), PAT (alternative) | Least privilege principle |
| Build approach | npm run build + PM2 | Never use npm run dev on server |
| App for walkthrough | create-next-app | Simple, no distractions from deployment |

---

## Scope Rules

| Topic | What This Section Does |
|---|---|
| Manual deploy (Nginx, PM2, SSL) | Full step-by-step tutorial |
| Server security | Full step-by-step tutorial |
| Docker | Overview only — concept + why. Links to future Docker section |
| CI/CD | Overview only — concept + flow. Links to future CI/CD section |
| Database | Full setup walkthrough (PostgreSQL) + overview of managed options |
| Cloudflare | Full setup walkthrough (DNS, CDN, WAF) — free tier |
| File Storage | Concept + why, S3/R2 comparison, enough to implement |
| Monitoring | Setup walkthrough (UptimeRobot, Sentry) |
| Backup | Setup walkthrough (cron + S3 script) |
| Client Checklist | Conceptual — questions to ask before starting any client project |

---

## CyberSec Angles Per Page

| Page | CyberSec Context |
|---|---|
| `secure-server.mdx` | Brute-force attacks, server hardening, Defense in Depth |
| `ssl-https.mdx` | MITM attack, TLS encryption, Wireshark demo reference |
| `github-setup.mdx` | Least Privilege, Deploy Key vs personal key risk |
| `env-variables.mdx` | Real breach example ($50k AWS bill), GitHub secret scanning |
| `pm2.mdx` | Log analysis to detect attacks, suspicious traffic patterns |
| `docker-overview.mdx` | Container isolation as a security boundary |
| `cicd-overview.mdx` | Supply chain attacks via compromised CI/CD pipelines |
| `database.mdx` | Why DB exposed to public internet = critical vulnerability |
| `file-storage.mdx` | Signed URLs, preventing unauthorized file access |
| `cloudflare-cdn.mdx` | DDoS, WAF, hiding server IP from attackers |
| `backup.mdx` | Ransomware scenario — backups as the last line of defense |
