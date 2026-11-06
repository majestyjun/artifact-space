# Changelog

[中文](CHANGELOG.md) | English

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
