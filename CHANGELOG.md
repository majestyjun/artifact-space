# Changelog

All notable changes to this project are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
