# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Project Type
Jekyll blog site using Minima theme (~> 2.5) with Jekyll (~> 4.4.1).

## Essential Commands
- **Serve locally**: `bundle exec jekyll serve`
- **Build**: `bundle exec jekyll build`
- **Install deps**: `bundle install`

## Critical Gotchas
- `_config.yml` is **NOT** auto-reloaded — restart the server after any config change
- All content uses `.markdown` extension (not `.md`)
- Posts must follow Jekyll naming: `_posts/YYYY-MM-DD-title.markdown`
- `_site/` is the build output — never edit files here directly

## Code Structure
- `_config.yml` — site configuration (title, url, baseurl, plugins)
- `_posts/` — blog posts (date-prefixed filenames required)
- `*.markdown` — static pages (about.markdown, index.markdown)
- `_layouts/`, `_includes/`, `_sass/` — theme customization (if they exist)

## Gemfile Notes
- Uses `bundle exec` for all Jekyll commands (ensures correct Jekyll version)
- Default theme is Minima — customize via `_sass/` overrides or change `theme:` in _config.yml
