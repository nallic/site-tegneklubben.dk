# Architect Mode AGENTS.md

This file provides guidance to agents when planning architecture for this Jekyll blog repository.

## Architecture Rules (Non-Obvious Only)
- Static site generator — no runtime code, all processing happens at build time
- Minima theme is opinionated: layouts in `_layouts/`, partials in `_includes/`, styles in `_sass/`
- Customizing any theme aspect requires copying files from gem to local directories (no inheritance overrides)
- `_config.yml` `baseurl` and `url` settings affect all asset paths — changing these breaks links if not updated everywhere
- GitHub Pages deployment requires `_config.yml` `url: ""` and `baseurl: /repo-name` pattern
