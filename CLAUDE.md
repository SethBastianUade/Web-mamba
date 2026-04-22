# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for **Mamba Servicios** — a maintenance, cleaning, and waterproofing company in Buenos Aires, Argentina. Plain HTML/CSS/JS with no build tools, frameworks, or package manager.

## Running Locally

```bash
python -m http.server 8000
# o
npx serve .
```

No install step. Edits to `index.html`, `style.css`, or `script.js` are reflected on refresh.

## Architecture

Single-page site with anchor navigation. All markup in `index.html`, styles in `style.css`, interactivity in `script.js`.

**Section order:**
Header → Hero (with video) → Sponsor strip → Services (`#servicios`, with video) → Advantages (`#diferenciales`, with video) → Projects (`#trabajos`, with video) → Sponsors showcase (`#sponsors`) → Clients (`#clientes`) → Google Reviews (`#resenas`) → Final CTA (`#contacto`) → Footer + floating WhatsApp button.

**`script.js` responsibilities:**
- Mobile hamburger menu toggle with `aria-expanded` state
- Header `.is-scrolled` class on scroll
- Intersection Observer that reveals `.service-card`, `.advantage-card`, `.project-card`, `.logo-card`, `.review-card`, `.sponsor-card`, `.final-cta-box`, `.video-frame`
- Footer year injection into `#year`

**Design system (CSS custom properties in `style.css`):**
Dark theme, professional and minimalist — per client brief:
- `--bg: #0a0a0b` (deep black)
- `--surface: #141417`, `--surface-2: #1a1a1e`, `--surface-3: #222227`
- `--text: #f4f4f5`, `--text-muted: #a1a1aa` (silver/gray)
- `--silver: #e4e4e7`, `--silver-mid: #a1a1aa`
- `--surface-contrast: #ffffff` (used sparingly as accent)
- Border: `rgba(255,255,255,0.07)` hairline
- Button gradient: silver `linear-gradient(135deg, #f4f4f5 → #a1a1aa)` on dark
- Font: Manrope (Google Fonts, weights 400–800)

## SEO strategy — keyword chips

Each service card includes a `.service-tags` list with the specific keywords the client wants to rank for. This is intentional — all tags must stay as real, visible, server-rendered text (not hidden, not injected via JS). Current tags:

- **Impermeabilización**: Impermeabilización, Filtraciones, Cubiertas y terrazas, Medianeras, Trabajos en altura
- **Limpieza de tanques**: Limpieza de tanques, Desinfección sanitaria, Tanques de agua potable, Edificios y consorcios
- **Mantenimiento**: Albañilería, Plomería, Electricidad, Pintura
- **Limpieza final de obra e integral**: Limpieza final de obra, Limpieza integral de empresas y negocios, Limpieza y desinfección de alfombras y tapizados

Service card numbering (01–04) was intentionally removed — numbers waste visual space that the client wants dedicated to keywords.

## Third-party integrations

**Google Reviews** — `#resenas` section mimics a Google review block (branded badge, stars, review cards). No live API; review texts are static. Two CTAs link to Google Maps (`https://www.google.com/maps/search/?api=1&query=Mamba+Servicios`) — replace with the client's real Google Business Profile URL (ideally a `g.page/r/...` link that opens the "write a review" flow).

**Videos** — one `<video>` placeholder per main section (Hero, Services, Advantages, Projects). Each uses `preload="none"` and a poster image. To activate, drop real files into a `videos/` directory at the project root:
- `videos/hero.mp4`
- `videos/servicios.mp4`
- `videos/diferenciales.mp4`
- `videos/trabajos.mp4`

Until files exist, the poster shows and playback fails silently — acceptable as a handoff state.

Note: Calendly was explored but discarded by the client. Do not reintroduce it without explicit instruction.

## Sponsor / ad spaces

Two areas designed to be monetized or used for partners:
- **Sponsor strip** (`.sponsors-strip`, right after the hero): thin horizontal band with 5 slot placeholders
- **Sponsors showcase** (`#sponsors`, full section before Clients): 3 detailed sponsor cards with logo, tag, title, description

Placeholder content uses `Sponsor 01…05` and `Logo 01…03`. Replace with real logo images and copy when sold.

## Key constraints

- **WhatsApp is the single conversion channel** — all primary CTAs ("Agendar visita", final CTA, floating bubble, service card links) point to `https://wa.me/5491100000000` with context-specific prefilled messages. Do not introduce scheduling tools (Calendly, etc.) without client approval.
- **Spanish (es_AR)** — all copy must remain in Argentine Spanish.
- **No JS framework** — keep vanilla JS. Do not introduce npm, bundlers, or libraries.
- **Accessibility** — semantic HTML and ARIA attributes are intentional; preserve them when editing.
- **Dark professional/minimalist aesthetic** — the palette is black/silver/gray with white as a sparingly-used accent. Avoid reintroducing vivid brand colors (teal, amber) unless explicitly requested.
- **SEO keywords are load-bearing copy** — when editing service cards, keep the `.service-tags` list present and avoid rewriting the exact keywords; the client chose them deliberately for organic search.

## Placeholders the client must replace

1. WhatsApp number `5491100000000` (throughout `index.html`)
2. Google Maps link (`https://www.google.com/maps/search/?api=1&query=Mamba+Servicios`) → real Google Business Profile URL
3. Sponsor slots/cards content and logos
4. Real review texts (currently uses the two existing testimonials + one placeholder)
5. Video files in `videos/`
6. Social links in footer (Instagram, LinkedIn, Facebook) currently go to platform homepages
