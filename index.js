/**
 * Host half of the Artifact Space bundle.
 *
 * Owns the workspace-isolated artifact ledger: it walks the durable workspace
 * registry, folds each session's final artifacts out of its event log, and
 * serves the derived rows plus file reads to the browser half over
 * authenticated `ctx.connection.fetch` routes. No model-facing behavior.
 *
 * Derivation follows the same rule the deliverables UI uses — the session log
 * is the only source of truth:
 *   - `deliverables/presented` events are explicit final deliveries,
 *   - successful first-party file mutations (`write`, `edit`, mutating
 *     `str_replace_editor`) are produced paths, resolved through the recorded
 *     absolute `meta.path` when present,
 *   - the latest `workspace/changes` announcement names the turn whose summary
 *     the Host still serves.
 *
 * Only files that still exist are listed. A session with no surviving artifact
 * is dropped, an empty workspace card is never emitted, and both sessions and
 * cards are ordered by last activity (newest first).
 */

/** Services the artifact fold and the authenticated routes need. */
const inject = [
  'connection',
  'sessionPersistence',
  'sessionQuery',
  'sessions',
  'workspaceRegistry',
  'workspaceFiles',
  'fs',
  'sandboxPolicy',
];

/** Absolute byte cap for a preview read; larger text files are refused. */
const MAX_PREVIEW_BYTES = 512 * 1024;

/** Line cap for one preview read, keeping a very long file bounded. */
const MAX_PREVIEW_LINES = 4000;

/** Route serving the grouped artifact rows for every workspace. */
const ROWS_PATH = '/api/artifact-space.rows';

/** Route serving one file's text for the preview. */
const READ_PATH = '/api/artifact-space.read';

/** Route serving one image's bytes so the preview can show it. */
const IMAGE_PATH = '/api/artifact-space.image';

/** Route serving one HTML document, rewritten so its own assets still resolve. */
const HTML_PATH = '/api/artifact-space.html';

/** Route serving one asset an HTML document references, by its workspace path. */
const ASSET_PATH = '/api/artifact-space.asset';

/**
 * Byte cap for one image read; larger pictures are refused rather than
 * pulled into memory whole.
 */
const MAX_IMAGE_BYTES = 16 * 1024 * 1024;

/**
 * Byte cap for one HTML read; a preview document is a page, not a data set.
 */
const MAX_HTML_BYTES = 4 * 1024 * 1024;

/**
 * Byte cap for one asset an HTML document pulls in.
 */
const MAX_ASSET_BYTES = 16 * 1024 * 1024;

/**
 * Extensions the HTML preview renders as a page rather than as source code.
 */
const HTML_EXTENSIONS = new Set(['html', 'htm']);

/**
 * Media types for the assets an HTML document may reference.
 *
 * The map covers what a self-contained report actually pulls in — pictures,
 * stylesheets, scripts, fonts — plus a plain-text fallback, so an unknown
 * extension still arrives as something the browser can display instead of a
 * download prompt.
 */
