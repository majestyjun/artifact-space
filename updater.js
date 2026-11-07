/**
 * Version lookup and in-place upgrade for the Artifact Space bundle.
 *
 * The Host half owns this because only it can touch the profile's install
 * directory; the browser half asks it over an authenticated route.
 *
 * Two rules shape the whole file:
 *
 *  1. **Every file is unlinked before it is written.** The published package
 *     is installed by pnpm, whose files are hard links into the
 *     content-addressable store. Writing *over* such a link rewrites the
 *     store's copy too, so every later install of any version would hand out
 *     the rewritten bytes. Unlinking first drops the link — the store keeps
 *     its own — and the replacement file is a fresh inode the store never
 *     sees.
 *
 *  2. **The profile's own bookkeeping is left alone.** `package.json`,
 *     `pnpm-lock.yaml` and the recovery snapshots are DSH's, and the profile
 *     refuses to start when the recorded hashes stop matching. An upgrade here
 *     swaps the loaded files and nothing else, so the next start sees the
 *     same profile it saw before.
 *
 * The upgrade therefore takes effect after DSH restarts — which is also the
 * only moment it *can* take effect, because the running bundle is already
 * loaded into memory.
 */

import { createHash } from 'node:crypto';
import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

/** The published package this bundle belongs to. */
const PACKAGE_NAME = '@xxjxx/artifact-space';

/** Registry consulted for the published version. */
const NPM_REGISTRY = 'https://registry.npmjs.org';

/** How long one registry or tarball request may take before it is abandoned. */
const REGISTRY_TIMEOUT_MS = 15_000;

/** How long the whole download-and-install sequence may take. */
const UPDATE_TIMEOUT_MS = 180_000;

/** Byte cap for the downloaded tarball; the real package is a few hundred KB. */
const MAX_TARBALL_BYTES = 32 * 1024 * 1024;

/** The directory this bundle was loaded from — the install root to upgrade. */
const INSTALL_ROOT = resolve(dirname(fileURLToPath(import.meta.url)));

/**
 * Where the upgrade's own files live.
 *
 * They must sit outside the install directory: the replacement walks that
 * directory and drops whatever the new release does not carry. They also must
 * sit outside pnpm's scope folder, where a stray directory would be pruned as
 * an unknown package. The profile that owns the install is therefore the
 * right home — the same place the plugin's own release notes already keep
 * their backups.
 *
 * @returns {string} the directory the upgrade keeps its work and backups in.
 */
function managementRoot() {
  const segments = INSTALL_ROOT.split(sep);
  const marker = segments.lastIndexOf('node_modules');
  const base = marker === -1 ? dirname(INSTALL_ROOT) : segments.slice(0, marker).join(sep);
  return join(base, '.artifact-space');
}

/** Directory the downloaded tarball and its extraction live in. */
const WORK_ROOT = join(managementRoot(), 'work');

/**
 * The version this bundle is running.
 *
 * It is read from the install directory rather than baked into the code, so
 * the number shown in the panel is the number of the code actually running.
 *
 * @returns {string|null} the semver string, or null when it cannot be read.
 */
export function installedVersion() {
  try {
    const manifest = JSON.parse(readFileSync(join(INSTALL_ROOT, 'package.json'), 'utf8'));
    return typeof manifest.version === 'string' ? manifest.version : null;
  } catch {
    return null;
  }
}

/**
 * Compare two semver strings.
 *
 * Only the release triple matters: a prerelease of the same triple is not
 * newer than the release, and a build suffix never changes the order.
 *
 * @param {string} left - the version a user already has.
 * @param {string} right - the version a user could get.
 * @returns {number} negative when left is older, zero when equal, positive when newer.
 */
export function compareVersions(left, right) {
  const parse = (value) => {
    const match = /^v?(\d+)\.(\d+)\.(\d+)/.exec(String(value ?? '').trim());
    return match === null ? null : [Number(match[1]), Number(match[2]), Number(match[3])];
  };
  const a = parse(left);
  const b = parse(right);
  if (a === null || b === null) return 0;
  for (let index = 0; index < 3; index += 1) {
    if (a[index] !== b[index]) return a[index] - b[index];
  }
  return 0;
}

