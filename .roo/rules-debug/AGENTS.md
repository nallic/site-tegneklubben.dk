# Debug Mode AGENTS.md

This file provides guidance to agents when debugging this Jekyll blog repository.

## Debug Rules (Non-Obvious Only)
- `_config.yml` is NOT auto-reloaded — always restart `bundle exec jekyll serve` after config changes
- Build output goes to `_site/` — if site looks wrong, run `bundle exec jekyll build` and check for errors there
- Posts won't render if filename doesn't match `_posts/YYYY-MM-DD-slug.markdown` pattern
- Minima theme assets may need `bundle exec jekyll clean` to refresh after theme changes
- Use `bundle exec jekyll serve --trace` for detailed error output when builds fail
