# Project : Daily & Weekly Report Templates

Created Nov 6, 2026 · Updated Nov 25, 2026 (added Git/PR/CI evidence, tracker steps, and DepGuard's own dependency audit)

## How to use these templates

Fill in the daily report at the end of each working day (10 minutes). Fill in the weekly report every Friday (30 minutes), using that week's daily reports. Copy the template below the line into a new file; don't edit the template itself.

| Report | When                                  | File                                               | Who reads it                            |
| ------ | ------------------------------------- | -------------------------------------------------- | --------------------------------------- |
| Daily  | End of each working day               | `docs/reports/daily/P20-Daily-YYYY-MM-DD.md`       | You (development log, guide §20 step 7) |
| Weekly | Friday, before the supervisor meeting | `docs/reports/weekly/P20-Weekly-W##-YYYY-MM-DD.md` | Supervisor, then thesis appendix        |

Commit reports on a `docs/` branch or alongside the day's work, for example `docs: add daily report 2026-11-25`. That way the Git history shows when each one was written.

Rules that keep the reports useful as thesis evidence:

- Write facts, not effort. Name the commit, PR, CI run, test, screenshot or file that proves each item.
- Tie every task to its [progress tracker](Project%2020%20Progress%20Tracker.md) step (for example 7.1) and every week to its roadmap row (guide §16), so delays show up early.
- Use the PR link as the main evidence for code. A merged PR with green CI proves the code builds and passes its tests. See the [Git & CI/CD workflow](Git%20and%20CI-CD%20Workflow.md).
- Record scanner numbers exactly as measured, with the date the advisory data was taken.
- Log each decision with its reason. These become the "design decisions" section of Chapter 4.

16-week roadmap reference:

| Week | Dates        | Planned deliverable                   | Branch (workflow §1)                                   |
| ---- | ------------ | ------------------------------------- | ------------------------------------------------------ |
| 1    | 9–13 Nov     | Approved problem and scope            | —                                                      |
| 2    | 16–20 Nov    | Proposal draft                        | —                                                      |
| 3    | 23–27 Nov    | Design document                       | `docs/design-document`, `feature/3.4-parser-prototype` |
| 4    | 30 Nov–4 Dec | Initial application                   | `feature/4-backend-setup`, `feature/4-frontend-setup`  |
| 5    | 7–11 Dec     | Working login                         | `feature/5-auth`                                       |
| 6    | 14–18 Dec    | Project module and file upload        | `feature/6-projects-upload`                            |
| 7    | 21–25 Dec    | Dependency inventory (parser)         | `feature/7-lockfile-parser`                            |
| 8    | 28 Dec–1 Jan | Tested parser                         | `feature/7-lockfile-parser` (continued)                |
| 9    | 4–8 Jan      | Advisory lookup (OSV)                 | `feature/9-osv-client`                                 |
| 10   | 11–15 Jan    | Detection engine (version matching)   | `feature/10-version-matcher`                           |
| 11   | 18–22 Jan    | Scan module and history               | `feature/11-scan-history`                              |
| 12   | 25–29 Jan    | Dashboard and finding details         | `feature/12-dashboard`                                 |
| 13   | 1–5 Feb      | Remediation display and report export | `feature/13-report-export`                             |
| 14   | 8–12 Feb     | Test evidence                         | `feature/14-evaluation`                                |
| 15   | 15–19 Feb    | Deployed MVP                          | `feature/15-deploy`                                    |
| 16   | 22–26 Feb    | Submission package                    | `docs/final-thesis`                                    |

Milestone tags (workflow §9): `v0.1-design` (wk 4) · `v0.2-auth-upload` (wk 6) · `v0.3-detection` (wk 10) · `v0.4-ui-report` (wk 13) · `v1.0-mvp` (wk 15).

## Daily report template

---

### Daily Report — [YYYY-MM-DD, Day]

| Field             | Entry                                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Student           | [Tang KavTheng, ID: 34]                                                                                                                                             |
| Roadmap week      | Week [#] of 16 — planned deliverable: [from roadmap]                                                                                                                |
| Tracker step(s)   | [e.g. 7.1, 7.2]                                                                                                                                                     |
| Branch            | [e.g. `feature/7-lockfile-parser`]                                                                                                                                  |
| Hours worked      | [e.g. 4.5 h]                                                                                                                                                        |
| Main module today | [Setup / DevOps · Database · Authentication · Project management · File intake · Parser · OSV lookup · Version matching · Dashboard · Reporting · Testing · Thesis] |
| Overall status    | [On track / Slightly behind / Blocked]                                                                                                                              |

**1. Planned for today** (copy from yesterday's "Plan for tomorrow")

- [ ] [Task 1]
- [ ] [Task 2]
- [ ] [Task 3]

**2. Completed today**

| Task                                        | Tracker step | Module   | Evidence (commit, PR, test, screenshot, file) |
| ------------------------------------------- | ------------ | -------- | --------------------------------------------- |
| [e.g. Parse lockfile v3 "packages" section] | [7.1]        | Parser   | [commit a1b2c3d; 6 unit tests pass]           |
| [Task]                                      | [Step]       | [Module] | [Evidence]                                    |

**3. In progress**

| Task   | % done     | What is left     |
| ------ | ---------- | ---------------- |
| [Task] | [e.g. 60%] | [Remaining work] |

**4. Git and CI today**

| Item                          | Entry                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------- |
| Commits                       | [short hash — message, e.g. `a1b2c3d feat(parser): parse lockfile v3 packages`] |
| Pull request                  | [None / Opened #N / Updated #N / Merged #N — link]                              |
| CI result                     | [Not run / Pass / Fail — reason and fix]                                        |
| Database migrations           | [None / `20261124_init` — what it changes]                                      |
| Dependencies added or changed | [None / package@version — why]                                                  |

**5. Tests run today**

| Test / test case                       | Expected     | Actual       | Result        |
| -------------------------------------- | ------------ | ------------ | ------------- |
| [e.g. `npm test` — backend unit tests] | [All pass]   | [4/4 pass]   | [Pass / Fail] |
| [e.g. Case 2 — patched lodash]         | [0 findings] | [0 findings] | [Pass / Fail] |

**6. Problems and blockers**

| Problem                                                | Impact                   | What I tried                       | Help needed from                |
| ------------------------------------------------------ | ------------------------ | ---------------------------------- | ------------------------------- |
| [e.g. OSV querybatch returns no severity for some IDs] | [Severity shows Unknown] | [Fetch /v1/vulns/{id} for details] | [None / Supervisor / Classmate] |

**7. Decisions made**

| Decision                           | Reason                            | Alternatives considered |
| ---------------------------------- | --------------------------------- | ----------------------- |
| [e.g. Store dependencies per scan] | [Keeps exact historical versions] | [Shared package table]  |

**8. Things learned / notes for the thesis**

- [Concept, API behaviour or reference to cite, with source and access date]

**9. Plan for tomorrow**

- [ ] [Task 1 — tracker step]
- [ ] [Task 2 — tracker step]

---

## Weekly report template

---

### Weekly Report — Week [#] of 16 ([YYYY-MM-DD] to [YYYY-MM-DD])

| Field                         | Entry                                                                              |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| Student                       | Tang KavTheng, ID: 34                                                              |
| Supervisor                    | LayRethy                                                                           |
| Project                       | Web-Based Software Dependency Vulnerability Detection and Risk Assessment Platform |
| Repository                    | github.com/wizis17/DepGuard-scanner                                                |
| Planned deliverable (roadmap) | [e.g. Week 7 — Dependency inventory]                                               |
| Deliverable status            | [Done / Partly done / Not started]                                                 |
| Tracker steps completed       | [e.g. 7.1, 7.2 — and steps still open: 7.3]                                        |
| Milestone tag                 | [None / `v0.1-design` — commit hash]                                               |
| Hours this week               | [Total from daily reports]                                                         |
| Schedule                      | [On track / [#] days behind / [#] days ahead]                                      |

**1. Summary** (3 sentences maximum)

[What was finished, what isn't, and the single most important issue.]

**2. Work completed**

| Task   | Tracker step | Module   | Evidence                               | Daily report date |
| ------ | ------------ | -------- | -------------------------------------- | ----------------- |
| [Task] | [Step]       | [Module] | [Commit / PR / screenshot / test file] | [YYYY-MM-DD]      |

**3. Pull requests this week**

| PR          | Title                                                                     | Tracker step | CI            | Status          |
| ----------- | ------------------------------------------------------------------------- | ------------ | ------------- | --------------- |
| [#N — link] | [e.g. feat(backend): backend setup with Prisma, Docker PostgreSQL and CI] | [4.2–4.4]    | [Pass / Fail] | [Merged / Open] |

Main branch CI at end of week: [Pass / Fail — link to latest run]

**4. MVP definition-of-done progress** (tick what is now true, guide §19)

- [ ] User can sign in and manage their own projects
- [ ] User can upload valid npm dependency files
- [ ] Parser extracts expected direct and transitive dependencies
- [ ] Scanner queries OSV and handles API errors
- [ ] Affected versions are matched correctly against advisory data
- [ ] Findings show traceable sources and never invent severity or fixed versions
- [ ] Scan history is saved and viewable
- [ ] A report can be exported
- [ ] Vulnerable, patched, transitive, malformed and no-match cases evaluated
- [ ] Ownership, file validation, secrets and error handling tested
- [ ] Thesis documents design, implementation, test method, results and limitations

**5. Scanner test results** (from week 9 onward)

Advisory data taken on: [YYYY-MM-DD] · Source: [OSV API version / snapshot]

| Test case                 | Expected findings | Detected | False positives | Scan time (ms) | Result        |
| ------------------------- | ----------------- | -------- | --------------- | -------------- | ------------- |
| 1 Vulnerable version      | [#]               | [#]      | [#]             | [#]            | [Pass / Fail] |
| 2 Patched version         | 0                 | [#]      | [#]             | [#]            | [Pass / Fail] |
| 3 Multiple dependencies   | [#]               | [#]      | [#]             | [#]            | [Pass / Fail] |
| 4 Transitive dependencies | [#]               | [#]      | [#]             | [#]            | [Pass / Fail] |
| 5 Malformed files         | Rejected          | [Result] | —               | [#]            | [Pass / Fail] |
| 6 No matching advisory    | 0                 | [#]      | [#]             | [#]            | [Pass / Fail] |

Precision = TP ÷ (TP + FP) = [#]% · Recall (detection coverage) = TP ÷ (TP + FN) = [#]%

**6. DepGuard's own dependency health** (run `npm audit` in `backend/` and later `frontend/`)

| Date         | Critical | High | Moderate | Low | Affected package (path)                              | Action                                                 |
| ------------ | -------- | ---- | -------- | --- | ---------------------------------------------------- | ------------------------------------------------------ |
| [YYYY-MM-DD] | [#]      | [#]  | [#]      | [#] | [e.g. effect via prisma → @prisma/config (dev only)] | [Fixed / Accepted — reason / Waiting for upstream fix] |

A security tool should track its own dependencies. Any finding you accept goes into the thesis limitations section, together with the reason.

**7. Risks and issues**

| Risk or issue                           | Likelihood            | Impact                | Mitigation / fallback                                 |
| --------------------------------------- | --------------------- | --------------------- | ----------------------------------------------------- |
| [e.g. OSV rate limits slow large scans] | [Low / Medium / High] | [Low / Medium / High] | [Batch queries, cache advisories, retry with backoff] |

**8. Key decisions this week**

| Decision   | Reason   | Thesis chapter             |
| ---------- | -------- | -------------------------- |
| [Decision] | [Reason] | [e.g. Ch. 4 System Design] |

**9. Thesis writing progress**

| Chapter                        | Status                                          | Pages / words this week |
| ------------------------------ | ----------------------------------------------- | ----------------------- |
| 1 Introduction                 | [Not started / Drafting / Draft done / Revised] | [#]                     |
| 2 Literature Review            | [Status]                                        | [#]                     |
| 3 Methodology and Requirements | [Status]                                        | [#]                     |
| 4 System Analysis and Design   | [Status]                                        | [#]                     |
| 5 Implementation and Testing   | [Status]                                        | [#]                     |
| 6 Conclusion and Future Work   | [Status]                                        | [#]                     |

**10. Questions for supervisor**

1. [Question that needs a decision or approval]
2. [Question]

**11. Plan for next week** (Week [#] — planned deliverable: [from roadmap])

- [ ] [Task 1 — tracker step — target day]
- [ ] [Task 2 — tracker step — target day]
- [ ] [Thesis section to draft]

**12. Supervisor feedback** (fill in after the meeting)

| Feedback   | Action I will take | Due          |
| ---------- | ------------------ | ------------ |
| [Feedback] | [Action]           | [YYYY-MM-DD] |

---