/**
 * Fetch the newest published version and the tarball that carries it.
 *
 * @param {AbortSignal} [signal] - the caller's abort signal.
 * @returns {Promise<{version: string, tarball: string, integrity: string|null}>} the release.
 */
async function fetchLatestRelease(signal) {
  const deadline = AbortSignal.timeout(REGISTRY_TIMEOUT_MS);
  const combined = signal === undefined ? deadline : AbortSignal.any([signal, deadline]);
  const response = await fetch(`${NPM_REGISTRY}/${encodeURIComponent(PACKAGE_NAME)}/latest`, {
    headers: { accept: 'application/json' },
    signal: combined,
  });
  if (!response.ok) {
    throw new Error(`registry responded ${response.status}`);
  }
  const body = await response.json();
  const version = typeof body?.version === 'string' ? body.version : null;
  const tarball = typeof body?.dist?.tarball === 'string' ? body.dist.tarball : null;
  const integrity = typeof body?.dist?.integrity === 'string' ? body.dist.integrity : null;
  if (version === null || tarball === null) {
    throw new Error('registry response carried no version');
  }
  return { version, tarball, integrity };
}

/**
 * Report the installed version and whether a newer one is published.
 *
 * The registry is only consulted when the caller asks for it; a failure there
 * is reported, never thrown, so the panel still shows the version it runs.
 *
 * @param {object} options - the request's options.
 * @param {boolean} options.check - whether to consult the registry.
 * @param {AbortSignal} [options.signal] - the caller's abort signal.
 * @returns {Promise<object>} the version report.
 */
export async function versionReport({ check, signal }) {
  const current = installedVersion();
  const report = {
    current,
    latest: null,
    updateAvailable: false,
    checked: false,
    error: null,
  };
  if (check !== true) return report;
  try {
    const release = await fetchLatestRelease(signal);
    report.latest = release.version;
    report.checked = true;
    report.updateAvailable = compareVersions(current, release.version) < 0;
  } catch (error) {
    report.error = error instanceof Error ? error.message : String(error);
  }
  return report;
}

/**
 * Verify a downloaded tarball against the registry's integrity hash.
 *
 * The hash is the registry's own statement about the bytes, so following it
 * means a corrupted or substituted download is refused rather than installed.
 *
 * @param {Buffer} bytes - the downloaded tarball.
 * @param {string|null} integrity - the expected `sha512-<base64>` digest.
 * @returns {boolean} true when the bytes match, or when no digest was published.
 */
function matchesIntegrity(bytes, integrity) {
  if (typeof integrity !== 'string' || integrity.length === 0) return true;
  const [algorithm, expected] = integrity.split('-', 2);
  if (algorithm !== 'sha512' || typeof expected !== 'string') return false;
  const actual = createHash('sha512').update(bytes).digest('base64');
  return actual === expected;
}

/**
 * List every file under a directory, relative to it.
 *
 * @param {string} root - the directory to walk.
 * @param {string} [prefix] - the path already walked, used by the recursion.
 * @returns {string[]} the relative file paths, using the platform separator.
 */
