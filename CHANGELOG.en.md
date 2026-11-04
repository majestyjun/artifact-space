# Changelog

[中文](CHANGELOG.md) | English

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
