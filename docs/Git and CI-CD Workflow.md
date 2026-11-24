# DepGuard Scanner — Git & CI/CD Workflow

A solo-developer workflow for DepGuard Scanner on GitHub (`wizis17/DepGuard-scanner`). It keeps `main` stable, ties every branch to a step in the [progress tracker](Project%2020%20Progress%20Tracker.md), and turns each merged pull request into evidence for the weekly report and the thesis.

## 1. Branches

| Branch | Use | Example |
| --- | --- | --- |
| `main` | Stable, working code. Deploy only from here. | — |
| `feature/<step>-<name>` | New functionality, one tracker step (or a few related ones) | `feature/3.4-parser-prototype` |
| `fix/<name>` | Bug fixes | `fix/lockfile-scoped-names` |
| `docs/<name>` | Docs, diagrams, thesis chapters | `docs/erd-and-use-cases` |

Putting the tracker step number in the branch name makes it easy to fill in the tracker's **Evidence** column later.

Planned branches, in roadmap order:

```text
feature/4-backend-setup            Express + Prisma + Docker DB        (week 4)
feature/4-frontend-setup           React + TypeScript + Tailwind       (week 4)
feature/5-auth                     register, login, ownership checks   (week 5)
feature/6-projects-upload          project CRUD, file upload           (week 6)
feature/7-lockfile-parser          lockfile v1/v2/v3 parsing           (week 7–8)
feature/9-osv-client               querybatch, retries, caching        (week 9)
feature/10-version-matcher         semver range matching               (week 10)
feature/11-scan-history            findings storage, compare scans     (week 11)
feature/12-dashboard               summary tiles, findings table       (week 12)
feature/13-report-export           CSV / PDF export                    (week 13)
```

## 2. Daily workflow

1. Start from the latest `main`.
2. Create a branch for one task.
3. Write code **and its tests** together. This matters most for the parser and the matcher, which the proposal says will be built test-first.
4. Run the checks locally (`npm run typecheck`, `npm test`).
5. Commit with a clear message (section 5).
6. Push the branch and open a pull request into `main`.
7. Wait for CI to pass, then review your own diff on GitHub.
8. Squash-merge, delete the branch, and record the PR link in your daily report.

## 3. Commands

```bash
# 1. Get the latest main
git switch main
git pull origin main

# 2. Create a branch for the task
git switch -c feature/7-lockfile-parser

# 3. Make sure the database is up (only needed for migrations / running the API)
docker compose up -d --wait db

# 4. Check locally before committing
cd backend
npm run typecheck
npm test
cd ..

# 5. Commit (stage specific paths; avoid `git add .` so .env or stray files never slip in)
git add backend/src docs
git status                      # confirm no .env, uploads/ or reports/ are staged
git commit -m "feat(parser): parse lockfile v3 packages section"

# 6. Push and open a PR
git push -u origin feature/7-lockfile-parser
gh pr create --fill --base main   # or open the PR on github.com
```

After the PR is merged:

```bash
git switch main
git pull origin main
git branch -d feature/7-lockfile-parser
```

## 4. Database changes (Prisma)

Schema changes need extra care, because a migration that has already been applied cannot be quietly edited.

- Change `backend/prisma/schema.prisma`, then run `npm run db:migrate` and give the migration a clear name (for example `add_scan_error_message`).
- Commit the schema **and** the new `prisma/migrations/<timestamp>_<name>/` folder in the same PR.
- Never edit or delete a migration that is already on `main`. Fix it with a new migration instead.
- If your local database gets into a bad state, `npm run db:reset` rebuilds it from the migrations. This deletes your local data only.
- CI applies every migration to a fresh database (section 6), so a broken migration fails the PR before it reaches `main`.

## 5. Commit messages

Format: `type(scope): short description`, in the imperative mood ("add", not "added").