function listFiles(root, prefix = '') {
  const found = [];
  let entries;
  try {
    entries = readdirSync(join(root, prefix), { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const relativePath = prefix === '' ? entry.name : `${prefix}${sep}${entry.name}`;
    if (entry.isDirectory()) {
      found.push(...listFiles(root, relativePath));
    } else if (entry.isFile()) {
      found.push(relativePath);
    }
  }
  return found;
}

/**
 * Extract a gzipped tar archive into a directory.
 *
 * The archive is unpacked here rather than by the system's `tar`: that tool
 * reads a Windows drive letter in the archive path as a remote host name
 * (`D:\…` becomes "cannot connect to D:"), and its behaviour otherwise
 * depends on whichever `tar` the machine happens to have first on `PATH`.
 * Reading the format directly keeps the result the same everywhere.
 *
 * Every member's path is checked against the target directory, so a crafted
 * archive cannot write outside it.
 *
 * @param {Buffer} archive - the gzipped tarball.
 * @param {string} target - the directory to extract into.
 * @returns {void}
 */
function extractArchive(archive, target) {
  const tar = gunzipSync(archive);
  const root = resolve(target);
  mkdirSync(root, { recursive: true });
  let offset = 0;
  let longName = null;

  while (offset + 512 <= tar.length) {
    const header = tar.subarray(offset, offset + 512);
    offset += 512;
    // Two consecutive zero blocks end the archive.
    if (header.every((byte) => byte === 0)) break;

    const readString = (start, length) => {
      const slice = header.subarray(start, start + length);
      const end = slice.indexOf(0);
      return slice.toString('utf8', 0, end === -1 ? slice.length : end);
    };
    // The size field is octal, but a large file uses GNU's base-256 form.
    const rawSize = header.subarray(124, 136);
    let size;
    if (rawSize[0] & 0x80) {
      size = 0;
      for (let index = 1; index < rawSize.length; index += 1) {
        size = size * 256 + rawSize[index];
      }
    } else {
      size = parseInt(readString(124, 12).trim() || '0', 8);
    }
    const type = String.fromCharCode(header[156]);
    const name = readString(0, 100);
    const prefix = readString(345, 155);
    let memberPath = prefix === '' ? name : `${prefix}/${name}`;

    if (type === 'L') {
      // GNU long name: the next header carries the real path.
      const data = tar.subarray(offset, offset + size);
      longName = data.toString('utf8').replace(/\0+$/, '');
      offset += Math.ceil(size / 512) * 512;
      continue;
    }
    if (longName !== null) {
      memberPath = longName;
      longName = null;
    }

    const resolved = resolve(root, memberPath);
    if (resolved !== root && !resolved.startsWith(root + sep)) {
      throw new Error('the downloaded package contains an unsafe path');
    }

    if (type === '0' || type === '\0') {
      mkdirSync(dirname(resolved), { recursive: true });
      writeFileSync(resolved, tar.subarray(offset, offset + size));
    } else if (type === '5') {
      mkdirSync(resolved, { recursive: true });
    }
    offset += Math.ceil(size / 512) * 512;
  }
}

/**
 * Copy the live installation aside so a failed upgrade can be undone.
 *
 * @param {string} backup - the directory to write the copy into.
 * @returns {void}
 */
function backupInstallation(backup) {
  rmSync(backup, { recursive: true, force: true });
  mkdirSync(backup, { recursive: true });
  for (const relativePath of listFiles(INSTALL_ROOT)) {
    const target = join(backup, relativePath);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(join(INSTALL_ROOT, relativePath), target);
  }
}

/**
 * Files the upgrade keeps even when the new release does not carry them.
 *
 * The upgrade machinery itself is one of them: it is the code that performs
 * the upgrade, so a release that predates it would otherwise delete the very
 * file that is running, leaving no way to upgrade again. The upgrade code is
 * version-independent by design, so keeping the installed copy is safe.
 */
const PRESERVED_FILES = ['updater.js'];

/**
 * Write the freshly downloaded files over the live installation.
 *
 * Every existing file is unlinked before its replacement is written, so the
 * pnpm store's hard links are dropped rather than rewritten.
 *
 * @param {string} source - the directory holding the new files.
 * @returns {void}
 */
function applyInstallation(source) {
  const incoming = listFiles(source);
  const existing = listFiles(INSTALL_ROOT);
  const kept = PRESERVED_FILES.filter((name) => !incoming.includes(name));
  for (const relativePath of existing) {
    if (!incoming.includes(relativePath) && !kept.includes(relativePath)) {
      // A file the new release dropped is removed, so a stale module cannot
      // keep answering for a feature that is gone.
      unlinkSync(join(INSTALL_ROOT, relativePath));
    }
  }
  for (const relativePath of incoming) {
    const target = join(INSTALL_ROOT, relativePath);
    mkdirSync(dirname(target), { recursive: true });
    const bytes = readFileSync(join(source, relativePath));
    if (existsSync(target)) unlinkSync(target);
    writeFileSync(target, bytes);
  }
}

/**
 * Replace the installed bundle with a freshly downloaded one.
 *
 * The sequence is: download, verify, extract beside the live directory, back
 * the live files up, then swap them in. A failure before the swap leaves the
 * running installation exactly as it was; a failure during the swap restores
 * the backup.
 *
 * @param {object} options - the request's options.
 * @param {AbortSignal} [options.signal] - the caller's abort signal.
 * @returns {Promise<object>} the outcome of the upgrade.
 */
export async function installLatest({ signal }) {
  const deadline = AbortSignal.timeout(UPDATE_TIMEOUT_MS);
  const combined = signal === undefined ? deadline : AbortSignal.any([signal, deadline]);
  const current = installedVersion();
  let release;
  try {
    release = await fetchLatestRelease(combined);
  } catch (error) {
    return {
      updated: false,
      current,
      error: error instanceof Error ? error.message : String(error),
    };
  }
  if (compareVersions(current, release.version) >= 0) {
    return { updated: false, current, version: release.version, reason: 'already-current' };
  }

  rmSync(WORK_ROOT, { recursive: true, force: true });
  mkdirSync(WORK_ROOT, { recursive: true });
  const staging = join(WORK_ROOT, 'staged');
  const backup = join(managementRoot(), `backup-${current ?? 'unknown'}`);

  try {
    const response = await fetch(release.tarball, { signal: combined });
    if (!response.ok) throw new Error(`tarball responded ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length > MAX_TARBALL_BYTES) throw new Error('the downloaded package is implausibly large');
    if (!matchesIntegrity(bytes, release.integrity)) {
      throw new Error('the downloaded package does not match the published integrity hash');
    }
    extractArchive(bytes, staging);
    // npm tarballs wrap everything in a `package/` directory.
    const unpacked = existsSync(join(staging, 'package', 'package.json'))
      ? join(staging, 'package')
      : staging;
    const manifest = JSON.parse(readFileSync(join(unpacked, 'package.json'), 'utf8'));
    if (manifest?.name !== PACKAGE_NAME) {
      throw new Error('the downloaded package carries a different name');
    }
    if (manifest?.version !== release.version) {
      throw new Error('the downloaded package carries a different version');
    }

    backupInstallation(backup);
    try {
      applyInstallation(unpacked);
    } catch (error) {
      // Put the previous files back before reporting the failure.
      try {
        applyInstallation(backup);
      } catch {
        // The backup is still on disk either way; the caller is told where.
      }
      throw error;
    }
    rmSync(staging, { recursive: true, force: true });
    rmSync(WORK_ROOT, { recursive: true, force: true });
    return {
      updated: true,
      current,
      version: release.version,
      backup,
      restartRequired: true,
    };
  } catch (error) {
    rmSync(WORK_ROOT, { recursive: true, force: true });
    return {
      updated: false,
      current,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Restore the installation from the backup the last upgrade left behind.
 *
 * @returns {object} the outcome of the restore.
 */
export function restoreBackup() {
  const root = managementRoot();
  const candidates = readdirSync(root)
    .filter((name) => name.startsWith('backup-'))
    .map((name) => join(root, name))
    .filter((path) => statSync(path, { throwIfNoEntry: false })?.isDirectory() === true)
    .sort((left, right) => right.localeCompare(left));
  if (candidates.length === 0) {
    return { restored: false, error: 'no backup is available' };
  }
  try {
    applyInstallation(candidates[0]);
    return { restored: true, backup: candidates[0] };
  } catch (error) {
    return { restored: false, error: error instanceof Error ? error.message : String(error) };
  }
}
