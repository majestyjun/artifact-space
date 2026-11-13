# Changelog

[中文](CHANGELOG.md) | English

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.0] — 2026-11-13

### Added

- **Every artifact can now answer "which step made it, how, and what was said".** Each row carries an action badge naming what happened to the file — **created / overwritten / edited / written / delivered** — followed by the AI's own words for that moment (`AI said: …`). At a glance you can tell whether a file was edited or replaced.
- **The action badge is readable at a glance.** It sits next to the delivered/produced badge, so the two must be tellable apart: the kind badge stays a quiet neutral grey while the action badge gets its own hue — **created = green, overwritten = orange, edited = blue, written = neutral**. "Overwritten" is orange because "this file was replaced wholesale" is the case most worth noticing. The font also went up to 10px, matching the kind badge, so it no longer smears into a smudge on the light glass.
- **The quoted words are matched to the step, not to the whole turn.** The quote is matched exactly on `turn:step` of the tool call, falling back to "the nearest earlier step of the same turn" and then to "the earliest line of the turn" — so you get the sentence actually spoken just before the work happened, not a vague "let me look at these scripts first". Quotes longer than 240 characters are truncated so a whole monologue never floods the row.
- **Opening Artifact Space refreshes the artifact list quietly.** Selecting the sidebar icon (that is, opening the panel) triggers one refresh; the refresh **never interrupts reading** — the list is not cleared, does not fall back to the loading state, and a failed refresh keeps the old list, so there is no "nothing happened" click and no blank flash. A refresh already in flight is not started twice.
- New `verify-provenance.mjs` checks provenance specifically (21 assertions covering how actions are decided, how turns and quotes are associated, the quiet-refresh semantics, and that re-opening the panel refetches), and is wired into the pre-release pipeline.

### Changed

- **Artifact detection no longer guesses from tool names — it reads the Host's own annotations.** It used to infer which calls wrote a file from the tool name (`write` / `edit` / `str_replace_editor`); it now uses the annotation the Host attaches to `tool/result`: an `operation` of `create` / `update` means a write, the presence of `diffs` means an edit, and neither means the call was a **read** (`read` and `read_image` also carry `meta.path`, but no annotation, so they are never mistaken for artifacts). Older logs without annotations fall back to the tool name.
- **When the same path is written repeatedly, the last write wins.** Path de-duplication used to keep the *first* write, so the row's action and turn stayed at the original one; it now keeps the last write, so the row describes the file's **final state** — consistent with how the delivered section already behaved.

### Fixed

