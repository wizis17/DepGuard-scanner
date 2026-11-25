# DepGuard Scanner

A web-based software dependency vulnerability detection and risk assessment platform.

DepGuard lets a developer upload a Node.js project's `package.json` and `package-lock.json`, identifies every direct and transitive dependency with its exact version, checks them against the [OSV](https://osv.dev) vulnerability database, and presents prioritized findings with severity, affected ranges, and fixed versions.

> DepGuard detects **known, published** vulnerabilities. It is not a penetration-testing tool and cannot guarantee that a project is secure.

## MVP scope

- User registration and login
- Create and manage scan projects
- Upload `package.json` and `package-lock.json`
- Parse dependencies (names and exact installed versions)
- Query OSV and match advisories to installed versions
- Dashboard and detailed finding pages
- Scan history and fixed-version information
- Export a basic report (PDF or CSV)
- Evaluation against a controlled test set of vulnerable and patched dependencies

Future work (after the MVP): Python and Maven support, GitHub repository scanning, scheduled monitoring, and additional advisory sources.

## Tech stack

| Layer    | Technology                  |
| -------- | --------------------------- |
| Frontend | React + TypeScript          |
| Backend  | Node.js + Express + TypeScript |
| Database | PostgreSQL + Prisma ORM     |
| Advisory | OSV API                     |

## Repository layout

```
docs/               Project guide, progress tracker, report templates, prototype demo
docker-compose.yml  Local PostgreSQL for development
backend/            Express + TypeScript REST API, Prisma schema and migrations
frontend/           (planned) React dashboard
test-fixtures/      (planned) Controlled vulnerable/patched lockfiles for evaluation
```

## Local development

Requirements: Node.js 22+, Docker Desktop (running).

### 1. Start the database (Docker)

```bash
docker compose up -d --wait db   # starts PostgreSQL 18, waits until healthy
docker compose ps                # STATUS should say "healthy"
```

The container listens on **localhost:5433** (not 5432, so it does not clash with a locally
installed PostgreSQL). Default dev credentials, set in `docker-compose.yml`:

| Setting  | Value                   |
| -------- | ----------------------- |
| Host     | `localhost`             |
| Port     | `5433`                  |
| User     | `depguard`              |
| Password | `depguard_dev_password` |
| Database | `depguard`              |

Data persists in the `pgdata` Docker volume. `docker compose down` stops the database and keeps
the data; `docker compose down -v` deletes it.

### 2. Configure and run the backend

```bash
cd backend
cp .env.example .env     # DATABASE_URL already points at the Docker database
npm install              # also generates the Prisma client
npm run db:migrate       # creates the tables (first run: name the migration, e.g. "init")
npm run dev              # API on http://localhost:4000
```

Check the connection: <http://localhost:4000/api/health/db> should return
`{"status":"ok","database":"connected"}`.

### How the backend connects to the database

```
backend/.env  DATABASE_URL=postgresql://depguard:...@localhost:5433/depguard
     │
     ├─► prisma.config.ts    used by the Prisma CLI (migrate, studio)
     └─► src/config/env.ts   validated at startup ─► src/db/prisma.ts (PrismaClient + pg adapter)
```

### Useful commands (run in `backend/`)

| Command               | What it does                                 |
| --------------------- | -------------------------------------------- |
| `npm run db:up`       | Start the database container                 |
| `npm run db:down`     | Stop it (data kept)                          |
| `npm run db:psql`     | Open a `psql` shell inside the container     |
| `npm run db:studio`   | Browse tables in Prisma Studio               |
| `npm run db:migrate`  | Create/apply a migration after schema edits  |
| `npm run db:reset`    | Drop everything and re-apply all migrations  |
| `npm test`            | Run unit tests (no database needed)          |

To use a GUI client (DBeaver, pgAdmin, TablePlus), connect with the settings in the table above.

## Documentation

- [Project guide](docs/project_20_dependency_vulnerability_dashboard_guide.md)
- [Progress tracker](docs/Project%2020%20Progress%20Tracker.md)
- [Daily & weekly report templates](docs/Project%2020%20Daily%20%26%20Weekly%20Report%20Templates.md)
- [Git & CI/CD workflow](docs/Git%20and%20CI-CD%20Workflow.md)
- Clickable prototype: `docs/DepGuard Scanner Demo.html` (download and open in a browser)

## Status

Phase 1: research and design. See the [progress tracker](docs/Project%2020%20Progress%20Tracker.md).
