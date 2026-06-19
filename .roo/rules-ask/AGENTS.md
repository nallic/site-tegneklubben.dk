# Ask Mode AGENTS.md

This file provides guidance to agents when answering questions about this Jekyll blog repository.

## Documentation Rules (Non-Obvious Only)
- `_config.yml` contains site-wide settings — all template variables access via `{{ site.varname }}`
- Minima theme is the default — any layout/sass customization requires creating `_layouts/`, `_sass/` dirs
- `_site/` directory is auto-generated build output — do not reference as source of truth
- This is a static blog — no database, no backend logic, no dynamic content beyond Jekyll's capabilities
- Social media icons configured via Minima's built-in `_includes/minima-social-icons.html`
