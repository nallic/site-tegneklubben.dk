# Tegneklubben Site Redesign — Implementation Plan

## Overview

This plan transforms the Tegneklubben Jekyll site from a generic Minima template into a functional event hub and community platform for drawing/painting enthusiasts in Copenhagen.

---

## Phase 1: Foundation & Configuration

### 1.1 Update `_config.yml`
**File:** [`_config.yml`](/_config.yml)

Changes:
- Update `description` to reflect the site's purpose as an event hub
- Add `author` field with organization name and email
- Add `social` section for Twitter/Facebook/Instagram links
- Add custom variables for mailing list integration (Mailchimp/Buttondown URL placeholder)
- Add `collections` configuration for events
- Add navigation configuration via `nav_items` or similar
- Update locale settings (already set to Danish — keep as-is)

### 1.2 Create Navigation Structure
**Approach:** Use Minima's built-in navigation or create a custom `_includes/navigation.html`

Files to create/modify:
- `_includes/navigation.html` — Main navigation bar
- Update theme layout files if needed

Navigation items:
| Label (Danish) | URL | Description |
|----------------|-----|-------------|
| Forside | `/` | Homepage |
| Arrangementer | `/arrangementer/` | Events listing |
| Om Tegneklubben | `/about/` | About us |
| Blog | `/blog/` or `/_posts/` via feed | Blog posts |
| Kontakt | `/kontakt/` | Contact page |

---

## Phase 2: Homepage Redesign

### 2.1 Update [`index.markdown`](/index.markdown)
**File:** [`index.markdown`](/index.markdown)

New content structure:
```markdown
---
layout: home
title: Forside
lang: da
---

# Hero Section
## Tegneklubben København
Tegne- og malearrangementer i København — find fællesskab og inspiration.

[CTA Button: Tilmeld Nyhedsbrev]

# Kommande Arrangementer
(Section header with link to full events page)

# Hvad Vi Gør
Three-column layout:
1. Find arrangementer — Oversigt over tegne- og malebegivenheder i København
2. Mød ligesindede — Deltag i fælles tegnestunder og netværk
3. Del erfaringer — Lær af andres teknikker og inspiration

# Seneste fra Bloggen
(Latest posts preview)

# Nyhedsbrev
Email signup section with form/button
```

### 2.2 Create Custom Homepage Layout (Optional)
If Minima's `home` layout is too restrictive:
- Create `_layouts/home.html` — Custom homepage layout with hero, event cards, and newsletter sections

---

## Phase 3: Events System

### 3.1 Create Events Collection
**Directory:** `/_events/`

Jekyll collection configuration in `_config.yml`:
```yaml
collections:
  events:
    output: true
    sort_by: date
    permalink: /arrangementer/:path/
```

### 3.2 Create Events Listing Page
**File:** `/arrangementer.markdown`

```markdown
---
layout: page
title: Arrangementer
permalink: /arrangementer/
lang: da
---

# Kommande Arrangementer
(List future events from collection)

# Tidligere Arrangementer
(Archive of past events)
```

### 3.3 Create Event Template
**File:** `/_layouts/event.html`

Event page structure:
- Date, time, location
- Description
- Organizer/contact info
- Image (optional)
- Link back to events listing

### 3.4 Create Sample Event File
**File:** `/_events/2026-07-01-example-event.markdown`

```yaml
---
layout: event
title: Eksempel Arrangement
date: 2026-07-01
location: København
description: Beskrivelse af arrangementet.
image: /assets/images/event-placeholder.jpg
organizer: Navn
contact: email@example.com
---

Arrangement detaljer her...
```

### 3.5 Create Events Page Partial
**File:** `/_includes/event-card.html`

Reusable event card component for listing pages.

---

## Phase 4: About Page Enhancement

### 4.1 Update [`about.markdown`](/about.markdown)
**File:** [`about.markdown`](/about.markdown)

New content structure:
```markdown
---
layout: page
title: Om Tegneklubben
permalink: /about/
lang: da
---

## Hvad er Tegneklubben?
Paragraph about the club's mission.

## Vores Mål
- Bullet points of goals

## Hvordan Deltager Du?
- Tilmeld nyhedsbrev
- Deltag i arrangementer
- Bliv frivillig

## Ofte Stillede Spørgsmål
### Er det gratis at deltage?
### Hvor ofte er der arrangementer?
### Kan jeg komme som nybegynder?
```

---

## Phase 5: Contact Page

### 5.1 Create Kontakt Page
**File:** `/kontakt.markdown`

```markdown
---
layout: page
title: Kontakt
permalink: /kontakt/
lang: da
---

## Kontakt Os
- Email: kontakt@tegneklubben.dk
- [Tilmeld Nyhedsbrev](link)

## Følg Os
- Instagram link
- Facebook link
- Other social media

## Send En Besked (Optional Formspree form)
```

---

## Phase 6: Mailing List Integration

### 6.1 Choose Mailing List Provider
**Decision needed:** Mailchimp, Buttondown, or Beehiiv?