- **Fixed "switch to another plugin panel and come back — the artifact list does not refresh".** After switching away and back, the timestamp on each row was still the old one, which made it look like the open-time refresh was not working at all. The cause was that the refresh was wired to the wrong thing: the artifact list lives on the plugin rather than on the panel, so its state stayed "ready", and the panel's re-mount went through the path that only reads when nothing has been loaded yet — so **no request was made at all** and the screen kept showing the previous list. The panel mount now performs an "open-time read": every time the panel is opened the data is fetched again, the first opening shows the loading state, and later re-openings **refresh quietly** (the list is not cleared, does not flash blank, and a failure keeps the old list) — so the timestamps on screen actually move.
- **The sidebar icon and the panel mount no longer fire duplicate requests.** Selecting the sidebar icon also triggers a refresh, and that is the second trigger of the same opening. The two paths now share a 250 ms coalescing window, so one opening issues one request; but **triggering the sidebar icon on its own after the window still really refreshes** and is never wrongly suppressed.
- **The preview header is no longer blown apart by the AI quote.** The source information (including that italic AI quote) used to sit in the middle of the preview's title row, so a long quote pushed the **file size and the action buttons (copy content / copy path / close) out of view** — the buttons became unclickable. The header is now split into two rows: **the first row holds only the title, the type badge, the file size and the action buttons**, with the size and buttons pushed to the right via `margin-left:auto` so they are always visible; **the source information gets a row of its own** (kind / turn / action / time / description / AI quote), truncated with an ellipsis at a per-row limit, and still fully readable on hover. The divider line was adjusted accordingly, so there is no double line.
- **Two earlier conclusions were inaccurate and have been corrected, so the docs no longer mislead.**:
  1. The earlier claim of "63.8% → 100% artifact coverage" was **circular reasoning** — the rule was validated with data derived from the very same logs it was derived from. Re-measured against filesystem ground truth (the files actually modified inside the cwd within each session's time window), the real coverage is **2.5%**; the shell-command-parsing route turned out to be **unworkable** (of 9 candidate command rules only 1 matched a file that really existed, and stdout mining had a 40% false-positive rate, recovering only 3 files), so it was dropped. Artifact detection therefore relies on **Host annotations**, and shell command lines are no longer parsed.
  2. Both corrections are recorded in this changelog and in the README, and this section is the authoritative account of why the plugin behaves the way it does.

## [1.6.1] — 2026-11-07

### Added

- The update card gained a **view release notes** text link that opens the published release notes for that exact version (the GitHub release), so you can see what a version actually changed before you click "Download and install".
- **The artifact list and the preview pane can now be resized by dragging** the divider between them. The divider is draggable, and both sides keep a minimum width while you do. It also takes focus: `←` / `→` nudge it by 24px (`Shift` for 72px), `Home` / `End` push it to either end, and a **double-click restores the even split**. The position is remembered locally for the panel's container and restored next time.
- **A "reset the split" button was added.** Once you have moved the divider, a button appears in the panel header that puts the two panes back to an even split and deletes the stored position. It only shows when there is something to reset — it takes no room the rest of the time, and there is no button that does nothing.
- The list has a **hard minimum of 220px** — it cannot be dragged out of existence; the preview keeps at least 320px, and the list may take at most 72% of the container. When the container is too narrow for both minimums, the list wins (a squeezed list stops being a list) and the divider hides itself.
- New `verify-split.mjs` checks the split behaviour specifically (22 assertions covering the width constraints, position persistence, when the reset button appears and fallback on corrupt data), plus `smoke-render-split.mjs`, a render smoke test that emulates React's `useSyncExternalStore` and actually renders the panel. Both are wired into the pre-release pipeline.

### Fixed

- **The split pane no longer blanks the panel.** The split store's `getSnapshot` handed out a fresh object on every call, and `useSyncExternalStore` compares snapshots by identity — so it believed the state kept changing and re-rendered without end, until React threw #185 (Maximum update depth exceeded) and tore down the render slot, leaving a blank page. The snapshot is now a stable reference, replaced only when the position or the dragging state actually changes.
- **The favorite star no longer hides.** It used to sit at `opacity:0` and only appeared when the row was hovered — nothing on screen hinted that a row could be starred, while the empty favorites state told people to click a star they could not see; on touch screens it was unreachable entirely. The star is now always visible.
- **The star no longer overlaps the file icon.** Rows are laid out as a grid with a fixed number of cells, but the delivered/produced label and the time were two separate cells — so a row *with* a label had one more child than a row without one, and the surplus star was pushed onto a second grid line, landing in the file icon's column and overlapping it (see the entry above: the star was transparent, so the misplacement went unnoticed). The label and the time now share a single provenance cell, so the child count is always 5, matching the 5 columns.

### Changed

- The star's resting colour is a dedicated neutral (`#6f7680` — 4.39:1 on light glass, 4.03:1 on dark, meeting the 3:1 that non-text graphics require) and turns amber on hover or once starred. The tertiary grey it used to borrow only reached 2.89:1 on the light surface, and lower still once its opacity was reduced.
- A starred row keeps its own colour on hover, so "already starred" and "about to be starred" no longer look alike.
- The update card now **separates information from action**: the release notes are a text link under the note instead of a pill competing with the primary button, and "Close" became an icon button (it keeps an `aria-label`); the action row carries only the actions worth taking.
- The link uses a solid blue (light theme `#2f6ae0`, dark theme `#8ab4ff`) that reaches WCAG AA contrast on the glass surface (≈4.9:1 / ≈8:1) — the edge colour is translucent and would only reach ≈1.9:1 as text.
- The commit guard now also blocks credentials: a staged file containing an npm token or a private key header stops the commit; `.gitignore` gained `.npmrc` and `.env`.

## [1.6.0] — 2026-11-07

### Added

- A permanent **version badge** in the panel header shows the installed version (e.g. `v1.6.0`). When a newer release exists the badge turns orange and announces the update; clicking it opens an **update card**.
- The update card offers a version comparison, a **download and install** button and a **one-click rollback** button. Once the download finishes it tells you that restarting DSH activates the new version.
- Added the Host-side `updater.js`: it queries the npm registry for the latest version, downloads the tarball and verifies its `sha512` integrity, then **replaces the plugin directory in place** — backing it up beforehand so a bad update can be rolled back in one click.
- Added three Host routes: `GET /api/artifact-space.version` (version check), `GET /api/artifact-space.update` (download and install) and `GET /api/artifact-space.rollback` (rollback).
- Added `verify-version-update.mjs` (131 assertions covering the Host-side structure, a sandboxed real download-and-replace run, the client rendering and the published package contents) and `smoke-render-version-update.mjs` (19 rendering scenarios), both wired into the pre-release pipeline.

### Changed

- The version check **never touches** the profile's `package.json` or lockfile and never runs `pnpm install` — the plugin file replacement is invisible to DSH's integrity check, so it cannot make the app refuse to start.
- The downloaded package is unpacked into a temporary directory and validated before anything is replaced; a failed integrity check or a broken archive leaves the current installation untouched. Replacement unlinks first and writes second, so pnpm's content-addressed store is never polluted.
- The update strings are provided in Chinese and English (18 `version.*` keys), and the badge and card follow the light and dark themes.
- When the Host half has not loaded the new version yet (for instance, only the browser half hot-reloaded), the panel says so plainly — "the Host has not loaded the new version, restart DSH" — instead of a vague "update failed". A restart is the only thing that can fix it, and pointing at the wrong remedy is worse than saying nothing.
- When no version can be read, the badge shows only "unknown version" instead of the stuttering "version unknown version".
- When the running build is newer than what npm has published (the state right before a release goes out), the card says so plainly — "local build {version}" / "this version is not published on npm yet" — instead of the contradictory "latest version 1.5.0" next to "up to date", which reads like a pending downgrade.
- A failed check can be retried by clicking the badge again, so a single network hiccup no longer closes the update entry for good. The one case that is not retried is "the Host half has not loaded the new version" — only a restart can fix that.

## [1.5.0] — 2026-11-06

### Added

- The full-screen lightbox now supports zooming: the toolbar gained Zoom in / Zoom out / Reset buttons and a live scale readout (20%–800%). The picture is scaled with a transform, so its native resolution is preserved.
- The mouse wheel zooms directly inside the lightbox; the wheel event is intercepted so the page does not scroll along.
- Keyboard shortcuts: `+` zooms in, `-` zooms out, `0` resets, `Esc` closes.
- Added `smoke-render-lightbox-zoom.mjs`, a dedicated zoom verification script with 38 assertions, wired into the pre-release pipeline.

### Changed

- The zoom buttons follow the panel's glass styling so they match the other action buttons. Zoom labels are provided in Chinese and English (`lightbox.zoomIn` / `zoomOut` / `zoomReset` / `zoomLevel`).
- The cursor switches to a grab handle once the picture is enlarged, and the transition animation is disabled while zooming so the image tracks the input.

## [1.4.0] — 2026-11-06

### Added

- **Full screen** for picture previews: the picture is enlarged until it covers
  the window. It can be triggered by clicking the picture itself or by the
  "Full screen" button, and it closes on `Esc` or on a click outside the
  picture. The overlay is hung off `document.body`, which sidesteps the
  containing block the panel's own `backdrop-filter` would otherwise impose.
- **Download** for picture previews: the bytes are fetched from the Host's
  image route and saved locally under the original file name. The outcome —
  success or failure — is reported on the button itself.
- The preview action buttons are larger: height from 22px to 27px, icon from
  12px to 13.5px, font size from 11px to 12px, with the preview header raised
  from 32px to 38px to match.

### Changed

- The README now reads in a written register: the second person and the
  conversational phrasing ("click to", "what the frame gets is") are gone,
  in both the Chinese and the English version.
- The feature table in the English README still carried Chinese labels; they
  are now all translated ("玻璃界面" → Glass interface, "三级搜索" → Three-level
  search), and the product name in the body reads as Artifact Space with the
  Chinese original in brackets. The release check gains a new gate that fails
  on Chinese text or Chinese punctuation in the English README, so the mix
  cannot come back unnoticed.

## [1.3.0] — 2026-11-06

### Added

- **HTML artifacts are now previewed as a page** instead of being shown as
  source code line by line. Pictures, styles and fonts that the document
  references by relative path load properly, so the preview no longer comes
  out full of broken images.
- A new "Open in browser" button in the preview pane, which opens an HTML
  artifact in its own tab.
- Two read-only Host routes: an HTML route that rewrites the document's
  relative references into authenticated asset URLs, and an asset route that
  serves each resource under the media type its extension names.

### Changed

- HTML documents are now delivered by the Host with a
  `content-security-policy` header that blocks inline scripts and outbound
  requests, and the preview frame is confined with `sandbox`, so scripts in
  the document never run.
- The old `srcDoc` preview branch is gone. It had no base URL, which is
  exactly why the document's relative pictures came out broken.

## [1.2.0] — 2026-11-06

### Added

- A quick category filter in the toolbar: three chips — All, Delivered, and
  Produced — each showing a live count. Picking "Delivered" hides the
  incidentally produced files and leaves only what the session actually
  delivered to the reader; picking it again returns to "All".
- Artifact rows and the preview header now show a relative time ("2 min ago"),
  with the absolute time on hover, so it is obvious which file was just made.

### Changed

- **Artifacts inside a session are now sorted newest first.** They used to keep
  the order in which the log first mentioned them, which left the freshest
  file at the bottom of the list.
- The group and session artifact counts now follow the entries actually on
  screen, so a filtered list and its number agree instead of contradicting
  each other.

## [1.1.2] — 2026-11-05

### Changed

- The README "Install" section now lists the public catalogs that carry this
  plugin (the official `awesome-dsh-plugin` market registry, the 1024 community
  plugin catalog, and the community plugin picks), each with its current status
  and a note on the official catalog's daily rebuild cadence.
- Added the `dsh plugin add @xxjxx/artifact-space` command so readers no longer
  have to `npm install` first and then edit the profile patch by hand.

## [1.1.1] — 2026-11-04

### Added

- The published package now carries `assets/icon-180.png` (the PNG icon the
  catalog uses); previously it only existed in the repository.

### Changed

- A new "release notes" gate runs before every publish: the version must have a
  matching entry in both the Chinese and the English changelog, or the publish
  is refused.

## [1.1.0] — 2026-11-04

### Added

- **Image preview**: `png`, `jpg`, `jpeg`, `gif`, `webp`, `bmp`, `avif`, `ico` and
  `svg` now display in the preview pane. The Host returns the file's own bytes
  under the media type that matches its extension, the browser renders it, and the
  status bar reports the picture's dimensions and size.
- Pictures no longer count as "binary file, cannot be previewed".

### Changed

- Pictures take a separate Host route instead of asking for a text preview, so
  they no longer share the text preview's size and line limits.
- SVG is shown as an image, so the browser never runs any script it carries.

## [1.0.0] — 2026-11-01

First public release.

### Added

- **Artifact Space** sidebar entry listing every workspace's final session
  artifacts, grouped by workspace and then by session.
- Layered glass interface with a light and a dark theme.
- Editor-style preview for code files: sticky line-number gutter, syntax
  highlighting, and a status bar with language, line count, size and encoding.
- Format-aware rendering for Markdown, HTML, YAML and JSON, each falling back to
  plain text.
- Search across workspaces, sessions and artifacts at once; multiple words are
  alternatives, and matches are highlighted.
- Favorites: star an artifact from its row, collect them in the Favorites view.
  Favorites persist across restarts and each one is deleted from disk the
  moment it is un-starred.
- Session folding, with only the sessions that fit on the first screen open by
  default.
- Copy a file's content or its absolute path from the preview header.
- Artifact provenance: whether a file was delivered or merely produced, the
  turn it came from, and what the session said about it.
