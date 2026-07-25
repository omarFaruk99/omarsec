# CI/CD Section — Plan

Status: **written**. Five pages exist, build passes.

## Decision

Standalone top-level section. Docker only, registry-based. PM2 removed entirely.

- Folder: `content/docs/ci-cd/`
- Sidebar: `CI/CD`, between Server Deployment and Docker
- Prerequisite: Docker knowledge, stated in the first callout of `index.mdx`

## The method taught

Not "SSH in and rebuild". The standard registry flow:

```
push → GitHub Actions builds the image → pushes to GHCR → server pulls and runs
```

The server holds **two files only** — `compose.yaml` and `.env`. No source code, no Node,
no git clone. Deploy = change one line in `.env` and `docker compose up -d`.
Rollback = put the old tag back. Ten seconds, no rebuild.

## Pages

| # | File | Covers |
|---|---|---|
| 1 | `index.mdx` | Docker requirement, the four problems with building on the server, the new flow |
| 2 | `how-it-works.mdx` | CI vs CD, **where the build belongs**, runner, registry, image tags, workflow anatomy, `needs` |
| 3 | `setup.mdx` | Server folder, Actions-only SSH key, 3 secrets, non-interactive SSH test, GHCR login |
| 4 | `pipeline.mdx` | One Next.js app: standalone output, Dockerfile, `.dockerignore`, `ci.yml`, `deploy.yml`, the TAG trick |
| 5 | `production.mdx` | Monorepo, web + api + Postgres, Prisma migrations, backup, rollback, GHCR limits, troubleshooting |

Pages 1-3 apply to everyone. Page 4 is one app. Page 5 is the full stack.

## Assumed, not taught

Page 3 lists these and moves on:

- Docker and Docker Compose installed
- The app already runs by hand with `docker compose up -d`
- A non-root user with SSH and docker access
- Nginx in front (optional)

Server provisioning, Docker install, and PostgreSQL install are not CI/CD and were cut.

## Production rules taught

| Rule | Page | Why |
|---|---|---|
| Build on the runner, not the server | 1, 2 | reproducible, free, no RAM cost, no code on the server |
| Tag by commit SHA, not just `latest` | 2 | `latest` names nothing, so there is nothing to roll back to |
| `needs: build` | 2, 4 | the server is not touched until the image exists in the registry |
| `set -e` | 4 | without it a failed step still reports green |
| `concurrency` | 4 | two deploys cannot fight over the same `.env` |
| pinned action versions | 2 | `@main` lets a stranger change your pipeline |
| health check loop with `curl -f` | 4, 5 | `up -d` returns before the container has proven it stays alive |
| rollback to the previous tag | 4, 5 | with the honest caveat that it does not undo migrations |
| `output: 'standalone'` + alpine + `npm prune` | 4, 5 | ~1 GB down to ~150 MB |
| `.dockerignore` including `.env` | 4 | otherwise secrets ship inside the image |
| non-root `USER` in the Dockerfile | 4 | container escape should not start from root |
| `prisma migrate deploy`, never `dev` | 5 | `dev` can drop the production database |
| pull → backup → migrate → up | 5 | shortest possible window of new schema with old code |
| backward-compatible migrations | 5 | rename needs three deploys, drop needs two |
| `db` not `localhost` in `DATABASE_URL` | 5 | inside a container `localhost` is the container itself |
| named volume for Postgres | 5 | without it, deploy wipes the database |
| no host port on the db service | 5 | scanners find open 5432 within hours |

## CyberSec Note angles

| Page | Angle |
|---|---|
| 2 | Unpinned third-party actions — the `tj-actions/changed-files` compromise |
| 3 | Repo write access is server access; `~/.docker/config.json` is base64, not encrypted |
| 4 | Image layers are readable; deleted files persist in earlier layers; `NEXT_PUBLIC_` |
| 5 | The pipeline holds the database; protect `main`; move backups off the server |

## Verified facts

GHCR free tier, from GitHub's billing docs: public packages are unlimited; **GitHub Free
private packages get 500 MB storage and 1 GB monthly data transfer**. Page 5 states this
and gives three mitigations.

## Deliberately left out

Kubernetes · staging environments · blue-green and canary · self-hosted runners ·
automated tests in CI (no test suite in this project) · PM2 · server provisioning

## Possible later additions

- Slack or email notification on failed deploy
- Scheduled encrypted backup upload to S3 (page 5 names the need, does not implement it)
- A staging environment on a second branch
