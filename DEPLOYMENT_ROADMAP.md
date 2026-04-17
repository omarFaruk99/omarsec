# Production Deployment Roadmap
> **For:** A Frontend Developer (React/Next.js) learning to deploy and manage real-world applications on servers like a Software Engineer.

---

## About This Person

| Property | Details |
|---|---|
| **Current Skill** | Can build Frontend projects with React and Next.js |
| **Goal** | Learn production-level server deployment to work on client projects |
| **Project Scale** | Small to Medium (e.g., SaaS tools, portfolio sites, client web apps) |
| **Linux Experience** | Basic — no server hardening or permission management experience yet |
| **Docker Experience** | Basic understanding, not yet proficient |
| **Database Strategy** | No prior decision — needs to learn both options (same server vs. managed) |
| **Target Providers** | AWS EC2, Contabo, Hetzner (and similar VPS/Cloud providers) |

---

## Learning Strategy

> **Start with MVP, then evolve to Full Production.**

This means:
1. First, manually deploy one project to a real server without any automation. This builds the foundational mental model.
2. Then, apply Docker, CI/CD, and monitoring on top of what you already understand.

Jumping to advanced automation (Docker + CI/CD) without understanding the manual process is a common mistake. When something breaks, you will not know where to look.

The rule: **Understand before you automate.**

---

## The Two Phases

---

## Phase 1 — MVP Deployment (Manual, Foundational)

**Goal:** Get a Next.js app live on a real server. Learn the core building blocks manually.

**Time Estimate:** 2–4 weeks of focused practice.

---

### Step 1: Choose and Provision a Server

**What to learn:**
- The difference between a VPS (Virtual Private Server) and Cloud (AWS EC2)
- How to create a new server instance (Ubuntu 22.04 LTS recommended)
- What an IP address, SSH port, and root user means in a server context

**Providers to start with:**
- **Contabo or Hetzner** — Cheapest option, great for learning (€4–€6/month)
- **AWS EC2 (Free Tier)** — 12 months free, but more complex interface

**Deliverable:** You have a running Ubuntu server with an IP address.

---

### Step 2: Secure the Server (Server Hardening Basics)

**Why this matters:** A fresh server connected to the internet is immediately targeted by bots. Within minutes of creation, attackers are already attempting to log in via brute-force.

**What to learn:**
- Create a non-root user with `sudo` privileges (never work as root)
- Set up SSH Key Authentication (disable password login)
- Configure UFW Firewall — only allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS)
- Change the default SSH port (optional but recommended)

**Key commands to understand:**
```bash
# Create a new user
adduser yourname
usermod -aG sudo yourname

# Set up SSH key
ssh-copy-id yourname@server-ip

# Configure firewall
ufw allow OpenSSH
ufw allow 80
ufw allow 443
ufw enable
```

**Deliverable:** You can SSH into the server as a non-root user with a key, not a password.

---

### Step 3: Install Runtime Dependencies

**What to install on the server:**
- **Node.js** (via `nvm` — Node Version Manager) — to run your Next.js app
- **Git** — to pull your code from GitHub
- **Nginx** — the web server (explained in next step)

**What to learn:**
- What `nvm` is and why it's better than installing Node.js directly
- How to clone a private or public GitHub repo on a server

**Deliverable:** Node.js is installed on the server and you can run `node -v`.

---

### Step 4: Set Up Nginx as a Reverse Proxy

**Why this matters:** Your Next.js app runs on port `3000` internally. You cannot expose port `3000` directly to the internet — it is insecure and does not support HTTPS by default. Nginx acts as a "gatekeeper" that sits in front of your app.

```
Internet → Port 443 (HTTPS) → Nginx → Port 3000 (Your App)
```

**What to learn:**
- What a reverse proxy is and why it is used
- How to write a basic Nginx server block (virtual host config)
- How to test and reload Nginx config

**Sample Nginx config:**
```nginx
# /etc/nginx/sites-available/yourapp
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Deliverable:** Visiting `http://your-server-ip` shows your Next.js app.

---

### Step 5: Add HTTPS with a Free SSL Certificate

**Why this matters:** Without HTTPS, browsers show a "Not Secure" warning. All production sites must use HTTPS. Google also penalizes HTTP-only sites in search rankings.