const ASSET_MEDIA_TYPES = new Map([
  ['png', 'image/png'],
  ['jpg', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['gif', 'image/gif'],
  ['webp', 'image/webp'],
  ['bmp', 'image/bmp'],
  ['avif', 'image/avif'],
  ['ico', 'image/x-icon'],
  ['svg', 'image/svg+xml'],
  ['css', 'text/css; charset=utf-8'],
  ['js', 'text/javascript; charset=utf-8'],
  ['mjs', 'text/javascript; charset=utf-8'],
  ['json', 'application/json; charset=utf-8'],
  ['html', 'text/html; charset=utf-8'],
  ['htm', 'text/html; charset=utf-8'],
  ['txt', 'text/plain; charset=utf-8'],
  ['md', 'text/markdown; charset=utf-8'],
  ['csv', 'text/csv; charset=utf-8'],
  ['woff', 'font/woff'],
  ['woff2', 'font/woff2'],
  ['ttf', 'font/ttf'],
  ['otf', 'font/otf'],
  ['mp4', 'video/mp4'],
  ['webm', 'video/webm'],
  ['mp3', 'audio/mpeg'],
  ['wav', 'audio/wav'],
]);

/** The media type an asset of this extension is served under. */
function assetMediaType(extension) {
  return ASSET_MEDIA_TYPES.get(extension) ?? 'application/octet-stream';
}

/**
 * Image extensions the preview can display, with the media type each one is
 * served under.
 *
 * The map is the single source of truth for what counts as a picture: the
 * client asks the Host for bytes only for these extensions, and the Host
 * serves them under exactly the type named here.
 */
const IMAGE_MEDIA_TYPES = new Map([
  ['png', 'image/png'],
  ['jpg', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['gif', 'image/gif'],
  ['webp', 'image/webp'],
  ['bmp', 'image/bmp'],
  ['avif', 'image/avif'],
  ['ico', 'image/x-icon'],
  ['svg', 'image/svg+xml'],
]);

/** Trailing path segment, the part that identifies the file at a glance. */
function basename(path) {
  const at = Math.max(path.lastIndexOf('/'), path.lastIndexOf('\\'));
  return at === -1 ? path : path.slice(at + 1);
}

/** Whether a path uses a Windows drive or UNC prefix. */
function isWindowsStylePath(value) {
  return /^[A-Za-z]:[/\\]/.test(value) || value.startsWith('\\\\');
}

/** Whether a path is absolute in either spelling the Host accepts. */
function isAbsoluteWorkspacePath(path) {
  return path.startsWith('/') || isWindowsStylePath(path);
}

/**
 * Normalize a workspace path for comparison.
 *
 * The Host stores workspace paths canonically, but a session header may spell
 * the same directory with different separators, a trailing slash, or a
 * different drive-letter case. Comparing the normalized forms keeps a
 * session with the same directory from looking like a stranger.
 *
 * @param {string} value - a workspace path.
 * @returns {string} the comparable form, or '' when there is nothing to compare.
 */
function normalizeWorkspacePath(value) {
  if (typeof value !== 'string' || value === '') return '';
  let text = value.replace(/\\/g, '/').replace(/\/+$/, '');
  // A Windows drive letter is case-insensitive; the rest of the path is not.
  if (/^[A-Za-z]:/.test(text)) text = text[0].toUpperCase() + text.slice(1);
  return text;
}

/**
 * Whether a session still belongs to one of the known workspaces.
 *
 * The Host's own workspace registry only counts a session whose working
 * directory resolves to the workspace path. A session that was removed from
 * its workspace leaves a persistence snapshot behind, but the Host drops it
 * from every list it shows. This mirrors that rule so the artifact rows
 * never surface a session the rest of the application has already forgotten.
 *
 * @param {string} cwd - the session's recorded working directory.
 * @param {Set<string>} workspacePaths - normalized workspace paths.
 * @returns {boolean} true when the session's cwd matches a workspace.
 */
function belongsToKnownWorkspace(cwd, workspacePaths) {
  if (typeof cwd !== 'string' || cwd === '') return false;
  return workspacePaths.has(normalizeWorkspacePath(cwd));
}

/**
 * Extensions whose contents are bytes, not text. Rows carrying one of these are
 * labelled `binary` so the browser never asks for a text preview it cannot get.
 */
const BINARY_EXTENSIONS = new Set([
  'png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'tif', 'tiff', 'avif', 'heic',
  'pdf', 'zip', 'gz', 'tgz', '7z', 'rar', 'tar', 'zst', 'br',
  'exe', 'dll', 'so', 'dylib', 'bin', 'dat', 'db', 'sqlite', 'wasm', 'class', 'jar',
  'woff', 'woff2', 'ttf', 'otf', 'eot',
  'mp3', 'wav', 'ogg', 'flac', 'mp4', 'webm', 'mov', 'avi', 'mkv',
  'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx',
]);

/** Lowercased extension without its dot, or the empty string. */
function extensionOf(path) {
  const name = basename(path);
  const at = name.lastIndexOf('.');
  return at > 0 && at < name.length - 1 ? name.slice(at + 1).toLowerCase() : '';
}

/** Whether a path's extension is known to hold binary content. */
function isBinaryPath(path) {
  const ext = extensionOf(path);
  // A picture is binary too, but it is binary the preview can still show, so
  // it never counts as unreadable here.
  if (IMAGE_MEDIA_TYPES.has(ext)) return false;
  return BINARY_EXTENSIONS.has(ext);
}

/** Whether a path's extension names a picture the preview can display. */
function isImagePath(path) {
  return IMAGE_MEDIA_TYPES.has(extensionOf(path));
}

/** Coerce a recorded time (epoch ms, epoch seconds, or an ISO string) to milliseconds. */
function toEpochMs(value) {
  if (typeof value === 'number' && Number.isFinite(value) && value > 0) {
    return value < 1e12 ? value * 1000 : value;
  }
  if (typeof value === 'string' && value !== '') {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
}

/** Header timestamp fallback for a session whose events carry no time. */
function headerTime(snapshot) {
  const header = snapshot?.header ?? {};
  for (const value of [header.lastActivityAt, header.updatedAt, header.createdAt]) {
    const time = toEpochMs(value);
    if (time !== null) return time;
  }
  return null;
}

/** Resolve the session workspace root once, for canonical containment checks. */
async function workspaceRootTarget(ctx, cwd, signal) {
  if (typeof cwd !== 'string' || cwd === '') return null;
  try {
    return await ctx.fs.resolve(cwd, { signal });
  } catch {
    return null;
  }
}

/**
 * Whether a resolved file target still lives inside its workspace root.
 *
 * `FileSystem.contains` accepts canonical targets, not path strings. An
 * unresolvable root leaves the verdict unknown: the row stays listed and the
 * read route still enforces confinement on its own.
 */
function isWithinWorkspace(ctx, rootTarget, target) {
  if (rootTarget === null) return true;
  try {
    return ctx.fs.contains(rootTarget, target) === true;
  } catch {
    return true;
  }
}

/** Narrow parsed JSON to an argument object. */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/** Validate a file declaration read from a Session log. */
function isPresentedFile(value) {
  if (!isRecord(value)) return false;
  const { path, description } = value;
  return typeof path === 'string'
    && path.trim().length > 0
    && (description === undefined || typeof description === 'string');
}

/** Validate a delivery event before reading its file declarations. */
function isPresentedData(value) {
  if (!isRecord(value)) return false;
  const { turn, callId, files } = value;
  return typeof turn === 'number' && Number.isSafeInteger(turn) && turn >= 1
    && typeof callId === 'string' && callId.length > 0
    && Array.isArray(files);
}

/** Extract the path from a supported first-party mutation call. */
function mutationPath(name, argsRaw) {
  let args;
  try {
    args = JSON.parse(argsRaw);
  } catch {
    return null;
  }
  if (!isRecord(args)) return null;
  switch (name) {
    case 'write':
      return typeof args.content === 'string' ? pathValue(args.file_path) : null;
    case 'edit':
      return validEditArgs(args) ? pathValue(args.file_path) : null;
    case 'str_replace_editor':
      return editorMutationPath(args);
    default:
      return null;
  }
}

/** Validate the fields that an `edit` execution requires. */
function validEditArgs(args) {
  return typeof args.old_string === 'string' && args.old_string.length > 0
    && typeof args.new_string === 'string'
    && args.old_string !== args.new_string
    && (args.replace_all === undefined || typeof args.replace_all === 'boolean');
}

/** Extract a path only from a complete mutating editor command. */
function editorMutationPath(args) {
  const path = pathValue(args.path);
  if (path === null) return null;
  switch (args.command) {
    case 'create':
      return typeof args.file_text === 'string' ? path : null;
    case 'str_replace':
      return typeof args.old_str === 'string' && args.old_str.length > 0
        && (args.new_str === undefined || typeof args.new_str === 'string') ? path : null;
    case 'insert':
      return typeof args.insert_line === 'number' && Number.isInteger(args.insert_line)
        && args.insert_line >= 0 && typeof args.new_str === 'string' ? path : null;
    default:
      return null;
  }
}

/** A non-blank path preserves the exact spelling supplied to the tool. */
function pathValue(value) {
  return typeof value === 'string' && value.trim().length > 0 ? value : null;
}

/** Resolve a settled mutation from recorded metadata, retaining legacy argument paths. */
function mutationResultPath(argumentPath, meta) {
  if (!isRecord(meta) || !Object.hasOwn(meta, 'path')) return argumentPath;
  if (typeof meta.path === 'string' && isAbsoluteWorkspacePath(meta.path)) return meta.path;
  return isAbsoluteWorkspacePath(argumentPath) ? argumentPath : null;
}

/** Whether one event appended to the model-visible surface at its own log position. */
function isAppendSurfaceEvent(event) {
  return event.surfaceOp === 'append';
}

/**
 * Fold one session's final artifacts from its complete event log.
 *
 * Mirrors the turn-scoped deliverables derivation at session scope: the last
 * delivery of each path wins its description, a path both produced and
 * delivered is one entry whose kind is `presented`, and every row carries the
 * moment it last appeared in the log so the list can be read newest first.
 * The turn of the latest `workspace/changes` announcement is
 * carried so the preview can resolve it through the same Host recorder. The
 * final event timestamp is returned as the session's last activity.
 *
 * @param events - the session log, ascending by seq.
 * @returns the folded artifact rows, latest change turn, and last event time.
 */
function foldSessionArtifacts(events) {
  const calls = new Map();
  const produced = [];
  const seen = new Set();
  const presented = new Map();
  let changesTurn = null;
  let lastActivity = null;

  for (const event of events) {
    // Normalize once here: a log may record seconds while the preview expects
    // milliseconds, and a mixed unit would sort correctly yet render "59 个月前".
    const at = toEpochMs(event.time);
    if (at !== null) lastActivity = at;
    switch (event.type) {
      case 'tool/call':
        calls.set(String(event.data.callId), mutationPath(event.data.name, event.data.arguments));
        break;
      case 'tool/result': {
        if (event.data.message.isError === true) break;
        if (!isAppendSurfaceEvent(event)) break;
        const argumentPath = calls.get(String(event.data.message.source.callId));
        if (argumentPath === null || argumentPath === undefined) break;
        const path = mutationResultPath(argumentPath, event.data.meta);
if (path === null || seen.has(path)) break;
            seen.add(path);
            produced.push({ path, at });
            break;
      }
      case 'deliverables/presented': {
        if (!isPresentedData(event.data)) break;
        const { turn, files } = event.data;
        for (const file of files) {
          if (!isPresentedFile(file)) continue;
          presented.set(file.path, {
            path: file.path,
            description: typeof file.description === 'string' ? file.description : undefined,
            turn,
            at,
          });
        }
        break;
      }
      case 'workspace/changes':
        if (isRecord(event.data) && Number.isSafeInteger(event.data.turn) && event.data.turn >= 1) {
          changesTurn = event.data.turn;
        }
        break;
      default:
        break;
    }
  }

  // Every row carries the moment its file last appeared in the log: the write
  // for a produced file, the delivery for a presented one, or the later of the
  // two when a path is both written and delivered.
  const rows = [];
  for (const entry of produced) {
    const delivery = presented.get(entry.path);
    rows.push({
      path: entry.path,
      description: delivery?.description,
      turn: delivery?.turn ?? null,
      kind: delivery === undefined ? 'produced' : 'presented',
      producedAt: laterTime(entry.at, delivery?.at ?? null),
    });
  }
  for (const [path, delivery] of presented) {
    if (seen.has(path)) continue;
    rows.push({
      path,
      description: delivery.description,
      turn: delivery.turn,
      kind: 'presented',
      producedAt: delivery.at,
    });
  }
  // Newest first, so the file the reader just made is the first one they see.
  rows.sort((left, right) => (right.producedAt ?? 0) - (left.producedAt ?? 0)
    || left.path.localeCompare(right.path));
  return { rows, changesTurn, lastActivity };
}

/** The later of two optional epoch-millisecond stamps, or the one that exists. */
function laterTime(left, right) {
  if (left === null || left === undefined) return right ?? null;
  if (right === null || right === undefined) return left;
  return Math.max(left, right);
}

/**
 * Stat one workspace path and return both its canonical target and metadata.
 *
 * @param path - absolute Host path.
 * @param signal - cancellation.
 * @returns the target plus stat, or `null` when it is absent or not a regular file.
 */
async function resolveRegularFile(ctx, path, signal) {
  const { fs } = ctx;
  const target = await fs.resolve(path, { signal });
  const info = await fs.stat(target, signal);
  if (info === undefined || info.type !== 'file') return null;
  return { target, info };
}

/**
 * Build one workspace card, dropping it when it has no listable session and
 * ordering its sessions by last activity (most recent first).
 *
 * @param workspace - registry entry, or the synthetic ungrouped bucket.
 * @param sessions - session rows, each with artifacts and a lastActivity.
 * @param grouped - whether this is a real workspace.
 * @returns the card payload, or `null` when nothing remains to show.
 */
function workspaceGroup(workspace, sessions, grouped = true) {
  if (sessions.length === 0) return null;
  sessions.sort((left, right) => right.lastActivity - left.lastActivity
    || left.sessionId.localeCompare(right.sessionId));
  let artifactCount = 0;
  let lastActivity = 0;
  for (const session of sessions) {
    artifactCount += session.artifacts.length;
    if (session.lastActivity > lastActivity) lastActivity = session.lastActivity;
  }
  return {
    workspaceId: String(workspace.id ?? ''),
    title: typeof workspace.title === 'string' ? workspace.title : '',
    path: typeof workspace.path === 'string' ? workspace.path : '',
    grouped,
    artifactCount,
    sessionCount: sessions.length,
    lastActivity,
    sessions,
  };
}

/**
 * Group every workspace's sessions with their final artifacts.
 *
 * Workspaces are read from the durable registry, but only cards that still own
 * at least one artifact survive. Sessions that belong to no workspace are
 * reported under a trailing ungrouped bucket. Cards and their sessions are
 * ordered by last activity, newest first.
 *
 * @param signal - cancellation.
 * @returns non-empty workspace cards in last-activity order.
 */
async function collectRows(ctx, signal) {
  const workspaces = ctx.workspaceRegistry.list();
  const snapshots = await ctx.sessionPersistence.list({ signal });
  const snapshotsById = new Map(snapshots.map((snapshot) => [String(snapshot.header.id), snapshot]));

  const sessions = new Set();
  for (const workspace of workspaces) for (const id of workspace.sessionIds) sessions.add(String(id));
  for (const id of snapshotsById.keys()) sessions.add(id);

  // Sessions accounted for by at least one workspace; everything else is stray.
  const accounted = new Set();
  for (const workspace of workspaces) for (const id of workspace.sessionIds) accounted.add(String(id));

  // The paths of every known workspace. A stray session whose working
  // directory still points at one of them was removed from that workspace but
  // left a persistence snapshot behind, so the Host no longer lists it. Those
  // leftovers are dropped instead of being reported as an ungrouped bucket.
  const workspacePaths = new Set();
  for (const workspace of workspaces) {
    const normalized = normalizeWorkspacePath(workspace.path);
    if (normalized !== '') workspacePaths.add(normalized);
  }

  // One batched title read for every visible session; failures fall back to the id.
  const titles = new Map();
  try {
    const observations = await ctx.sessionQuery.readTitleSnapshots([...sessions], signal);
    for (const result of observations) {
      if (result.status === 'fulfilled' && result.value.title !== undefined) {
        titles.set(String(result.sessionId), result.value.title.title);
      }
    }
  } catch {
    // Titles are presentation only; the id remains the fallback label.
  }

  const groups = [];
  for (const workspace of workspaces) {
    const sessionRows = [];
    for (const id of workspace.sessionIds) {
      const row = await collectSessionRow(ctx, String(id), snapshotsById, titles, signal);
      if (row !== null) sessionRows.push(row);
    }
    const group = workspaceGroup(workspace, sessionRows);
    if (group !== null) groups.push(group);
  }

  const stray = [];
  for (const id of snapshotsById.keys()) {
    if (accounted.has(id)) continue;
    const row = await collectSessionRow(ctx, id, snapshotsById, titles, signal);
    if (row === null) continue;
    // A leftover snapshot of a session that used to live in one of the known
    // workspaces is not a stray: the Host has already forgotten it, so it is
    // dropped here as well rather than surfacing as an ungrouped card.
    if (belongsToKnownWorkspace(row.cwd, workspacePaths)) continue;
    stray.push(row);
  }
  const ungrouped = workspaceGroup({ id: '', title: '', path: '' }, stray, false);
  if (ungrouped !== null) groups.push(ungrouped);

  // Cards follow their most recently active session, newest first.
  groups.sort((left, right) => right.lastActivity - left.lastActivity
    || left.title.localeCompare(right.title));
  return groups;
}

/**
 * Fold one session's artifacts and resolve them against the filesystem.
 *
 * A session whose log is unreadable, needs migration, or whose recorded files
 * have all disappeared has nothing to show and is dropped entirely. Its
 * `lastActivity` comes from the final event time, falling back to a header
 * timestamp.
 *
 * @param sessionId - the session to fold.
 * @param snapshotsById - persistence snapshots by id, for the header and format status.
 * @param signal - cancellation.
 * @returns the non-empty session row, or `null` when it has nothing to list.
 */
async function collectSessionRow(ctx, sessionId, snapshotsById, titles, signal) {
  const snapshot = snapshotsById.get(sessionId);
  if (snapshot === undefined) return null;
  if (snapshot.formatStatus === 'migration-required') return null;
  const cwd = typeof snapshot.header.cwd === 'string' ? snapshot.header.cwd : ctx.sandboxPolicy.workspaceRoot;

  let events;
  try {
    events = (await ctx.sessionQuery.readSession(sessionId)).events;
  } catch {
    return null;
  }

  const { rows, lastActivity } = foldSessionArtifacts(events);
  if (rows.length === 0) return null;

  const rootTarget = await workspaceRootTarget(ctx, cwd, signal);
  const artifacts = [];
  for (const row of rows) {
    const absolutePath = resolveAgainst(cwd, row.path);
    if (absolutePath === null) continue;
    let resolved = null;
    try {
      resolved = await resolveRegularFile(ctx, absolutePath, signal);
    } catch {
      resolved = null;
    }
    if (resolved === null) continue;
    artifacts.push({
      path: row.path,
      absolutePath,
      name: basename(row.path),
      kind: row.kind,
      description: row.description ?? null,
      turn: row.turn,
      producedAt: row.producedAt ?? null,
      bytes: resolved.info.size ?? 0,
      extension: extensionOf(absolutePath),
      binary: isBinaryPath(absolutePath),
      // A picture the preview can show: the browser fetches its bytes from the
      // image route instead of asking the text route for a preview.
      image: isImagePath(absolutePath),
      // An HTML document the preview renders as a page: it comes from the
      // HTML route, which rewrites its own relative references so the
      // pictures and styles it pulls in still resolve.
      html: HTML_EXTENSIONS.has(extensionOf(absolutePath)),
      mediaType: IMAGE_MEDIA_TYPES.get(extensionOf(absolutePath)) ?? null,
      outsideWorkspace: !isWithinWorkspace(ctx, rootTarget, resolved.target),
    });
  }
  if (artifacts.length === 0) return null;

  return {
    sessionId,
    title: titles.get(sessionId) ?? sessionId,
    cwd,
    lastActivity: lastActivity ?? headerTime(snapshot) ?? 0,
    artifactCount: artifacts.length,
    artifacts,
  };
}

/**
 * Resolve a recorded path against the session's workspace root.
 *
 * An absolute path is returned as-is (only separators are normalized), so it is
 * never appended to the cwd a second time; relative paths join the cwd once.
 *
 * @param cwd - the session's workspace root.
 * @param path - the recorded absolute or workspace-relative path.
 * @returns the absolute Host path, or `null` when a relative path has no root.
 */
function resolveAgainst(cwd, path) {
  const normalized = path.replace(/\\/g, '/').replace(/^(?:\.\/)+/, '');
  if (isAbsoluteWorkspacePath(normalized)) return normalized;
  if (cwd === undefined || cwd === '') return null;
  const separator = isWindowsStylePath(cwd) && cwd.includes('\\') ? '\\' : '/';
  return `${cwd.replace(/[/\\]+$/, '')}${separator}${normalized.replace(/^[/\\]+/, '')}`;
}

/** The typed code on a filesystem or workspace-file failure, when present. */
function failureCode(error) {
  return error && typeof error === 'object' && 'code' in error ? String(error.code) : '';
}

/** Translate a lookup or filesystem failure into the status the browser renders from. */
function failureStatus(error) {
  const code = failureCode(error);
  if (code === 'workspace-file/not-found' || code === 'workspace-file/not-regular-file') return 404;
  if (code === 'workspace-file/outside-workspace') return 403;
  if (code === 'workspace-file/too-large') return 413;
  if (code === 'workspace-file/not-text') return 415;
  if (code === 'ENOENT' || code === 'ENOTDIR') return 404;
  return 500;
}

/** Read one artifact's text for the preview, bounded by size and line count. */
async function readArtifact(ctx, request) {
  const { sessionId, path } = request;
  if (typeof sessionId !== 'string' || typeof path !== 'string' || path.length === 0) {
    return Response.json({ error: 'invalid-artifact' }, { status: 400 });
  }
  // Declared outside the guard: the failure branches below quote both, and an
  // early throw (a missing snapshot) must not hit a temporal dead zone.
  let cwd;
  let absolutePath = null;
  try {
    const live = typeof ctx.sessions?.get === 'function' ? ctx.sessions.get(sessionId) : undefined;
    const stored = live === undefined && typeof ctx.sessionPersistence?.stat === 'function'
      ? await ctx.sessionPersistence.stat(sessionId)
      : undefined;
    if (live === undefined && stored === undefined) {
      return Response.json({ error: 'session-not-found' }, { status: 404 });
    }
    cwd = live?.header.cwd ?? stored?.header.cwd ?? ctx.sandboxPolicy.workspaceRoot;
    absolutePath = resolveAgainst(cwd, path);
    if (absolutePath === null) {
      return Response.json({ error: 'unresolvable-path' }, { status: 400 });
    }
    const resolved = await resolveRegularFile(ctx, absolutePath, request.signal);
    if (resolved === null) {
      return Response.json({ error: 'not-a-file' }, { status: 404 });
    }
    const rootTarget = await workspaceRootTarget(ctx, cwd, request.signal);
    if (!isWithinWorkspace(ctx, rootTarget, resolved.target)) {
      return Response.json(
        { error: 'outside-workspace', path: absolutePath, workspaceRoot: cwd },
        { status: 403 },
      );
    }
    if (isBinaryPath(absolutePath)) {
      return Response.json(
        {
          error: 'binary-file',
          binary: true,
          extension: extensionOf(absolutePath),
          bytes: resolved.info.size ?? 0,
        },
        { status: 415 },
      );
    }
    if (resolved.info.size !== undefined && resolved.info.size > MAX_PREVIEW_BYTES) {
      return Response.json(
        { error: 'too-large', limit: MAX_PREVIEW_BYTES },
        { status: 413 },
      );
    }
    const scope = { sessionId, workspaceRoot: cwd };
    const read = await ctx.workspaceFiles.read(scope, absolutePath, { limit: MAX_PREVIEW_LINES }, request.signal);
    return Response.json({
      path: read.absolutePath,
      absolutePath,
      text: read.text,
      bytes: read.bytes,
      lines: read.lines,
      eof: read.eof,
      truncated: read.eof === false,
    }, { headers: { 'cache-control': 'no-store' } });
  } catch (error) {
    request.signal.throwIfAborted();
    const code = failureCode(error);
    if (code === 'workspace-file/outside-workspace') {
      return Response.json(
        { error: 'outside-workspace', path: absolutePath ?? path, workspaceRoot: cwd ?? '' },
        { status: 403 },
      );
    }
    if (code === 'workspace-file/not-text') {
      return Response.json(
        { error: 'binary-file', binary: true, extension: absolutePath === null ? '' : extensionOf(absolutePath) },
        { status: 415 },
      );
    }
    const status = failureStatus(error);
    // `workspaceFiles.read` enforces its own limits, so a refusal it raises
    // must still reach the browser as the typed sentence it renders, not as a
    // generic failure that hides the reason.
    if (status === 413) {
      return Response.json({ error: 'too-large', limit: MAX_PREVIEW_BYTES }, { status });
    }
    // Surface the actual failure reason: without this the browser only ever
    // sees a generic "cannot read" and the Host log stays silent about why.
    const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    // `console.error` reaches the Host log file; the injected logger may be
    // absent, and a silent Host is what made this unreadable for days.
    console.error(`[artifact-space] read failed for "${path}" (cwd ${cwd ?? '?'} -> ${absolutePath ?? '?'}): ${detail}`);
    ctx.logger?.warn?.(`artifact-space read failed for "${path}": ${detail}`);
    return Response.json({ error: 'read-failed', detail }, { status });
  }
}

/** Parse one query value, rejecting anything but a non-empty string. */
function requiredQuery(url, name) {
  const value = url.searchParams.get(name);
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * Read one picture's bytes so the preview can display it.
 *
 * The path is resolved and confined exactly like a text preview: the file must
 * be a regular file inside the session's own workspace, and its extension must
 * name a picture the preview knows how to show. Bytes are served under the
 * media type that extension maps to, so the browser renders the picture
 * instead of guessing from the bytes.
 *
 * @param ctx - host context carrying the session, workspace and file services.
 * @param request - the incoming request, carrying the session id and path.
 * @returns {Promise<Response>} the picture bytes, or a typed failure.
 */
async function readArtifactImage(ctx, request) {
  const { sessionId, path } = request;
  if (typeof sessionId !== 'string' || typeof path !== 'string' || path.length === 0) {
    return Response.json({ error: 'invalid-artifact' }, { status: 400 });
  }
  let cwd;
  let absolutePath = null;
  try {
    const live = typeof ctx.sessions?.get === 'function' ? ctx.sessions.get(sessionId) : undefined;
    const stored = live === undefined && typeof ctx.sessionPersistence?.stat === 'function'
      ? await ctx.sessionPersistence.stat(sessionId)
      : undefined;
    if (live === undefined && stored === undefined) {
      return Response.json({ error: 'session-not-found' }, { status: 404 });
    }
    cwd = live?.header.cwd ?? stored?.header.cwd ?? ctx.sandboxPolicy.workspaceRoot;
    absolutePath = resolveAgainst(cwd, path);
    if (absolutePath === null) {
      return Response.json({ error: 'unresolvable-path' }, { status: 400 });
    }
    const mediaType = IMAGE_MEDIA_TYPES.get(extensionOf(absolutePath));
    if (mediaType === undefined) {
      return Response.json({ error: 'not-an-image', extension: extensionOf(absolutePath) }, { status: 415 });
    }
    const resolved = await resolveRegularFile(ctx, absolutePath, request.signal);
    if (resolved === null) {
      return Response.json({ error: 'not-a-file' }, { status: 404 });
    }
    const rootTarget = await workspaceRootTarget(ctx, cwd, request.signal);
    if (!isWithinWorkspace(ctx, rootTarget, resolved.target)) {
      return Response.json(
        { error: 'outside-workspace', path: absolutePath, workspaceRoot: cwd },
        { status: 403 },
      );
    }
    if (resolved.info.size !== undefined && resolved.info.size > MAX_IMAGE_BYTES) {
      return Response.json(
        { error: 'too-large', limit: MAX_IMAGE_BYTES, bytes: resolved.info.size },
        { status: 413 },
      );
    }
    const scope = { sessionId, workspaceRoot: cwd };
    const read = await ctx.workspaceFiles.readBytes(scope, absolutePath, {}, request.signal);
    const data = read.data instanceof Uint8Array ? read.data : new Uint8Array(read.data ?? []);
    if (data.length === 0) {
      return Response.json({ error: 'empty-file' }, { status: 404 });
    }
    return new Response(data, {
      status: 200,
      headers: {
        'content-type': mediaType,
        'content-length': String(data.length),
        // The bytes are the file's own; a private cache keeps them out of any
        // shared cache while still letting the browser reuse them while the
        // preview stays open.
        'cache-control': 'private, max-age=60',
      },
    });
  } catch (error) {
    request.signal.throwIfAborted();
    const code = failureCode(error);
    if (code === 'workspace-file/outside-workspace') {
      return Response.json(
        { error: 'outside-workspace', path: absolutePath ?? path, workspaceRoot: cwd ?? '' },
        { status: 403 },
      );
    }
    if (code === 'workspace-file/not-found') {
      return Response.json({ error: 'not-found' }, { status: 404 });
    }
    const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    console.error(`[artifact-space] image read failed for "${path}": ${detail}`);
    ctx.logger?.warn?.(`artifact-space image read failed for "${path}": ${detail}`);
    return Response.json({ error: 'read-failed', detail }, { status: failureStatus(error) });
  }
}

/**
 * Read one HTML document and serve it with its own relative references
 * rewritten so they still resolve inside the preview.
 *
 * A report written as one self-contained page usually pulls its pictures in
 * with relative paths (`图1-说明.svg`). Loaded as a plain document those
 * resolve against the app's own base URL, so every picture breaks. Rewriting
 * each relative reference into an absolute, authenticated asset URL keeps the
 * document looking exactly as it does in a browser tab.
 *
 * The rewrite covers the references that matter in a report — `src`, `href`,
 * `poster` and `srcset` — and leaves absolute URLs, data URIs and fragments
 * alone, so an already-correct document is not touched.
 *
 * @param ctx - host context carrying the session, workspace and file services.
 * @param request - the incoming request, carrying the session id and path.
 * @returns {Promise<Response>} the rewritten document, or a typed failure.
 */
async function readArtifactHtml(ctx, request) {
  const { sessionId, path } = request;
  if (typeof sessionId !== 'string' || typeof path !== 'string' || path.length === 0) {
    return Response.json({ error: 'invalid-artifact' }, { status: 400 });
  }
  let cwd;
  let absolutePath = null;
  try {
    const live = typeof ctx.sessions?.get === 'function' ? ctx.sessions.get(sessionId) : undefined;
    const stored = live === undefined && typeof ctx.sessionPersistence?.stat === 'function'
      ? await ctx.sessionPersistence.stat(sessionId)
      : undefined;
    if (live === undefined && stored === undefined) {
      return Response.json({ error: 'session-not-found' }, { status: 404 });
    }
    cwd = live?.header.cwd ?? stored?.header.cwd ?? ctx.sandboxPolicy.workspaceRoot;
    absolutePath = resolveAgainst(cwd, path);
    if (absolutePath === null) {
      return Response.json({ error: 'unresolvable-path' }, { status: 400 });
    }
    if (!HTML_EXTENSIONS.has(extensionOf(absolutePath))) {
      return Response.json({ error: 'not-html', extension: extensionOf(absolutePath) }, { status: 415 });
    }
    const resolved = await resolveRegularFile(ctx, absolutePath, request.signal);
    if (resolved === null) {
      return Response.json({ error: 'not-a-file' }, { status: 404 });
    }
    const rootTarget = await workspaceRootTarget(ctx, cwd, request.signal);
    if (!isWithinWorkspace(ctx, rootTarget, resolved.target)) {
      return Response.json(
        { error: 'outside-workspace', path: absolutePath, workspaceRoot: cwd },
        { status: 403 },
      );
    }
    if (resolved.info.size !== undefined && resolved.info.size > MAX_HTML_BYTES) {
      return Response.json({ error: 'too-large', limit: MAX_HTML_BYTES }, { status: 413 });
    }
    const scope = { sessionId, workspaceRoot: cwd };
    const read = await ctx.workspaceFiles.read(scope, absolutePath, { limit: MAX_PREVIEW_LINES }, request.signal);
    const document = rewriteHtmlReferences(read.text ?? '', sessionId, path);
    return new Response(document, {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'no-store',
        // The document is rendered inside the panel, so it must not be allowed
        // to reach out to the network or to run inline scripts of its own.
        'content-security-policy': "default-src 'none'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self' data:; script-src 'self'; media-src 'self'; frame-src 'self'",
      },
    });
  } catch (error) {
    request.signal.throwIfAborted();
    const code = failureCode(error);
    if (code === 'workspace-file/outside-workspace') {
      return Response.json(
        { error: 'outside-workspace', path: absolutePath ?? path, workspaceRoot: cwd ?? '' },
        { status: 403 },
      );
    }
    if (code === 'workspace-file/not-found') {
      return Response.json({ error: 'not-found' }, { status: 404 });
    }
    const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    console.error(`[artifact-space] html read failed for "${path}": ${detail}`);
    ctx.logger?.warn?.(`artifact-space html read failed for "${path}": ${detail}`);
    return Response.json({ error: 'read-failed', detail }, { status: failureStatus(error) });
  }
}

/**
 * Read one asset an HTML document references.
 *
 * The asset is resolved and confined exactly like an image or a text preview:
 * it must be a regular file inside the session's own workspace. It is served
 * under the media type its extension names, so the browser renders a picture
 * as a picture instead of downloading it.
 *
 * @param ctx - host context carrying the session, workspace and file services.
 * @param request - the incoming request, carrying the session id and path.
 * @returns {Promise<Response>} the asset bytes, or a typed failure.
 */
async function readArtifactAsset(ctx, request) {
  const { sessionId, path } = request;
  if (typeof sessionId !== 'string' || typeof path !== 'string' || path.length === 0) {
    return Response.json({ error: 'invalid-artifact' }, { status: 400 });
  }
  let cwd;
  let absolutePath = null;
  try {
    const live = typeof ctx.sessions?.get === 'function' ? ctx.sessions.get(sessionId) : undefined;
    const stored = live === undefined && typeof ctx.sessionPersistence?.stat === 'function'
      ? await ctx.sessionPersistence.stat(sessionId)
      : undefined;
    if (live === undefined && stored === undefined) {
      return Response.json({ error: 'session-not-found' }, { status: 404 });
    }
    cwd = live?.header.cwd ?? stored?.header.cwd ?? ctx.sandboxPolicy.workspaceRoot;
    absolutePath = resolveAgainst(cwd, path);
    if (absolutePath === null) {
      return Response.json({ error: 'unresolvable-path' }, { status: 400 });
    }
    const resolved = await resolveRegularFile(ctx, absolutePath, request.signal);
    if (resolved === null) {
      return Response.json({ error: 'not-a-file' }, { status: 404 });
    }
    const rootTarget = await workspaceRootTarget(ctx, cwd, request.signal);
    if (!isWithinWorkspace(ctx, rootTarget, resolved.target)) {
      return Response.json(
        { error: 'outside-workspace', path: absolutePath, workspaceRoot: cwd },
        { status: 403 },
      );
    }
    if (resolved.info.size !== undefined && resolved.info.size > MAX_ASSET_BYTES) {
      return Response.json({ error: 'too-large', limit: MAX_ASSET_BYTES }, { status: 413 });
    }
    const scope = { sessionId, workspaceRoot: cwd };
    const read = await ctx.workspaceFiles.readBytes(scope, absolutePath, {}, request.signal);
    const data = read.data instanceof Uint8Array ? read.data : new Uint8Array(read.data ?? []);
    if (data.length === 0) {
      return Response.json({ error: 'empty-file' }, { status: 404 });
    }
    return new Response(data, {
      status: 200,
      headers: {
        'content-type': assetMediaType(extensionOf(absolutePath)),
        'content-length': String(data.length),
        'cache-control': 'private, max-age=60',
      },
    });
  } catch (error) {
    request.signal.throwIfAborted();
    const code = failureCode(error);
    if (code === 'workspace-file/outside-workspace') {
      return Response.json(
        { error: 'outside-workspace', path: absolutePath ?? path, workspaceRoot: cwd ?? '' },
        { status: 403 },
      );
    }
    if (code === 'workspace-file/not-found') {
      return Response.json({ error: 'not-found' }, { status: 404 });
    }
    const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
    console.error(`[artifact-space] asset read failed for "${path}": ${detail}`);
    ctx.logger?.warn?.(`artifact-space asset read failed for "${path}": ${detail}`);
    return Response.json({ error: 'read-failed', detail }, { status: failureStatus(error) });
  }
}

/**
 * Rewrite an HTML document's relative references into authenticated asset URLs.
 *
 * A reference is rewritten only when it points at a sibling file: absolute
 * URLs, protocol-relative URLs, `data:` URIs, fragment-only links and
 * `mailto:` links are left exactly as they are. The rewritten URL carries the
 * session id and the workspace-relative path, which is what lets the asset
 * route apply the same confinement rules as every other read.
 *
 * @param {string} html - the document as read from disk.
 * @param {string} sessionId - the session the document belongs to.
 * @param {string} documentPath - the document's workspace-relative path.
 * @returns {string} the document with its references rewritten.
 */
function rewriteHtmlReferences(html, sessionId, documentPath) {
  if (typeof html !== 'string' || html === '') return '';
  const directory = directoryOf(documentPath);
  // The attribute pattern is deliberately narrow: it matches the reference
  // attributes a report uses, and leaves every other attribute alone.
  return html.replace(
    /\b(src|href|poster)\s*=\s*(["'])([^"']*)\2/gi,
    (match, attribute, quote, reference) => {
      const rewritten = assetUrlFor(sessionId, directory, reference);
      return rewritten === null ? match : `${attribute}=${quote}${rewritten}${quote}`;
    },
  ).replace(
    /\bsrcset\s*=\s*(["'])([^"']*)\1/gi,
    (match, quote, list) => {
      const rewritten = rewriteSrcset(sessionId, directory, list);
      return rewritten === null ? match : `srcset=${quote}${rewritten}${quote}`;
    },
  );
}

/**
 * The workspace-relative directory a document lives in.
 *
 * @param {string} path - the document's workspace-relative path.
 * @returns {string} the directory, without a trailing separator.
 */
function directoryOf(path) {
  const normalized = String(path).replace(/\\/g, '/');
  const at = normalized.lastIndexOf('/');
  return at === -1 ? '' : normalized.slice(0, at);
}

/**
 * Build the asset URL for one reference, or null when it must be left alone.
 *
 * @param {string} sessionId - the session the document belongs to.
 * @param {string} directory - the document's workspace-relative directory.
 * @param {string} reference - the reference as written in the document.
 * @returns {string|null} the absolute asset URL, or null to keep the original.
 */
function assetUrlFor(sessionId, directory, reference) {
  if (typeof reference !== 'string') return null;
  const trimmed = reference.trim();
  // Absolute, protocol-relative, inline and fragment-only references already
  // resolve on their own and must not be touched.
  if (trimmed === '') return null;
  if (trimmed.startsWith('#')) return null;
  if (trimmed.startsWith('//')) return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return null;
  const resolved = resolveRelativePath(directory, trimmed);
  if (resolved === null) return null;
  const query = new URLSearchParams({ sessionId, path: resolved }).toString();
  return `${ASSET_PATH}?${query}`;
}

/**
 * Resolve one relative reference against the document's directory.
 *
 * The result stays inside the workspace: a reference that climbs out with `..`
 * past the workspace root is refused. Climbing one level up is normal — a
 * document in a subfolder routinely points at an asset beside it — so the
 * refusal stops at the root rather than at the document's own folder. The
 * asset route confines the read to the workspace anyway; this keeps a
 * nonsense path from turning into a request in the first place.
 *
 * @param {string} directory - the document's workspace-relative directory.
 * @param {string} reference - the reference as written in the document.
 * @returns {string|null} the workspace-relative path, or null when refused.
 */
function resolveRelativePath(directory, reference) {
  const withoutQuery = reference.split('#')[0].split('?')[0];
  if (withoutQuery === '') return null;
  const segments = directory === '' ? [] : directory.split('/').filter((part) => part !== '');
  for (const part of withoutQuery.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') {
      if (segments.length === 0) return null;
      segments.pop();
      continue;
    }
    segments.push(part);
  }
  if (segments.length === 0) return null;
  return segments.join('/');
}

/**
 * Rewrite a `srcset` list, dropping the entries that cannot be resolved.
 *
 * @param {string} sessionId - the session the document belongs to.
 * @param {string} directory - the document's workspace-relative directory.
 * @param {string} list - the `srcset` value as written in the document.
 * @returns {string|null} the rewritten list, or null to keep the original.
 */
function rewriteSrcset(sessionId, directory, list) {
  if (typeof list !== 'string' || list.trim() === '') return null;
  const entries = list.split(',').map((entry) => entry.trim()).filter((entry) => entry !== '');
  if (entries.length === 0) return null;
  const rewritten = [];
  for (const entry of entries) {
    const parts = entry.split(/\s+/);
    const url = assetUrlFor(sessionId, directory, parts[0]);
    if (url === null) continue;
    rewritten.push(parts.length > 1 ? `${url} ${parts.slice(1).join(' ')}` : url);
  }
  if (rewritten.length === 0) return null;
  return rewritten.join(', ');
}

/**
 * Register the Artifact Space routes inside Connection's authentication fence.
 *
 * @param ctx - host context carrying the connection, session, and workspace services.
 */
function registerRoutes(ctx) {
  const lifetime = new AbortController();
  const pending = new Set();

  ctx.effect(() => async () => {
    lifetime.abort();
    await Promise.allSettled(pending);
  }, 'artifact-space: route lifetime');

  const routes = [
    [ROWS_PATH, ['GET'], (request) => {
      const signal = AbortSignal.any([request.signal, lifetime.signal]);
      // The marker is tracked before the promise settles, so disposal always
      // awaits the request that is actually in flight.
      const marker = {};
      pending.add(marker);
      const task = collectRows(ctx, signal)
        .then((groups) => Response.json({ groups }, { headers: { 'cache-control': 'no-store' } }))
        .catch(() => {
          request.signal.throwIfAborted();
          return Response.json({ error: 'rows-failed' }, { status: 500 });
        })
        .finally(() => { pending.delete(marker); });
      return task;
    }],
    [READ_PATH, ['GET'], (request) => {
      const url = new URL(request.url);
      const sessionId = requiredQuery(url, 'sessionId');
      const path = requiredQuery(url, 'path');
      if (sessionId === null || path === null) {
        return Promise.resolve(Response.json({ error: 'invalid-coordinates' }, { status: 400 }));
      }
      const marker = {};
      pending.add(marker);
      return readArtifact(ctx, {
        sessionId,
        path,
        signal: AbortSignal.any([request.signal, lifetime.signal]),
      }).finally(() => { pending.delete(marker); });
    }],
    [IMAGE_PATH, ['GET'], (request) => {
      const url = new URL(request.url);
      const sessionId = requiredQuery(url, 'sessionId');
      const path = requiredQuery(url, 'path');
      if (sessionId === null || path === null) {
        return Promise.resolve(Response.json({ error: 'invalid-coordinates' }, { status: 400 }));
      }
      const marker = {};
      pending.add(marker);
      return readArtifactImage(ctx, {
        sessionId,
        path,
        signal: AbortSignal.any([request.signal, lifetime.signal]),
      }).finally(() => { pending.delete(marker); });
    }],
    [HTML_PATH, ['GET'], (request) => {
      const url = new URL(request.url);
      const sessionId = requiredQuery(url, 'sessionId');
      const path = requiredQuery(url, 'path');
      if (sessionId === null || path === null) {
        return Promise.resolve(Response.json({ error: 'invalid-coordinates' }, { status: 400 }));
      }
      const marker = {};
      pending.add(marker);
      return readArtifactHtml(ctx, {
        sessionId,
        path,
        signal: AbortSignal.any([request.signal, lifetime.signal]),
      }).finally(() => { pending.delete(marker); });
    }],
    [ASSET_PATH, ['GET'], (request) => {
      const url = new URL(request.url);
      const sessionId = requiredQuery(url, 'sessionId');
      const path = requiredQuery(url, 'path');
      if (sessionId === null || path === null) {
        return Promise.resolve(Response.json({ error: 'invalid-coordinates' }, { status: 400 }));
      }
      const marker = {};
      pending.add(marker);
      return readArtifactAsset(ctx, {
        sessionId,
        path,
        signal: AbortSignal.any([request.signal, lifetime.signal]),
      }).finally(() => { pending.delete(marker); });
    }],
  ];

  for (const [path, methods, handler] of routes) {
    ctx.connection.fetch.register({
      path,
      methods,
      requestBody: 'buffered',
      fetch: (request) => handler(request),
    });
  }
}

/**
 * Register the Artifact Space Host routes.
 *
 * @param ctx - host context carrying the services named in {@link inject}.
 */
export function apply(ctx) {
  registerRoutes(ctx);
}

export { inject };



