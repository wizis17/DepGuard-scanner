import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { LockfileParseError, parseLockfile } from "./lockfile.js";

const fixture = (name: string) =>
  readFileSync(new URL(`../../../../test-fixtures/${name}/package-lock.json`, import.meta.url), "utf8");

/** Builds lockfile v3 text from a hand-written "packages" map. */
const lock = (packages: Record<string, unknown>, lockfileVersion: unknown = 3) =>
  JSON.stringify({ name: "app", version: "1.0.0", lockfileVersion, requires: true, packages });

describe("parseLockfile — package names", () => {
  it("reports the real package name for an npm alias, so advisories for it are not missed", () => {
    const { dependencies: deps } = parseLockfile(
      lock({
        "": { dependencies: { "my-lodash": "npm:lodash@4.17.20" } },
        "node_modules/my-lodash": { name: "lodash", version: "4.17.20" },
      }),
    );

    expect(deps).toEqual([
      { name: "lodash", version: "4.17.20", isDirect: true, isDev: false, path: "node_modules/my-lodash" },
    ]);
  });
});

describe("parseLockfile — entries that are not installed third-party packages", () => {
  it("skips workspace links and workspace source folders", () => {
    const { dependencies: deps, skipped } = parseLockfile(
      lock({
        "": { name: "monorepo", workspaces: ["packages/*"] },
        "node_modules/ws-a": { resolved: "packages/ws-a", link: true },
        "node_modules/lodash": { version: "4.17.21" },
        "packages/ws-a": { name: "ws-a", version: "0.1.0", dependencies: { lodash: "4.17.21" } },
      }),
    );

    expect(deps.map((d) => d.path)).toEqual(["node_modules/lodash"]);
    expect(skipped).toEqual([]); // a link is our own code, not an unchecked package
  });

  it("reports an installed package without a version as skipped instead of dropping it silently", () => {
    const { dependencies, skipped } = parseLockfile(
      lock({
        "": { dependencies: { broken: "*", ok: "1.0.0" } },
        "node_modules/broken": { resolved: "https://registry.npmjs.org/broken/-/broken.tgz" },
        "node_modules/ok": { version: "1.0.0" },
      }),
    );

    expect(dependencies.map((d) => d.name)).toEqual(["ok"]);
    expect(skipped).toEqual([{ path: "node_modules/broken", reason: "missing version" }]);
  });
});

describe("parseLockfile — direct vs transitive", () => {
  it("marks a nested copy of a direct dependency's name as transitive", () => {
    const { dependencies: deps } = parseLockfile(
      lock({
        "": { name: "app", version: "1.0.0", dependencies: { lodash: "^4.17.21", a: "1.0.0" } },
        "node_modules/a": { version: "1.0.0", dependencies: { lodash: "3.10.1" } },
        "node_modules/a/node_modules/lodash": { version: "3.10.1" },
        "node_modules/lodash": { version: "4.17.21" },
      }),
    );

    expect(deps).toEqual([
      { name: "a", version: "1.0.0", isDirect: true, isDev: false, path: "node_modules/a" },
      { name: "lodash", version: "3.10.1", isDirect: false, isDev: false, path: "node_modules/a/node_modules/lodash" },
      { name: "lodash", version: "4.17.21", isDirect: true, isDev: false, path: "node_modules/lodash" },
    ]);
  });

  it("treats root optionalDependencies and peerDependencies as direct", () => {
    const { dependencies: deps } = parseLockfile(
      lock({
        "": { optionalDependencies: { fsevents: "2.3.3" }, peerDependencies: { react: "18.3.1" } },
        "node_modules/fsevents": { version: "2.3.3", optional: true },
        "node_modules/react": { version: "18.3.1", peer: true },
      }),
    );

    expect(deps.map((d) => [d.name, d.isDirect])).toEqual([
      ["fsevents", true],
      ["react", true],
    ]);
  });
});

describe("parseLockfile — invalid input", () => {
  it.each([
    ["text that is not JSON", "{ not json", /not valid JSON/],
    ["a JSON array", "[]", /not a package-lock\.json/],
    ["JSON null", "null", /not a package-lock\.json/],
    ["a package.json (no lockfileVersion)", JSON.stringify({ name: "app", dependencies: {} }), /not a package-lock\.json/],
    ["a lockfile whose packages is not an object", lock(["node_modules/x"] as unknown as Record<string, unknown>), /not a package-lock\.json/],
    ["lockfile v1 (no packages section)", JSON.stringify({ lockfileVersion: 1, dependencies: { a: { version: "1.0.0" } } }), /lockfileVersion 1/],
  ])("rejects %s with a LockfileParseError", (_label, text, message) => {
    expect(() => parseLockfile(text)).toThrow(LockfileParseError);
    expect(() => parseLockfile(text)).toThrow(message);
  });

  it("skips an entry that is not an object instead of crashing", () => {
    const { dependencies, skipped } = parseLockfile(
      lock({
        "node_modules/bad": null,
        "node_modules/ok": { version: "1.0.0" },
      }),
    );

    expect(dependencies.map((d) => d.name)).toEqual(["ok"]);
    expect(skipped).toEqual([{ path: "node_modules/bad", reason: "malformed entry" }]);
  });
});

describe("parseLockfile — real fixture", () => {
  it("lists every installed package with its exact version, direct/transitive and dev flags", () => {
    const { dependencies: deps } = parseLockfile(fixture("npm-basic"));

    // Hand-checked against test-fixtures/npm-basic/package-lock.json
    expect(deps).toEqual([
      { name: "@types/ms", version: "0.7.34", isDirect: true, isDev: true, path: "node_modules/@types/ms" },
      { name: "debug", version: "2.6.9", isDirect: true, isDev: false, path: "node_modules/debug" },
      { name: "lodash", version: "4.17.20", isDirect: true, isDev: false, path: "node_modules/lodash" },
      { name: "ms", version: "2.0.0", isDirect: false, isDev: false, path: "node_modules/ms" },
    ]);
  });
});