**Tool:** Certbot (Let's Encrypt) — completely free.

**What to learn:**
- How SSL/TLS certificates work conceptually
- How to point a domain name to your server IP (DNS A Record)
- How to use Certbot to auto-issue and auto-renew certificates

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

**Deliverable:** Your app is live at `https://yourdomain.com` with a valid SSL certificate.

---

### Step 6: Keep the App Running with PM2

**Why this matters:** If you start your app with `npm start` and close the terminal, the app stops. Also, if your app crashes, it will not restart itself.

**Tool:** PM2 — a Process Manager for Node.js applications.

**What to learn:**
- How to start, stop, restart, and monitor an app with PM2
- How to make PM2 auto-start on server reboot
- How to read app logs via PM2

```bash
npm install -g pm2
pm2 start npm --name "myapp" -- start
pm2 startup   # auto-start on reboot
pm2 save
pm2 logs myapp
```

**Deliverable:** Your app stays alive after closing the terminal and restarts automatically after a server reboot.

---

### Step 7: Environment Variables (Secrets Management)

**Why this matters:** API keys, database passwords, and secrets must NEVER be committed to GitHub. They must be stored securely on the server.

**What to learn:**
- How to create a `.env` file on the server directly
- How to use `.gitignore` to prevent secrets from being pushed to GitHub
- Basic understanding of what environment variables are

**Deliverable:** Your app reads secrets from a `.env` file that is only on the server, never in GitHub.

---

### Phase 1 Milestone

After Phase 1, you will be able to:
- Provision and secure a Linux server from scratch
- Deploy any Next.js/Node.js app manually
- Configure Nginx and HTTPS
- Manage the app process with PM2
- Handle secrets properly

This is the skill level of a junior DevOps engineer or a full-stack developer who can "ship" projects.

---

## Phase 2 — Full Production (Automated, Professional)

**Goal:** Automate everything. Make deployments reliable, repeatable, and scalable.

**Time Estimate:** 4–8 weeks after completing Phase 1.

---

### Step 8: Containerize with Docker

**Why this matters:** "It works on my machine" is the most famous problem in software engineering. Docker solves this by packaging your app with all its dependencies into a single container that runs identically everywhere.

**What to learn:**
- What a Docker image and container is
- How to write a `Dockerfile` for a Next.js app
- How to use `docker-compose` to run your app + database together
- Basic Docker commands (`build`, `run`, `ps`, `logs`, `stop`)

**Sample Dockerfile for Next.js:**
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**Deliverable:** Your app runs inside a Docker container on the server.

---

### Step 9: Database Setup

**Two options (learn both, choose based on project):**

#### Option A: Database on the Same Server (Small Projects)
- Install PostgreSQL or MySQL directly on the server
- Configure it to only accept local connections (not exposed to internet)
- Create a database user with limited permissions

**Good for:** Learning, small projects, low budget.

#### Option B: Managed Database Service (Professional Projects)
- Use AWS RDS, PlanetScale, or Supabase
- The database lives on a separate, managed server
- Automatic backups, scaling, and security handled by the provider

**Good for:** Client projects, production apps, when uptime matters.

**Recommendation:** Learn Option A first to understand how databases work on a server. Then migrate to Option B for any real client work.

---

### Step 10: CI/CD Pipeline with GitHub Actions

**Why this matters:** Manually SSH-ing into the server to run `git pull && npm run build` every time you push code is inefficient and error-prone. CI/CD automates this.

**What CI/CD means:**
- **CI (Continuous Integration):** Every time you push code, it is automatically tested.
- **CD (Continuous Deployment):** If tests pass, the code is automatically deployed to the server.

**Tool:** GitHub Actions (free for public repos, included in GitHub).

**Basic workflow:**
```
You push to main branch
    → GitHub Actions triggers
    → Runs your tests
    → If tests pass: SSH into server, pull new code, rebuild, restart PM2
    → If tests fail: Stops. Nothing is deployed. You get an email.
```

**Deliverable:** Pushing code to GitHub automatically deploys it to the server without any manual steps.

---

### Step 11: Object Storage for Files

**Why this matters:** If users upload images or files and you store them on the server disk, you have two problems:
1. If the server crashes, all files are lost.
2. When you scale to multiple servers, files are not shared between them.

**Solution:** Store all user-uploaded files in an Object Storage service.

**Tools:**
- **AWS S3** — Industry standard. Very reliable.
- **Cloudflare R2** — Cheaper than S3, no egress fees. Great alternative.

**Deliverable:** User uploads are stored in cloud storage, not on the server disk.

---

### Step 12: Monitoring and Alerting

**Why this matters:** In production, you need to know when something goes wrong — before your client calls you.

**What to set up:**

| Tool | Purpose | Cost |
|---|---|---|
| UptimeRobot | Pings your site every 5 minutes and alerts you if it goes down | Free |
| Grafana + Prometheus | Detailed server metrics (CPU, RAM, disk) | Free (self-hosted) |
| Sentry | Catches JavaScript errors in your app and reports them | Free tier |
| Logrotate | Prevents log files from filling up your server disk | Free (built into Linux) |

**Deliverable:** You receive a notification (email or Telegram) if your site goes down or throws critical errors.

---

### Step 13: Backup Strategy

**Why this matters:** Servers can fail. Databases can get corrupted. Without backups, you lose everything.

**What to set up:**
- Automated daily database backups (export and upload to AWS S3 or similar)
- Test that backups can be restored (a backup you never tested is not a real backup)
- Server snapshot (most VPS providers offer this feature)

**Deliverable:** A cron job runs every night to back up the database to cloud storage.

---

### Phase 2 Milestone

After Phase 2, you will be able to:
- Containerize any app with Docker
- Set up and manage a production database (both same-server and managed)
- Build a full CI/CD pipeline with GitHub Actions
- Implement file storage, monitoring, and automated backups

This is the skill level of a mid-level Backend or DevOps engineer. This is what "production level" means.

---

## The Full Picture (Visual Summary)

```
┌─────────────────────────────────────────────────────────────┐
│                        INTERNET                             │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    ┌──────▼──────┐
                    │   Cloudflare │  (DNS + DDoS Protection)
                    └──────┬──────┘
                           │
                    ┌──────▼──────┐
                    │    Nginx     │  (Reverse Proxy + SSL)
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │                         │
       ┌──────▼──────┐          ┌──────▼──────┐
       │  Next.js App │          │  Next.js App │  (Multiple instances)
       │  (PM2/Docker)│          │  (PM2/Docker)│
       └──────┬──────┘          └──────┬──────┘
              │                         │
              └────────────┬────────────┘
                           │
                    ┌──────▼──────┐
                    │  PostgreSQL  │  (Database)
                    └─────────────┘

Separately:
  - GitHub Actions → Auto deploy on push
  - AWS S3 / R2   → File Storage
  - UptimeRobot   → Uptime Monitoring
  - Sentry        → Error Tracking
  - Cron Job      → Daily DB Backup to S3
```

---

## Recommended Learning Order

```
Week 1–2   →  Secure a server + SSH + Firewall + Nginx
Week 3–4   →  Deploy a Next.js app manually + SSL + PM2
Week 5–6   →  Docker basics + Dockerize your app
Week 7–8   →  Database setup + Environment variables
Week 9–10  →  GitHub Actions CI/CD pipeline
Week 11–12 →  Monitoring + Backups + Object Storage
Week 13+   →  Client Projects
```

---

## Technologies Used (Full Stack of Tools)

| Category | Tool | Why |
|---|---|---|
| Server | Ubuntu 22.04 LTS | Most stable and widely supported |
| Web Server | Nginx | Industry standard reverse proxy |
| Process Manager | PM2 | Keeps Node.js apps alive |
| SSL | Let's Encrypt (Certbot) | Free and automatic |
| Containerization | Docker + Docker Compose | Consistent environments |
| CI/CD | GitHub Actions | Free and deeply integrated with GitHub |
| Database | PostgreSQL | Most powerful open-source relational DB |
| File Storage | Cloudflare R2 or AWS S3 | Scalable, durable file storage |
| Monitoring | UptimeRobot + Sentry | Uptime and error tracking |
| DNS/CDN | Cloudflare | Free DDoS protection and CDN |

---

## Providers Compared

| Provider | Price | Best For | Notes |
|---|---|---|---|
| **Hetzner** | €4–€6/month | Learning + Small Projects | Best value in Europe |
| **Contabo** | €5–€8/month | Learning + Small Projects | Good storage, slower support |
| **AWS EC2** | Free (12 months) then variable | Professional / Client Work | Most employers use AWS |
| **DigitalOcean** | $6/month | Beginners | Very clean UI, great docs |
| **Vultr** | $6/month | Beginners | Similar to DigitalOcean |
| **Railway / Render** | Free–$5/month | Quick demos | Not for production |

> **Recommendation:** Start with **Hetzner** (cheapest) for learning. Move to **AWS** when working with clients, as most companies use AWS.

---

## What NOT To Do (Common Mistakes)

1. **Never run your app as the root user.** If your app gets hacked, the attacker gets full server access.
2. **Never commit `.env` files to GitHub.** Your database password and API keys will be exposed publicly.
3. **Never open all ports on your firewall.** Only open what you need (22, 80, 443).
4. **Never skip backups.** Test your backups regularly — a backup you never restored is not a real backup.
5. **Never store user-uploaded files on the server disk.** Use object storage (S3/R2).
6. **Never skip HTTPS.** Always use SSL, even in staging environments.

---

## Questions to Ask When Starting a New Client Project

Before you start any client project deployment, answer these questions:

- [ ] How many users will use this app daily?
- [ ] Does the app need a database? If yes, what type (PostgreSQL, MySQL, MongoDB)?
- [ ] Does the app handle file uploads? If yes, where will files be stored?
- [ ] Does the client have a domain name? If not, they need to buy one.
- [ ] Does the client need email sending? (Use Resend, SendGrid, or Postmark — never your own mail server)
- [ ] What is the uptime requirement? (99.9% uptime means max 8 hours downtime/year)
- [ ] Does the client need automatic backups?
- [ ] Who is responsible for security updates after launch?

---

*Last updated: April 2026*
*Created for: Omar Faruk | omarsec.com*
