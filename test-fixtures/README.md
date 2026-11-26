# Test fixtures

Small npm projects with known contents, used by the automated tests and the evaluation (guide §14). Each fixture's lockfile is real. It was generated with:

```bash
npm install --package-lock-only --ignore-scripts
```

That command only resolves versions. It downloads no package code and runs no scripts, so `node_modules/` is never created.

Never edit a `package-lock.json` by hand. To change a fixture, edit its `package.json` and regenerate the lockfile.

## Fixtures

### `npm-basic`

Generated 2026-11-26 with npm 11.17.0, lockfileVersion 3.

| Package | Version | Direct | Dev | Why it is here |
| --- | --- | --- | --- | --- |
| `lodash` | 4.17.20 | yes | no | Version with published advisories (e.g. CVE-2021-23337, fixed in 4.17.21) → future evaluation case 1 |
| `debug` | 2.6.9 | yes | no | Brings in a transitive dependency |
| `ms` | 2.0.0 | no | no | Transitive (via `debug`) → future evaluation case 4 |
| `@types/ms` | 0.7.34 | yes | yes | Scoped name and dev flag |

**Expected parser output:** these 4 packages, with nothing skipped.

**Expected scan findings:** to be recorded once the OSV client exists (week 9). Write down the OSV query date next to them, because advisory data changes over time.
