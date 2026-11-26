# Project 20 Progress Tracker

Created Nov 6, 2026 · Updated Nov 26, 2026

## Where the project stands

The project is at the end of Week 3. The design (3.1–3.3) and parser prototype (3.4) are done and waiting to merge, and most of Week 4's setup was finished early. Update this table every Friday together with the weekly report.

| Item | Now |
| --- | --- |
| Current week | Week 3 of 16 (23–27 Nov); week 1 started Mon 9 Nov 2026 |
| Current phase | Phase 1 — Research and design |
| Current step | 4.1 UI wireframes, then 4.2 frontend setup (also catching up on 1.1–1.3, 2.2, 2.3) |
| Next milestone | Initial application (week 4), due Dec 4, 2026; tag `v0.1-design` |
| Final submission | Week 16, due Feb 26, 2027 |
| Already done | Proposal (PDF); backend, Docker PostgreSQL, Prisma migration, CI (PR #1); report templates (PR #2); parser prototype and system design in guide (`feature/3.4-parser-prototype`) |
| Blockers | Supervisor approval and official report format not yet confirmed (1.1–1.3) |
| Latest reports | `docs/reports/weekly/P20-Weekly-W03-2026-11-27.md`; daily reports in `docs/reports/daily/` |

Status key: **Not started** → **In progress** → **Done**; use **Blocked** when waiting on someone, **Skipped** for optional items dropped from scope.

## 16-week phase tracker

One row per roadmap week; change Status as work moves and paste the proof (commit, file, screenshot) in Evidence.

| Week | Dates (2026–27) | Phase | Deliverable | Status | Evidence |
| --- | --- | --- | --- | --- | --- |
| 1 | 9–13 Nov | Research and design | Approved problem and scope | In progress | Waiting for supervisor confirmation (1.1–1.3) |
| 2 | 16–20 Nov | Research and design | Proposal draft and literature review | In progress | Proposal done: `docs/DepGuard Scanner — Project Proposal.pdf` (`ccae893`); requirements list and literature review not yet drafted |
| 3 | 23–27 Nov | Research and design | Design document (architecture, ERD, UML, workflow) | Done | Guide §5, §9, §10, §15, Appendix A (`fe51f1c`); parser prototype (`4511366`); waiting to merge |
| 4 | 30 Nov–4 Dec | Research and design | Wireframes, project setup, database migrations | In progress | Backend, Prisma migration, Docker, CI: PR #1. To do: wireframes, frontend |
| 5 | 7–11 Dec | Core build | Working login and authorization | Not started |  |
| 6 | 14–18 Dec | Core build | Project management and file upload | Not started |  |
| 7 | 21–25 Dec | Core build | npm manifest and lockfile parser | Not started |  |
| 8 | 28 Dec–1 Jan | Core build | Parser edge cases and tests | Not started |  |
| 9 | 4–8 Jan | Core build | OSV API integration | Not started |  |
| 10 | 11–15 Jan | Core build | Affected-version matching engine | Not started |  |
| 11 | 18–22 Jan | Core build | Findings storage and scan history | Not started |  |
| 12 | 25–29 Jan | Interface and report | Dashboard and finding details | Not started |  |
| 13 | 1–5 Feb | Interface and report | Remediation display and report export | Not started |  |
| 14 | 8–12 Feb | Evaluate and ship | Security, integration and evaluation tests | Not started |  |
| 15 | 15–19 Feb | Evaluate and ship | Deployed MVP and user feedback | Not started |  |
| 16 | 22–26 Feb | Evaluate and ship | Final report, presentation, rehearsal | Not started |  |

Weeks 7 and 8 fall over the year-end holidays; move them if your university closes.

## Step-by-step checklist

Tick each step when its evidence exists; the first unticked step is your current step. Step numbers match the week they belong to.

### Phase 1 — Research and design (weeks 1–4)

- [ ] 1.1 Get the official proposal and final-report format from the supervisor
- [ ] 1.2 Confirm the topic is accepted as a software engineering / security project
- [ ] 1.3 Agree on npm-only MVP and OSV as the data source
- [ ] 1.4 Research SCA concepts and vulnerability databases (OSV, NVD, GitHub Advisory, OWASP Dependency-Check)
- [x] 2.1 Write one-page proposal: problem, objectives, scope, method, expected output — proposal PDF, `ccae893`
- [ ] 2.2 List functional and non-functional requirements and use cases — use cases done (guide §5); requirements list still to do
- [ ] 2.3 Draft literature review comparing existing tools — tool comparison table in the proposal; draft still to do
- [x] 3.1 Draw use-case diagram and activity diagram — guide §5 and §9, `fe51f1c`
- [x] 3.2 Draw system architecture and ERD — guide §8 and §10, `fe51f1c`
- [x] 3.3 Define REST API endpoints and scan status values — guide §15 and §10, `fe51f1c`
- [x] 3.4 Build a tiny parser prototype and test it on a real `package-lock.json` — `backend/src/modules/parser`, `4511366`, 13 tests
- [ ] 4.1 Create UI wireframes (login, projects, upload, dashboard, finding detail, report)
- [ ] 4.2 Set up repo: React + TypeScript, Express + TypeScript, Tailwind — backend done (PR #1); frontend still to do
- [x] 4.3 Set up PostgreSQL, Prisma schema and first migration — PR #1, migration `20261124131355_init`
- [x] 4.4 Add Docker Compose for local development — PR #1, `docker-compose.yml`

### Phase 2 — Core build (weeks 5–11)

- [ ] 5.1 Register and login endpoints with password hashing (bcrypt or argon2)
- [ ] 5.2 Session or JWT handling and protected routes
- [ ] 5.3 Ownership check middleware for projects, scans, findings, reports
- [ ] 6.1 Project CRUD (API and UI)
- [ ] 6.2 File upload: .json only, 5 MB limit, defensive JSON parse
- [ ] 6.3 Clear validation error messages for wrong or malformed files
- [ ] 7.1 Parse lockfile v2/v3 `packages` section (names and exact versions) — mostly done in the 3.4 prototype; connect to upload in week 7
- [ ] 7.2 Mark direct vs transitive using root dependencies — done in the 3.4 prototype; review in week 7
- [ ] 7.3 Support lockfile v1 `dependencies` tree
- [ ] 8.1 Unit tests for parser edge cases (scoped names, links, missing versions, dev deps) — covered by the 3.4 prototype tests; extend in week 8
- [ ] 8.2 Cross-check package.json against lockfile and warn if out of date
- [ ] 9.1 OSV `querybatch` client with chunking, 10 s timeout, retry with backoff
- [ ] 9.2 Fetch full advisory records from `/v1/vulns/{id}` and cache them
- [ ] 9.3 Handle outages: mark scan partial and list unchecked packages
- [ ] 10.1 Semver range matcher for OSV affected ranges and events
- [ ] 10.2 Extract fixed version and severity; show Unknown when missing
- [ ] 10.3 Unit tests: vulnerable, boundary and patched versions
- [ ] 11.1 Save scan, dependency inventory and findings
- [ ] 11.2 Scan history list and compare (new vs resolved findings)

### Phase 3 — Interface and report (weeks 12–13)

- [ ] 12.1 Dashboard: summary tiles by severity, findings table, filters
- [ ] 12.2 Finding detail: advisory, affected range, fixed version, dependency path, source link
- [ ] 13.1 Remediation guidance and suggested upgrade command (never auto-modify)
- [ ] 13.2 Export report as CSV and PDF

### Phase 4 — Evaluate and ship (weeks 14–16)

- [ ] 14.1 Build controlled test set: vulnerable, patched, multiple, transitive, malformed, no-match
- [ ] 14.2 Record expected outcomes and measure coverage, false positives, scan time
- [ ] 14.3 Security tests: ownership, file validation, secrets, error handling
- [ ] 15.1 Deploy with Docker to a hosting platform
- [ ] 15.2 Short user test and feedback questionnaire
- [ ] 15.3 Fix issues found in testing
- [ ] 16.1 Finish thesis chapters 1–6 and appendix (reports, test evidence)
- [ ] 16.2 Screenshots and demo video
- [ ] 16.3 Presentation slides and rehearsal
- [ ] 16.4 Submit final package

## MVP definition of done

The MVP is ready for evaluation when all eleven items below are ticked (guide §19).

- [ ] A user can sign in and manage their own projects
- [ ] A user can upload valid npm dependency files
- [ ] The parser extracts expected direct and transitive dependencies
- [ ] The scanner queries OSV successfully and handles API errors
- [ ] Affected versions are matched correctly against advisory data
- [ ] Findings show traceable source information and do not invent missing severity or fixed versions
- [ ] Scan history is saved and viewable
- [ ] A report can be exported
- [ ] Vulnerable, patched, transitive, malformed and no-match test cases have been evaluated
- [ ] Project ownership, file validation, secrets and error handling have been tested
- [ ] The thesis documents the design, implementation, test method, results and limitations
