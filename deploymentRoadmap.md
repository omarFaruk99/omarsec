# OmarSec — Server Deployment Section Roadmap

## What Is This Section?

A documentation section for `omarsec.com` titled **"Server Deployment"**.

Teaches learners how to take a Next.js application and deploy it on a real Linux
server — the same way professional Software Engineers do in production.

Two dedicated sub-sections visible in the sidebar:
- **Phase 1 — MVP:** Manual deployment, understand every step hands-on
- **Phase 2 — Full Production:** Docker, CI/CD, Database, Cloudflare, File Storage, Monitoring, Backups

> Docker and CI/CD will have their own dedicated sections on omarsec.com later.
> In this section, they are covered as overviews only — concept + why — linking to those future sections.

---

## Navigation Structure (How It Looks on the Site)

When a user visits `omarsec.com/docs/server-deployment`, the sidebar shows:

```
Server Deployment
├── Overview (index)
│
├── Phase 1 — MVP
│   ├── Introduction
│   ├── Choose a Server
│   ├── Secure the Server
│   ├── Nginx & Reverse Proxy
│   ├── SSL & HTTPS
│   ├── Environment Variables
│   ├── PM2 — Process Manager
│   └── First Deployment (Full Walkthrough)
│
└── Phase 2 — Full Production
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
├── 01-mvp/
│   ├── _meta.js
│   ├── index.mdx                          → Phase 1 overview — what we'll build, what you'll have at the end
│   ├── choose-server.mdx                  → VPS vs Cloud, Hetzner vs AWS, create a server instance
│   ├── secure-server.mdx                  → Non-root user, SSH key auth, disable password login, UFW firewall
│   ├── nginx.mdx                          → What is Nginx, reverse proxy concept, write server block
│   ├── ssl-https.mdx                      → Point domain to server, Certbot, Let's Encrypt, auto-renewal
│   ├── env-variables.mdx                  → .env file on server, .gitignore, never commit secrets
│   ├── pm2.mdx                            → What is PM2, start app, auto-restart on reboot, view logs
│   └── first-deployment.mdx              → End-to-end walkthrough: create-next-app → server → Nginx → live
│
├── 02-full-production/
│   ├── _meta.js
│   ├── index.mdx                          → Phase 2 overview — what "production ready" actually means
│   ├── docker-overview.mdx               → What Docker solves, image vs container, Dockerfile example (overview only)
│   ├── cicd-overview.mdx                 → What CI/CD is, GitHub Actions flow, push-to-deploy concept (overview only)
│   ├── database.mdx                       → PostgreSQL on server (local-only access) vs Managed DB (RDS/Supabase)
│   ├── file-storage.mdx                   → Why not store uploads on server, AWS S3 vs Cloudflare R2
│   ├── cloudflare-cdn.mdx                → DNS setup, CDN, DDoS protection, free WAF, Cloudflare free tier
│   ├── monitoring.mdx                     → UptimeRobot (uptime), Sentry (errors), reading server logs
│   ├── backup.mdx                         → Why backups matter, cron job + S3 script, how to test a restore
│   └── client-checklist.mdx             → Real project readiness — 10 questions before taking a client project
│
└── cheatsheet.mdx                         → All commands from both phases in one place
```

---

## Page Count

| Section | Pages |
|---|---|
| Root (index + cheatsheet) | 2 |
| 01-mvp | 8 |
| 02-full-production | 9 |
| **Total** | **19 pages** |

---

## Scope Rules (Important)

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

## Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| Section name | Server Deployment | Clear, specific, no jargon |
| Folder structure | Numbered phases (01-mvp, 02-full-production) | Consistent with linux-fundamentals |
| Primary provider | Hetzner (AWS mentioned as alternative) | Cheapest, beginner-friendly |
| Database | PostgreSQL only | Modern stack standard |
| App type in walkthrough | create-next-app (generic Next.js starter) | Simple and clean for walkthrough |
| Docker/CI/CD depth | Overview only | Dedicated sections planned for both |
| Cloudflare | Included in Phase 2 | Free, critical for production, cybersec context |
| Client Checklist | Included in Phase 2 | Prepares learner for real client work |

---

## Key Design Notes

### index.mdx Must Answer: "Why Server? Not Vercel?"

> The site itself (omarsec.com) runs on Vercel. A learner will immediately ask:
> "Vercel is free and easy — why bother with a server?"

The `index.mdx` must answer this clearly before anything else:
- Vercel is for frontend/static — has limits on backend, databases, file storage
- Server = full control — run any language, any database, any background job
- Client projects often need things Vercel cannot provide
- Understanding servers makes you a complete engineer, not just a frontend dev

### Phase 1 Has No Database — Add a Note

Phase 1 deploys a stateless app (no database). Most real projects need one.
The `first-deployment.mdx` must include a clear callout:
> "তোমার app-এ database লাগলে Phase 2 → Database Setup দেখো।"

### first-deployment.mdx — What App to Deploy

App used in walkthrough: **`create-next-app`** (the default Next.js starter)
Reason: Simple, no dependencies, learner can focus on the deployment process — not the app code.

Steps in this page:
1. On local machine: `npx create-next-app@latest myapp`
2. Push to GitHub
3. On server: clone repo, install Node, build
4. Configure PM2
5. Configure Nginx
6. Test live at the domain

### cloudflare-cdn.mdx — Why This Is Critical for a CyberSec Site

Most DevOps tutorials skip Cloudflare. But for a cybersecurity-focused audience:
- Cloudflare free tier = real DDoS protection
- Free WAF = blocks common web attacks (SQLi, XSS) automatically
- CDN = site loads faster globally
- Hides your real server IP (attackers cannot target your server directly)

This page has strong cybersecurity context by nature.

### client-checklist.mdx — What This Contains

10 questions a developer must answer before starting any client deployment:

1. How many daily users? (determines server size)
2. Does the app need a database?
3. Does the app handle file uploads? Where will files go?
4. Does the client have a domain? If not, they need to buy one.
5. Does the app send emails? (Use Resend, SendGrid — never your own mail server)
6. What is the uptime requirement?
7. Who handles security updates after launch?
8. Does the client need automated backups?
9. Is there a staging environment needed before production?
10. What happens if the server goes down at 2am — who is responsible?

---

## CyberSec Angles Per Page

| Page | CyberSec Context |
|---|---|
| `secure-server.mdx` | How bots scan for open SSH ports, brute-force attacks on port 22 |
| `ssl-https.mdx` | MITM attack explained — how HTTPS prevents it |
| `env-variables.mdx` | Real breach examples: .env files leaked on GitHub |
| `docker-overview.mdx` | Container isolation as a security boundary |
| `cicd-overview.mdx` | Supply chain attacks via compromised CI/CD pipelines |
| `database.mdx` | Why DB exposed to public internet = critical vulnerability |
| `file-storage.mdx` | Signed URLs, preventing unauthorized file access |
| `cloudflare-cdn.mdx` | DDoS, WAF, hiding server IP from attackers |
| `backup.mdx` | Ransomware scenario — backups as the last line of defense |

---

## Approval Checklist

- [ ] Phase 1 structure (8 pages) approved
- [ ] Phase 2 structure (9 pages) approved — includes Cloudflare + Client Checklist
- [ ] Scope confirmed (Docker/CI/CD = overview only)
- [ ] `create-next-app` as walkthrough app confirmed
- [ ] Hetzner as primary provider confirmed
- [ ] Ready to create files

Once approved, files will be created in this order:
`index.mdx` → `01-mvp/` (all 8 pages) → `02-full-production/` (all 9 pages) → `cheatsheet.mdx`
