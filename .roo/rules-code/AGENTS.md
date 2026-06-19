# Code Mode AGENTS.md

This file provides guidance to agents when writing code in this Jekyll blog repository.

## Coding Rules (Non-Obvious Only)
- All new content MUST use `.markdown` extension — never `.md`
- Blog posts go in `_posts/` with strict naming: `YYYY-MM-DD-title.markdown`
- `_config.yml` changes require server restart (no hot reload)
- Never edit files in `_site/` — they are auto-generated build output
- Theme customization goes in `_sass/` overrides or by creating `_layouts/`, `_includes/` directories
- Front matter must use YAML with `layout`, `title`, and optionally `excerpt` fields
