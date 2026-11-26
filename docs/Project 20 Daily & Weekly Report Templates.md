# Project 20 — Daily & Weekly Report Templates

Created Nov 6, 2026 · Updated Nov 26, 2026 (reorganised for quick lookup: update map, evidence commands, file names per week, copy-ready templates)

**Jump to:** [What to update when](#1-what-to-update-and-when) · [Where to find the evidence](#2-where-to-find-the-evidence) · [Fixed values](#3-fixed-values-and-allowed-words) · [Roadmap and file names](#4-roadmap-and-file-names) · [Daily template](#5-daily-report-template) · [Weekly template](#6-weekly-report-template) · [Rules](#7-rules-that-make-reports-good-thesis-evidence)

**Filled examples:** [daily 2026-11-26](reports/daily/P20-Daily-2026-11-26.md) · [weekly W03](reports/weekly/P20-Weekly-W03-2026-11-27.md)

| Report | When | File | Time | Who reads it |
| --- | --- | --- | --- | --- |
| Daily | End of each working day | `docs/reports/daily/P20-Daily-YYYY-MM-DD.md` | 10 min | You (development log, guide §20 step 7) |
| Weekly | Friday, before the supervisor meeting | `docs/reports/weekly/P20-Weekly-W##-YYYY-MM-DD.md` (date = that Friday) | 30 min | Supervisor, then thesis appendix |
| [Progress tracker](Project%2020%20Progress%20Tracker.md) | Friday, with the weekly report, and whenever a PR merges | `docs/Project 20 Progress Tracker.md` | 5 min | You and supervisor |

Copy a template from §5 or §6 into a new file; never edit the template itself.

---

## 1. What to update and when

Find what just happened in the left column. The other columns tell you which file and part to update.

| When this happens | Daily report | Weekly report | Progress tracker | Elsewhere |
| --- | --- | --- | --- | --- |
| You finish a task | Part 2 Completed (with evidence) | — | — | — |
| You make a commit | Part 4 Commits | — | — | — |
| You open or merge a PR | Part 4 Pull request | Part 3 PR table | Tick the step and paste the PR as evidence | — |
| CI passes or fails | Part 4 CI result; if it fails, also Part 6 Problems | Part 3 CI column | — | — |
| You add a Prisma migration | Part 4 Database migrations | — | — | — |
| You add or upgrade a package | Part 4 Dependencies | Part 6 (run `npm audit`) | — | — |
| You run tests | Part 5 Tests | Part 5 (scanner cases, from week 9) | — | — |
| Something blocks you | Part 6 Problems | Part 7 Risks (if it lasts) | "Blockers" row | — |
| You make a design decision | Part 7 Decisions | Part 8 Key decisions | — | Guide Appendix A (D-number) |
| You learn something to cite | Part 8 Notes | Part 9 Thesis progress | — | — |
| End of the day | Part 9 Plan for tomorrow | — | — | — |
| Friday | — | Write the whole report | "Where the project stands", week row Status + Evidence | — |
| After the supervisor meeting | — | Part 12 Feedback | Tick 1.x steps if approved | — |
| A milestone is reached | Part 4 | Header "Milestone tag" | Week row Evidence | Git tag (§4) |

### Friday checklist

- [ ] Every working day this week has a daily report.
- [ ] Weekly report written, using the daily reports (§6).
- [ ] `npm audit` run in `backend/` (and `frontend/` from week 4), result in weekly Part 6.
- [ ] Tracker: "Where the project stands" table updated (current week, step, blockers, latest reports).
- [ ] Tracker: this week's row has Status and Evidence.
- [ ] Tracker: finished steps ticked, each with a commit or PR.
- [ ] Decisions copied to guide Appendix A.
- [ ] Questions for the supervisor written (weekly Part 10).
- [ ] Reports committed: `docs: add week N reports, update tracker`.

---

## 2. Where to find the evidence

Run these from the repository root unless the command says `cd backend`.

| You need | Command or place | Goes into |
| --- | --- | --- |
| Today's commits | `git log --oneline --since=midnight` | Daily 2, 4 |
| This week's commits | `git log --oneline --since="7 days ago"` | Weekly 2 |
| PR numbers and status | `gh pr list --state all --limit 10`, or the GitHub Pull requests tab | Daily 4, weekly 3 |
| CI result | `gh run list --limit 5`, or the GitHub Actions tab | Daily 4, weekly 3 |
| Test count | `cd backend && npm test` (look at the "Tests … passed" line) | Daily 5 |
| Migrations | Folder names in `backend/prisma/migrations/` | Daily 4 |
| Package changes | `git diff main -- backend/package.json` | Daily 4 |
| Own dependency health | `cd backend && npm audit` | Weekly 6 |
| Step numbers | [Progress tracker](Project%2020%20Progress%20Tracker.md) checklist (first unticked step = current step) | Daily header, weekly header |
| Decisions already logged | Guide Appendix A | Daily 7, weekly 8 |
| Yesterday's plan | Part 9 of yesterday's daily report | Daily 1 |

---

## 3. Fixed values and allowed words

Copy these exactly so every report looks the same.

| Field | Value |
| --- | --- |
| Student | Tang KavTheng, ID: 34 |
| Supervisor | LayRethy |
| Project | Web-Based Software Dependency Vulnerability Detection and Risk Assessment Platform |
| Repository | github.com/wizis17/DepGuard-scanner |

| Field | Pick one |
| --- | --- |
| Overall status (daily) | On track · Slightly behind · Blocked |
| Deliverable status (weekly) | Done · Partly done · Not started |
| Schedule (weekly) | On track · [#] days behind · [#] days ahead |
| Tracker status | Not started · In progress · Done · Blocked · Skipped |
| Main module | Setup / DevOps · Database · Authentication · Project management · File intake · Parser · OSV lookup · Version matching · Dashboard · Reporting · Testing · Docs · Thesis |
| Test result | Pass · Fail · Not run |
| PR status | Open · Merged · Closed |
| Likelihood / impact | Low · Medium · High |
| Thesis chapter status | Not started · Drafting · Draft done · Revised |

If a part has nothing to report, write **None**. Don't delete the part. An empty part looks like you forgot it.

---

## 4. Roadmap and file names

Look up today's date to get the week number, the steps to work on, the branch and the weekly report file name.

| Week | Dates | Planned deliverable | Tracker steps | Branch (workflow §1) | Weekly report file | Milestone tag |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 9–13 Nov | Approved problem and scope | 1.1–1.4 | — | `P20-Weekly-W01-2026-11-13.md` | — |
| 2 | 16–20 Nov | Proposal draft | 2.1–2.3 | — | `P20-Weekly-W02-2026-11-20.md` | — |
| 3 | 23–27 Nov | Design document | 3.1–3.4 | `feature/3.4-parser-prototype` | `P20-Weekly-W03-2026-11-27.md` | — |
| 4 | 30 Nov–4 Dec | Initial application | 4.1–4.4 | `feature/4-frontend-setup` | `P20-Weekly-W04-2026-12-04.md` | `v0.1-design` |
| 5 | 7–11 Dec | Working login | 5.1–5.3 | `feature/5-auth` | `P20-Weekly-W05-2026-12-11.md` | — |
| 6 | 14–18 Dec | Project module and file upload | 6.1–6.3 | `feature/6-projects-upload` | `P20-Weekly-W06-2026-12-18.md` | `v0.2-auth-upload` |
| 7 | 21–25 Dec | Dependency inventory (parser) | 7.1–7.3 | `feature/7-lockfile-parser` | `P20-Weekly-W07-2026-12-25.md` | — |
| 8 | 28 Dec–1 Jan | Tested parser | 8.1–8.2 | `feature/7-lockfile-parser` (continued) | `P20-Weekly-W08-2027-01-01.md` | — |
| 9 | 4–8 Jan | Advisory lookup (OSV) | 9.1–9.3 | `feature/9-osv-client` | `P20-Weekly-W09-2027-01-08.md` | — |
| 10 | 11–15 Jan | Detection engine (version matching) | 10.1–10.3 | `feature/10-version-matcher` | `P20-Weekly-W10-2027-01-15.md` | `v0.3-detection` |
| 11 | 18–22 Jan | Scan module and history | 11.1–11.2 | `feature/11-scan-history` | `P20-Weekly-W11-2027-01-22.md` | — |
| 12 | 25–29 Jan | Dashboard and finding details | 12.1–12.2 | `feature/12-dashboard` | `P20-Weekly-W12-2027-01-29.md` | — |
| 13 | 1–5 Feb | Remediation display and report export | 13.1–13.2 | `feature/13-report-export` | `P20-Weekly-W13-2027-02-05.md` | `v0.4-ui-report` |
| 14 | 8–12 Feb | Test evidence | 14.1–14.3 | `feature/14-evaluation` | `P20-Weekly-W14-2027-02-12.md` | — |
| 15 | 15–19 Feb | Deployed MVP | 15.1–15.3 | `feature/15-deploy` | `P20-Weekly-W15-2027-02-19.md` | `v1.0-mvp` |
| 16 | 22–26 Feb | Submission package | 16.1–16.4 | `docs/final-thesis` | `P20-Weekly-W16-2027-02-26.md` | — |

Daily file name: `P20-Daily-` + the date + `.md`, for example `P20-Daily-2026-12-01.md`. Week 4's backend setup was done early in PR #1, so Week 4 only needs the frontend branch.

---

## 5. Daily report template

### What goes in each part

| Part | What to write | Take it from | Nothing to report? |
| --- | --- | --- | --- |
| Header | Week, steps, branch, hours, module, status | §4 roadmap, tracker, §3 allowed words | — |
| 1 Planned | Yesterday's plan, ticked if done | Yesterday's Part 9 | First day: write the plan now |
| 2 Completed | One row per finished task, each with proof | `git log`, test output, files | None |
| 3 In progress | Unfinished tasks, % done, what is left | Your own judgement | None |
| 4 Git and CI | Commits, PR, CI, migrations, packages | §2 commands | None in each row |
| 5 Tests | Each test run: expected vs actual | `npm test` output | Not run |
| 6 Problems | Problem, impact, what you tried, who can help | — | None |
| 7 Decisions | Decision, reason, alternatives | — (also copy to guide Appendix A) | None |
| 8 Notes | Facts to cite in the thesis, with source and access date | Docs you read | None |
| 9 Tomorrow | Next tasks with step numbers | Tracker: first unticked step | — |

### Copy this

```markdown
### Daily Report — YYYY-MM-DD, Day

| Field | Entry |
| --- | --- |
| Student | Tang KavTheng, ID: 34 |
| Roadmap week | Week [#] of 16 — planned deliverable: [from roadmap] |
| Tracker step(s) | [e.g. 7.1, 7.2] |
| Branch | [e.g. `feature/7-lockfile-parser`] |
| Hours worked | [e.g. 4.5 h] |
| Main module today | [e.g. Parser] |
| Overall status | [On track / Slightly behind / Blocked] |

**1. Planned for today** (copied from yesterday's part 9)

- [ ] [Task 1]
- [ ] [Task 2]

**2. Completed today**

| Task | Tracker step | Module | Evidence (commit, PR, test, screenshot, file) |
| --- | --- | --- | --- |
| [e.g. Parse lockfile v3 "packages" section] | [7.1] | [Parser] | [commit a1b2c3d; 6 unit tests pass] |

**3. In progress**

| Task | % done | What is left |
| --- | --- | --- |
| [Task] | [e.g. 60%] | [Remaining work] |

**4. Git and CI today**

| Item | Entry |
| --- | --- |
| Commits | [`a1b2c3d` feat(parser): parse lockfile v3 packages] |
| Pull request | [None / Opened #N / Updated #N / Merged #N] |
| CI result | [Not run / Pass / Fail — reason and fix] |
| Database migrations | [None / `20261124131355_init` — what it changes] |
| Dependencies added or changed | [None / package@version — why] |

**5. Tests run today**

| Test / test case | Expected | Actual | Result |
| --- | --- | --- | --- |
| [e.g. `npm test` — backend unit tests] | [All pass] | [17/17 pass] | [Pass / Fail] |

**6. Problems and blockers**

| Problem | Impact | What I tried | Help needed from |
| --- | --- | --- | --- |
| [Problem or None] | [Impact] | [What I tried] | [None / Supervisor / Classmate] |

**7. Decisions made**

| Decision | Reason | Alternatives considered |
| --- | --- | --- |
| [Decision or None] | [Reason] | [Alternatives] |

**8. Things learned / notes for the thesis**

- [Fact, with source and access date]

**9. Plan for tomorrow**

- [ ] [Task 1 — tracker step]
- [ ] [Task 2 — tracker step]
```

---

## 6. Weekly report template

### What goes in each part

| Part | What to write | Take it from | Before week 9? |
| --- | --- | --- | --- |
| Header | Deliverable, status, steps, tag, hours, schedule | §4 roadmap, tracker, sum of daily hours | — |
| 1 Summary | 3 sentences: done, not done, main issue | Whole week | — |
| 2 Work completed | All finished tasks of the week | Part 2 of each daily report | — |
| 3 Pull requests | Every PR opened or merged, with CI | `gh pr list`, `gh run list` | — |
| 4 MVP progress | Tick what is now true | Guide §19 | Mostly unticked; that's normal |
| 5 Scanner results | Six test cases, precision, recall | Scanner test runs | Write "Not applicable until week 9" |
| 6 Own dependency health | `npm audit` counts and action | `npm audit` | — |
| 7 Risks | Risks with likelihood, impact, fallback | Daily Part 6 | — |
| 8 Key decisions | The week's important decisions | Daily Part 7, guide Appendix A | — |
| 9 Thesis progress | Status of each chapter | Your thesis draft | — |
| 10 Questions | Things that need the supervisor's decision | Daily Part 6 "Help needed" | — |
| 11 Next week | Tasks with step and day | §4 next row, tracker | — |
| 12 Feedback | Fill in after the meeting | Meeting notes | — |

### Copy this

```markdown
### Weekly Report — Week [#] of 16 ([YYYY-MM-DD] to [YYYY-MM-DD])

| Field | Entry |
| --- | --- |
| Student | Tang KavTheng, ID: 34 |
| Supervisor | LayRethy |
| Project | Web-Based Software Dependency Vulnerability Detection and Risk Assessment Platform |
| Repository | github.com/wizis17/DepGuard-scanner |
| Planned deliverable (roadmap) | [e.g. Week 7 — Dependency inventory] |
| Deliverable status | [Done / Partly done / Not started] |
| Tracker steps completed | [e.g. 7.1, 7.2 — still open: 7.3] |
| Milestone tag | [None / `v0.1-design` — commit hash] |
| Hours this week | [Total from daily reports] |
| Schedule | [On track / [#] days behind / [#] days ahead] |

**1. Summary** (3 sentences maximum)

[What was finished, what isn't, and the single most important issue.]

**2. Work completed**

| Task | Tracker step | Module | Evidence | Daily report date |
| --- | --- | --- | --- | --- |
| [Task] | [Step] | [Module] | [Commit / PR / screenshot / test file] | [YYYY-MM-DD] |

**3. Pull requests this week**

| PR | Title | Tracker step | CI | Status |
| --- | --- | --- | --- | --- |
| [#N] | [e.g. feat(parser): parse lockfile v2/v3] | [7.1] | [Pass / Fail] | [Merged / Open] |

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

**5. Scanner test results** (from week 9; before that write "Not applicable until week 9")

Advisory data taken on: [YYYY-MM-DD] · Source: [OSV API version / snapshot]

| Test case | Expected findings | Detected | False positives | Scan time (ms) | Result |
| --- | --- | --- | --- | --- | --- |
| 1 Vulnerable version | [#] | [#] | [#] | [#] | [Pass / Fail] |
| 2 Patched version | 0 | [#] | [#] | [#] | [Pass / Fail] |
| 3 Multiple dependencies | [#] | [#] | [#] | [#] | [Pass / Fail] |
| 4 Transitive dependencies | [#] | [#] | [#] | [#] | [Pass / Fail] |
| 5 Malformed files | Rejected | [Result] | — | [#] | [Pass / Fail] |
| 6 No matching advisory | 0 | [#] | [#] | [#] | [Pass / Fail] |

Precision = TP ÷ (TP + FP) = [#]% · Recall (detection coverage) = TP ÷ (TP + FN) = [#]%

**6. DepGuard's own dependency health** (`npm audit` in `backend/`, later `frontend/`)

| Date | Critical | High | Moderate | Low | Affected package (path) | Action |
| --- | --- | --- | --- | --- | --- | --- |
| [YYYY-MM-DD] | [#] | [#] | [#] | [#] | [e.g. effect via prisma → @prisma/config (dev only)] | [Fixed / Accepted — reason / Waiting for upstream fix] |

**7. Risks and issues**

| Risk or issue | Likelihood | Impact | Mitigation / fallback |
| --- | --- | --- | --- |
| [e.g. OSV rate limits slow large scans] | [Low / Medium / High] | [Low / Medium / High] | [Batch queries, cache, retry with backoff] |

**8. Key decisions this week**

| Decision | Reason | Thesis chapter |
| --- | --- | --- |
| [Decision] | [Reason] | [e.g. Ch. 4 System Design] |

**9. Thesis writing progress**

| Chapter | Status | Pages / words this week |
| --- | --- | --- |
| 1 Introduction | [Not started / Drafting / Draft done / Revised] | [#] |
| 2 Literature Review | [Status] | [#] |
| 3 Methodology and Requirements | [Status] | [#] |
| 4 System Analysis and Design | [Status] | [#] |
| 5 Implementation and Testing | [Status] | [#] |
| 6 Conclusion and Future Work | [Status] | [#] |

**10. Questions for supervisor**

1. [Question that needs a decision or approval]

**11. Plan for next week** (Week [#] — planned deliverable: [from roadmap])

- [ ] [Task — tracker step — target day]
- [ ] [Thesis section to draft]

**12. Supervisor feedback** (fill in after the meeting)

| Feedback | Action I will take | Due |
| --- | --- | --- |
| [Feedback] | [Action] | [YYYY-MM-DD] |
```

---

## 7. Rules that make reports good thesis evidence

1. **Facts, not effort.** Every item names its proof: a commit, PR, CI run, test, screenshot or file. Write "13/13 tests pass (`4511366`)", not "worked hard on the parser".
2. **Link everything to a step.** Each task has a tracker step (e.g. 7.1). Each week matches its row in §4, so delays show up early.
3. **The PR is the main proof for code.** A merged PR with green CI proves the code builds and passes its tests. See the [Git & CI/CD workflow](Git%20and%20CI-CD%20Workflow.md).
4. **Exact numbers.** Record scanner results exactly as measured, with the date the advisory data was taken.
5. **Every decision has a reason.** These become the "design decisions" section of Chapter 4. Also log each one in guide Appendix A.
6. **Accepted risks go into the thesis.** Any `npm audit` finding you accept goes into the thesis limitations section, with the reason.
7. **Commit reports with Git.** Use a `docs/` branch or commit them alongside the day's work, e.g. `docs: add daily report 2026-11-25`. Git history then proves when each report was written.
