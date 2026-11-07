# Changelog

[中文](CHANGELOG.md) | English

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.6.0] — 2026-11-07

### Added

- A permanent **version badge** in the panel header shows the installed version (e.g. `v1.6.0`). When a newer release exists the badge turns orange and announces the update; clicking it opens an **update card**.
- The update card offers a version comparison, a **download and install** button and a **one-click rollback** button. Once the download finishes it tells you that restarting DSH activates the new version.
- Added the Host-side `updater.js`: it queries the npm registry for the latest version, downloads the tarball and verifies its `sha512` integrity, then **replaces the plugin directory in place** — backing it up beforehand so a bad update can be rolled back in one click.
- Added three Host routes: `GET /api/artifact-space.version` (version check), `GET /api/artifact-space.update` (download and install) and `GET /api/artifact-space.rollback` (rollback).
- Added `verify-version-update.mjs` (103 assertions covering the Host-side structure, a sandboxed real download-and-replace run, the client rendering and the published package contents) and `smoke-render-version-update.mjs` (10 rendering scenarios), both wired into the pre-release pipeline.

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
