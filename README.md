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
| Backend  | Node.js + Express           |
| Database | PostgreSQL                  |
| Advisory | OSV API                     |

## Repository layout

```
docs/           Project guide, progress tracker, report templates, prototype demo
backend/        (planned) REST API, lockfile parser, OSV client, version matcher
frontend/       (planned) React dashboard
test-fixtures/  (planned) Controlled vulnerable/patched lockfiles for evaluation
```

## Documentation

- [Project guide](docs/project_20_dependency_vulnerability_dashboard_guide.md)
- [Progress tracker](docs/Project%2020%20Progress%20Tracker.md)
- [Daily & weekly report templates](docs/Project%2020%20Daily%20%26%20Weekly%20Report%20Templates.md)
- Clickable prototype: `docs/DepGuard Scanner Demo.html` (download and open in a browser)

## Status

Phase 1: research and design. See the [progress tracker](docs/Project%2020%20Progress%20Tracker.md).
