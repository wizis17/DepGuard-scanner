# Project 20 Daily & Weekly Report Templates

Nov 6, 2026&#32;

## How to use these templates

Fill the daily report at the end of each working day (10 minutes) and the weekly report every Friday (30 minutes) from that week's daily reports. Copy the template below the line; do not edit the template itself.

| Report | When | File name | Who reads it |
| --- | --- | --- | --- |
| Daily | End of each working day | `P20-Daily-YYYY-MM-DD` | You (development log, guide §20 step 7) |
| Weekly | Friday, before supervisor meeting | `P20-Weekly-W##-YYYY-MM-DD` | Supervisor, then thesis appendix |

Rules that keep the reports useful as thesis evidence:

- Write facts, not effort: name the commit, test, screenshot or file that proves each item.
- Tie every week to its roadmap row (guide §16) so delays are visible early.
- Record scanner numbers exactly as measured, with the date the advisory data was taken.
- Log decisions with a reason; they become the "design decisions" section of Chapter 4.

16-week roadmap reference:

| Week | Planned deliverable | Week | Planned deliverable |
| --- | --- | --- | --- |
| 1 | Approved problem and scope | 9 | Advisory lookup (OSV) |
| 2 | Proposal draft | 10 | Detection engine (version matching) |
| 3 | Design document | 11 | Scan module and history |
| 4 | Initial application | 12 | Dashboard and finding details |
| 5 | Working login | 13 | Remediation display and report export |
| 6 | Project module and file upload | 14 | Test evidence |
| 7 | Dependency inventory (parser) | 15 | Deployed MVP |
| 8 | Tested parser | 16 | Submission package |

## Daily report template

---

### Daily Report — \[YYYY-MM-DD, Day\]

| Field | Entry |
| --- | --- |
| Student | \[Name, student ID\] |
| Roadmap week | Week \[#\] of 16 — planned deliverable: \[from roadmap\] |
| Hours worked | \[e.g. 4.5 h\] |
| Main module today | \[Authentication / Project management / File intake / Parser / OSV lookup / Version matching / Dashboard / Reporting / Testing / Thesis\] |
| Overall status | \[On track / Slightly behind / Blocked\] |

**1. Planned for today** (copy from yesterday's "Tomorrow")

- [ ] &#91;Task 1\]
- [ ] &#91;Task 2\]
- [ ] &#91;Task 3\]

**2. Completed today**

| Task | Module | Evidence (commit, test, screenshot, file) |
| --- | --- | --- |
| \[e.g. Parse lockfile v3 "packages" section\] | Parser | \[commit a1b2c3d; 6 unit tests pass\] |
| \[Task\] | \[Module\] | \[Evidence\] |

**3. In progress**

| Task | % done | What is left |
| --- | --- | --- |
| \[Task\] | \[e.g. 60%\] | \[Remaining work\] |

**4. Tests run today**

| Test / test case | Expected | Actual | Result |
| --- | --- | --- | --- |
| \[e.g. Case 2 — patched lodash\] | \[0 findings\] | \[0 findings\] | \[Pass / Fail\] |

**5. Problems and blockers**

| Problem | Impact | What I tried | Help needed from |
| --- | --- | --- | --- |
| \[e.g. OSV querybatch returns no severity for some IDs\] | \[Severity shows Unknown\] | \[Fetch /v1/vulns/{id} for details\] | \[None / Supervisor / Classmate\] |

**6. Decisions made**

| Decision | Reason | Alternatives considered |
| --- | --- | --- |
| \[e.g. Store dependencies per scan\] | \[Keeps exact historical versions\] | \[Shared package table\] |

**7. Things learned / notes for the thesis**

- &#91;Concept, API behaviour or reference to cite, with source and access date\]

**8. Plan for tomorrow**

- [ ] &#91;Task 1\]
- [ ] &#91;Task 2\]

---

## Weekly report template

---

### Weekly Report — Week \[#\] of 16 (\[YYYY-MM-DD\] to \[YYYY-MM-DD\])

| Field | Entry |
| --- | --- |
| Student | \[Name, student ID\] |
| Supervisor | \[Name\] |
| Project | Web-Based Software Dependency Vulnerability Detection and Risk Assessment Platform |
| Planned deliverable (roadmap) | \[e.g. Week 7 — Dependency inventory\] |
| Deliverable status | \[Done / Partly done / Not started\] |
| Hours this week | \[Total from daily reports\] |
| Schedule | \[On track / \[#\] days behind / \[#\] days ahead\] |

**1. Summary** (3 sentences maximum)

&#91;What was finished, what is not, and the single most important issue.\]

**2. Work completed**

| Task | Module | Evidence | Daily report date |
| --- | --- | --- | --- |
| \[Task\] | \[Module\] | \[Commit / PR / screenshot / test file\] | \[YYYY-MM-DD\] |

**3. MVP definition-of-done progress** (tick what is now true, guide §19)

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

**4. Scanner test results** (from week 9 onward)

Advisory data taken on: \[YYYY-MM-DD\] · Source: \[OSV API version / snapshot\]

| Test case | Expected findings | Detected | False positives | Scan time (ms) | Result |
| --- | --- | --- | --- | --- | --- |
| 1 Vulnerable version | \[#\] | \[#\] | \[#\] | \[#\] | \[Pass / Fail\] |
| 2 Patched version | 0 | \[#\] | \[#\] | \[#\] | \[Pass / Fail\] |
| 3 Multiple dependencies | \[#\] | \[#\] | \[#\] | \[#\] | \[Pass / Fail\] |
| 4 Transitive dependencies | \[#\] | \[#\] | \[#\] | \[#\] | \[Pass / Fail\] |
| 5 Malformed files | Rejected | \[Result\] | — | \[#\] | \[Pass / Fail\] |
| 6 No matching advisory | 0 | \[#\] | \[#\] | \[#\] | \[Pass / Fail\] |

Detection coverage = detected expected findings ÷ expected findings = \[#\]%

**5. Risks and issues**

| Risk or issue | Likelihood | Impact | Mitigation / fallback |
| --- | --- | --- | --- |
| \[e.g. OSV rate limits slow large scans\] | \[Low / Medium / High\] | \[Low / Medium / High\] | \[Batch queries, cache advisories, retry with backoff\] |

**6. Key decisions this week**

| Decision | Reason | Thesis chapter |
| --- | --- | --- |
| \[Decision\] | \[Reason\] | \[e.g. Ch. 4 System Design\] |

**7. Thesis writing progress**

| Chapter | Status | Pages / words this week |
| --- | --- | --- |
| 1 Introduction | \[Not started / Drafting / Draft done / Revised\] | \[#\] |
| 2 Literature Review | \[Status\] | \[#\] |
| 3 Methodology and Requirements | \[Status\] | \[#\] |
| 4 System Analysis and Design | \[Status\] | \[#\] |
| 5 Implementation and Testing | \[Status\] | \[#\] |
| 6 Conclusion and Future Work | \[Status\] | \[#\] |

**8. Questions for supervisor**

1. &#91;Question that needs a decision or approval\]
2. &#91;Question\]

**9. Plan for next week** (Week \[#\] — planned deliverable: \[from roadmap\])

- [ ] &#91;Task 1 — target day\]
- [ ] &#91;Task 2 — target day\]
- [ ] &#91;Thesis section to draft\]

**10. Supervisor feedback** (fill after the meeting)

| Feedback | Action I will take | Due |
| --- | --- | --- |
| \[Feedback\] | \[Action\] | \[YYYY-MM-DD\] |

---
