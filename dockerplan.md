# Docker Section — Plan & Decisions

> This is a planning file. The actual content will be a new docs section on the OmarSec site.
> Read this first in any new session before working on Docker content.

## What this is
A new documentation section teaching Docker for **web development** (not cybersecurity).
Location: `content/docs/docker/` (Nextra .mdx pages).
Audience: developers who build real web apps and want to use Docker in dev, deploy.

## Key Decisions (IMPORTANT — do not forget)

1. **Language: global simple English only.**
   - Full English. NO Bengali mix for this section (different from other site sections).
   - Short sentences, simple words, so beginners understand.
   - Explain each technical term the first time it appears.

2. **Topic: web dev, NOT cybersecurity.**
   - So this section does NOT use the `## CyberSec Note` block (unlike other sections).

3. **Example stack — grow slowly:**
   - **Part 1–3: Next.js only.** Learn Dockerfile, image, run, volume with one app.
   - **Part 4 (Compose): add Express + PostgreSQL.** This is where multi-container matters.
   - **MongoDB:** shown as an alternative to PostgreSQL (SQL vs NoSQL container).
   - Reason: one thing at a time builds confidence, then layer the full stack.

4. **CI/CD & GitHub Actions: NOT here.** Separate note (`cicd-plan.md`) after Docker is done.

5. **Avoid the word "course".** It feels like school and makes readers want to skip. Use "guide" instead.

6. **Follow DOCS_RULES.md for the .mdx pages:**
   - Semantic slugs (`dockerfile.mdx`), lowercase, hyphens.
   - Short headings (1–3 words). No "Part 1" / numbers in headings. No emojis.
   - Each section: `_meta.js` + `index.mdx` + topic pages.
   - Every page ends with a "Next →" link.
   - Code blocks use `filename="Terminal"`.

7. **Folder structure: one subfolder per Part**, matching the site's existing
   `server-deployment/foundation/` pattern. Each Part is its own folder with its
   own `_meta.js` + `index.mdx`, nested under `content/docs/docker/`:
   ```
   content/docs/docker/
     index.mdx              ← top overview, links to each Part's folder
     _meta.js                ← lists each Part folder
     foundation/              ← Part 1
       index.mdx
       _meta.js
       <topic pages>.mdx
     building-images/          ← Part 2 (folder name = short slug of the Part title)
     data-networking/           ← Part 3
     multi-container/            ← Part 4
     production-deploy/           ← Part 5
     real-scenarios/                ← Part 6
   ```
   Sidebar then shows each Part as its own collapsible group.

---

## Course Outline (Index)

### Part 1 — Foundations (Next.js only)
- What Docker is, why it helps (VM vs Container)
- Install and setup (Windows / WSL2)
- Image, Container, Registry — core ideas
- Run your first container (`run`, `ps`, `stop`, `rm`)
- Essential commands

### Part 2 — Building Images (Next.js only)
- Writing a Dockerfile (layers, cache)
- `docker init` — auto Dockerfile + compose (new command)
- `build`, `tag`, `push` to Docker Hub
- Smaller images (multi-stage build, alpine)
- BuildKit / `docker buildx` (now default, faster)
- Multi-arch build (amd64 / arm64 — ARM server, M1 Mac)
- .dockerignore and best practices

### Part 3 — Data & Networking (Next.js only)
- Volume and bind mount (keeping data)
- Container networking (containers talking to each other)
- Environment variables, `.env`, and secrets

### Part 4 — Multi-container (add Express + PostgreSQL)
- Docker Compose v2 (`docker compose`, not the old hyphen)
- Running app + DB together (Next.js + Express + PostgreSQL)
- MongoDB as an alternative database
- Compose for a dev environment
- Health check, depends_on, restart policy
- Compose `secrets` — passwords safely

### Part 5 — Production & Deploy
- Dev vs Production setup differences
- Reverse proxy (Nginx / Traefik) + SSL
- Logging and monitoring basics
- Security basics (non-root user, image scan)
- Deploy to a VPS / Cloud (by hand, no CI/CD)

### Part 6 — Real Scenarios (problem solving)
- "It works on my machine but not on the server"
- Image getting too big / slow builds
- Database data getting lost
- Port conflicts, permission issues (especially on Windows)
- Problems when deploying to a client server

---

## Real scenarios the reader will face
- Bringing a legacy project into Docker
- Keeping many projects isolated on one machine
- Whole team getting the same environment
- Fast and safe deploy to a client server

---

## Working rules
- One Part at a time. After each Part, a small hands-on task.
- Reader does the task, then we move to the next Part.

---

## Progress
- [x] Part 1 — Foundations (pages live in `content/docs/docker/foundation/`)
- [x] Part 2 — Building Images (pages live in `content/docs/docker/building-images/`)
- [ ] Part 3 — Data & Networking
- [ ] Part 4 — Multi-container
- [ ] Part 5 — Production & Deploy
- [ ] Part 6 — Real Scenarios