| Type | Use for |
| --- | --- |
| `feat` | New functionality |
| `fix` | Bug fix |
| `test` | Adding or changing tests only |
| `refactor` | Restructuring without changing behaviour |
| `docs` | README, guides, thesis, diagrams |
| `chore` | Tooling, dependencies, config |
| `ci` | GitHub Actions workflows |

Scopes: `backend`, `frontend`, `db`, `auth`, `upload`, `parser`, `osv`, `matcher`, `report`, `docs`.

```text
feat(db): add Prisma schema for users, projects, scans and findings
feat(parser): mark direct vs transitive dependencies
fix(matcher): treat "introduced: 0" as affecting every earlier version
test(parser): add scoped package and missing-version cases
docs: add ERD and use-case diagram
ci: run backend tests against PostgreSQL service
```

## 6. Continuous integration (CI)

The file is [`.github/workflows/ci.yml`](../.github/workflows/ci.yml). It runs on every push to a pull request and on every push to `main`.

**Backend job:**

1. Start a throwaway PostgreSQL 18 service container.
2. `npm ci` (which also generates the Prisma client).
3. `prisma migrate deploy`, to prove every migration applies to an empty database.
4. `npm run typecheck`
5. `npm test`
6. `npm run build`

**To add later:**

- a `frontend` job (typecheck, test, build) once `frontend/` exists in week 4
- ESLint and Prettier checks once a lint config is added
- integration tests that use the real database (weeks 5–11; `DATABASE_URL` is already available in CI)

Merge only when CI is green.

## 7. Continuous deployment (CD) — week 15

There is no deployment yet. When the MVP is ready to host:

- Deploy **only from `main`**, triggered by a merge (a `deploy.yml` workflow) or by the host's GitHub integration.
- Build the Docker image, run `npx prisma migrate deploy` against the production database, then start the API.
- Check `GET /api/health/db` after each deploy to confirm the database connection works.
- Keep `DATABASE_URL`, `JWT_SECRET` and hosting tokens in **GitHub → Settings → Secrets and variables → Actions**. Never commit `.env`.
- Use a different database password from the development default in `docker-compose.yml`.

## 8. Protect `main` (one-time setup)

GitHub → repository **Settings → Branches → Add branch ruleset** (or *branch protection rule*) for `main`:

- [x] Require a pull request before merging. Set **required approvals to 0**, because GitHub doesn't let you approve your own PR.
- [x] Require status checks to pass, and select **`Backend`** (it appears after CI has run once).
- [x] Block force pushes.
- [ ] Optional: allow only squash merges (Settings → General → Pull Requests), so each PR becomes one commit on `main`.

## 9. Milestone tags (thesis evidence)

Tag `main` when a roadmap deliverable is done. It gives the thesis and your supervisor a fixed snapshot to refer to.

```bash
git tag -a v0.1-design -m "Week 3–4: design document and project setup"
git push origin v0.1-design
```

Suggested tags: `v0.1-design` (wk 4), `v0.2-auth-upload` (wk 6), `v0.3-detection` (wk 10), `v0.4-ui-report` (wk 13), `v1.0-mvp` (wk 15).

## 10. Solo developer rules

- Keep `main` working. Don't develop directly on it.
- One branch per tracker step. Keep PRs small enough to review in one sitting.
- Don't merge while CI is failing.
- Commit tests in the same PR as the code they cover.
- Never commit `.env`, uploaded lockfiles (`uploads/`), generated reports (`reports/`) or secrets.
- Put the PR link in the tracker's Evidence column and in your daily report.

## Quick checklist

- [ ] Branch from up-to-date `main` (`feature/<step>-<name>`).
- [ ] Implement the change with tests.
- [ ] `npm run typecheck` and `npm test` pass locally.
- [ ] Schema changed? Migration folder committed.
- [ ] Commit with `type(scope): message` and push.
- [ ] Open a PR into `main`; CI is green.
- [ ] Review the diff, squash-merge, delete the branch.
- [ ] Record the PR link in the tracker and daily report.