### 6.2 Implement Signup Form
**Approach depends on provider choice:**

For **Mailchimp**: Use Mailchimp's embedded form HTML
For **Buttondown**: Use Buttondown's signup widget
For **Beehiiv**: Use Beehiiv's embed code

**Implementation locations:**
1. Homepage — prominent signup section
2. Kontakt page — contact + signup
3. Footer — small inline signup on all pages

### 6.3 Add Configuration Variable
In `_config.yml`:
```yaml
mailing_list:
  provider: buttondown  # or mailchimp, beehiiv
  url: "https://buttondown.email/tegneklubben"
```

---

## Phase 7: Styling & Branding

### 7.1 Create Custom Styles
**File:** `_sass/custom.scss` or `_sass/_custom.scss`

Custom styling for:
- Hero section on homepage
- Event cards
- Navigation bar
- Color scheme (brand colors)
- Typography adjustments
- Footer styling

### 7.2 Define Brand Colors (Suggested)
| Role | Color | Hex |
|------|-------|-----|
| Primary | Warm terracotta | #C75B39 |
| Secondary | Deep teal | #2A6F6F |
| Accent | Golden yellow | #E8B947 |
| Background | Warm white | #FAF7F2 |
| Text | Dark charcoal | #2D2D2D |

---

## Phase 8: Footer & Global Elements

### 8.1 Create Custom Footer
**File:** `_includes/footer.html`

Footer content:
- Tegneklubben København logo/name
- Email: kontakt@tegneklubben.dk
- Social media icons (Instagram, Facebook)
- Quick links: Forside, Arrangementer, Om os, Kontakt
- Copyright notice
- Nyhedsbrev link

### 8.2 Add Social Media Icons
**Directory:** `/assets/icons/` or use SVG inline
- Instagram icon
- Facebook icon
- Optional: YouTube, LinkedIn

---

## Phase 9: SEO & Meta

### 9.1 Ensure SEO Tags Work
Already handled by `jekyll-seo-tag` plugin — verify:
- Site title is correct
- Description is compelling
- Social media cards (Twitter Card, Open Graph) are configured

### 9.2 Add Sitemap
Already handled by `jekyll-sitemap` plugin.

### 9.3 Add RSS Feed
Already handled by `jekyll-feed` plugin — verify feed title and description.

---

## Phase 10: Content Migration & Cleanup

### 10.1 Clean Up Template Content
- Remove or archive `_posts/2026-06-19-welcome-to-jekyll.markdown`
- Replace with first real Tegneklubben post

### 10.2 Create First Blog Post
**File:** `/_posts/2026-06-19-tegneklubben-er-startet.markdown`

Welcome post explaining what Tegneklubben is and inviting people to join.

---

## File Structure After Implementation

```
tegneklubben-site/
├── _config.yml                    # Updated with new settings
├── _events/                       # NEW: Events collection
│   ├── 2026-07-01-example.markdown
│   └── ...
├── _includes/
│   ├── navigation.html            # NEW: Main nav
│   ├── footer.html                # NEW: Custom footer
│   ├── event-card.html            # NEW: Event card component
│   └── ...
├── _layouts/
│   ├── home.html                  # NEW or override: Homepage layout
│   ├── event.html                 # NEW: Event page layout
│   └── ...
├── _sass/
│   └── _custom.scss               # NEW: Custom styles
├── _posts/
│   └── 2026-06-19-tegneklubben-er-startet.markdown
├── arrangementer.markdown         # NEW: Events listing page
├── index.markdown                 # UPDATED: Redesigned homepage
├── about.markdown                 # UPDATED: Enhanced about page
├── kontakt.markdown               # NEW: Contact page
├── Gemfile
├── Gemfile.lock
└── ...
```

---

## Implementation Order Summary

| Step | Action | Files Affected | Priority |
|------|--------|----------------|----------|
| 1 | Update `_config.yml` | `_config.yml` | High |
| 2 | Create navigation | `_includes/navigation.html` | High |
| 3 | Redesign homepage | `index.markdown`, possibly `_layouts/home.html` | High |
| 4 | Set up events collection | `_config.yml`, `_events/`, `_layouts/event.html` | High |
| 5 | Create events listing page | `arrangementer.markdown` | High |
| 6 | Enhance about page | `about.markdown` | Medium |
| 7 | Create contact page | `kontakt.markdown` | Medium |
| 8 | Integrate mailing list | `_config.yml`, `index.markdown`, `_includes/footer.html` | Medium |
| 9 | Add custom styling | `_sass/_custom.scss` | Medium |
| 10 | Update footer | `_includes/footer.html` | Low |
| 11 | SEO verification | Already handled by plugins | Low |
| 12 | Clean up template content | `_posts/` | Low |

---

## Decisions Needed Before Implementation

1. **Mailing list provider** — Mailchimp, Buttondown, or Beehiiv?
2. **Contact form** — Use Formspree or just email link?
3. **Brand colors** — Use suggested palette or provide your own?
4. **Social media links** — Which platforms should be included?
5. **Event submission** — Should there be a way for others to submit events?
