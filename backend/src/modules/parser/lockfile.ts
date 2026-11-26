/**
 * npm package-lock.json parser (lockfile v2/v3 "packages" section).
 *
 * Input is untrusted text from an upload: it is only parsed as JSON, never executed,
 * and every field is type-checked before use.
 */

export interface LockfileDependency {
  name: string;
  version: string;
  isDirect: boolean;
  isDev: boolean;
  /** Key in the lockfile "packages" map, e.g. "node_modules/a/node_modules/b". */
  path: string;
}

/** A package the lockfile lists but that cannot be checked; the scan must report it, not hide it. */
export interface SkippedEntry {
  path: string;
  reason: string;
}

export interface ParsedLockfile {
  dependencies: LockfileDependency[];
  skipped: SkippedEntry[];
}

/** The file cannot be used at all; the message is safe to show to the user. */
export class LockfileParseError extends Error {
  override name = "LockfileParseError";
}

interface PackageEntry {
  /** Only present when it differs from the folder name, e.g. npm aliases. */
  name?: unknown;
  version?: unknown;
  dev?: unknown;
  link?: unknown;
  dependencies?: unknown;
  devDependencies?: unknown;
  optionalDependencies?: unknown;
  peerDependencies?: unknown;
}

const NODE_MODULES = "node_modules/";

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const keysOf = (value: unknown): string[] => (isObject(value) ? Object.keys(value) : []);

export function parseLockfile(text: string): ParsedLockfile {
  let json: unknown;
  try {
    json = JSON.parse(text);
  } catch {
    throw new LockfileParseError("The file is not valid JSON.");
  }

  if (!isObject(json) || typeof json.lockfileVersion !== "number") {
    throw new LockfileParseError("The file is not a package-lock.json (no lockfileVersion field).");
  }
  if (json.lockfileVersion === 1 && json.packages === undefined) {
    throw new LockfileParseError(
      "lockfileVersion 1 is not supported yet. Regenerate the lockfile with npm 7 or newer.",
    );
  }
  if (!isObject(json.packages)) {
    throw new LockfileParseError("The file is not a package-lock.json (missing \"packages\" section).");
  }

  const root: PackageEntry = isObject(json.packages[""]) ? json.packages[""] : {};
  const directNames = new Set([
    ...keysOf(root.dependencies),
    ...keysOf(root.devDependencies),
    ...keysOf(root.optionalDependencies),
    ...keysOf(root.peerDependencies),
  ]);

  const dependencies: LockfileDependency[] = [];
  const skipped: SkippedEntry[] = [];
  for (const [path, value] of Object.entries(json.packages)) {
    // Root project and workspace source folders are the user's own code.
    if (!path.includes(NODE_MODULES)) continue;
    if (!isObject(value)) {
      skipped.push({ path, reason: "malformed entry" });
      continue;
    }
    const entry: PackageEntry = value;
    // Symlinks to workspace packages, also the user's own code.
    if (entry.link === true) continue;
    if (typeof entry.version !== "string" || entry.version === "") {
      skipped.push({ path, reason: "missing version" });
      continue;
    }
    // Folder name; for an alias ("my-lodash": "npm:lodash@…") this is the alias.
    const installName = path.slice(path.lastIndexOf(NODE_MODULES) + NODE_MODULES.length);
    dependencies.push({
      name: typeof entry.name === "string" ? entry.name : installName,
      version: entry.version,
      isDirect: path === NODE_MODULES + installName && directNames.has(installName),
      isDev: entry.dev === true,
      path,
    });
  }
  return { dependencies, skipped };
}
