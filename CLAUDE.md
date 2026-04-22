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
Header → Hero (with video) → Sponsor strip → Services (`#servicios`, with video) → Advantages (`#diferenciales`, with video) → Projects (`#trabajos`, with video) → Sponsors showcase (`#sponsors`) → Clients (`#clientes`) → Google Reviews (`#resenas`) → Final CTA (`#contacto`, with inline Calendly) → Footer + floating WhatsApp button.

**`script.js` responsibilities:**
- Mobile hamburger menu toggle with `aria-expanded` state
- Header `.is-scrolled` class on scroll
- Intersection Observer that reveals `.service-card`, `.advantage-card`, `.project-card`, `.logo-card`, `.review-card`, `.sponsor-card`, `.final-cta-box`, `.video-frame`
- Calendly popup trigger: any element with `data-calendly` opens the Calendly modal (URL centralized in `CALENDLY_URL` const)
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

## Third-party integrations

**Calendly** — loaded via `assets.calendly.com/assets/external/widget.{css,js}`:
- Popup widget: any anchor/button with `data-calendly` attribute opens the modal (handled in `script.js`)
- Inline embed: `<div class="calendly-inline-widget" data-url="...">` in the final CTA section, auto-initialized by Calendly's script
- **Placeholder URL** `https://calendly.com/mambaservicios/reunion` — must be replaced with the client's real Calendly URL in two places: the `CALENDLY_URL` constant at the top of `script.js` AND the `data-url` attribute of `.calendly-inline-widget` in `index.html`

**Google Reviews** — `#resenas` section mimics a Google review block (branded badge, stars, review cards). No live API; review texts are static. Two CTAs link to Google Maps (`https://www.google.com/maps/search/?api=1&query=Mamba+Servicios`) — replace with the client's real Google Business Profile URL (ideally a `g.page/r/...` link that opens the "write a review" flow).

**Videos** — one `<video>` placeholder per main section (Hero, Services, Advantages, Projects). Each uses `preload="none"` and a poster image. To activate, drop real files into a `videos/` directory at the project root:
- `videos/hero.mp4`
- `videos/servicios.mp4`
- `videos/diferenciales.mp4`
- `videos/trabajos.mp4`

Until files exist, the poster shows and playback fails silently — acceptable as a handoff state.

## Sponsor / ad spaces

Two areas designed to be monetized or used for partners:
- **Sponsor strip** (`.sponsors-strip`, right after the hero): thin horizontal band with 5 slot placeholders
- **Sponsors showcase** (`#sponsors`, full section before Clients): 3 detailed sponsor cards with logo, tag, title, description

Placeholder content uses `Sponsor 01…05` and `Logo 01…03`. Replace with real logo images and copy when sold.

## Key constraints

- **WhatsApp and Calendly are both primary conversion channels** — they coexist. WhatsApp for quick consults, Calendly for scheduled meetings. Do not remove one without discussing with the client.
- **Spanish (es_AR)** — all copy must remain in Argentine Spanish.
- **No JS framework** — keep vanilla JS. Do not introduce npm, bundlers, or libraries. Calendly is a script embed, not a framework dependency.
- **Accessibility** — semantic HTML and ARIA attributes are intentional; preserve them when editing.
- **Dark professional/minimalist aesthetic** — the palette is black/silver/gray with white as a sparingly-used accent. Avoid reintroducing vivid brand colors (teal, amber) unless explicitly requested.

## Placeholders the client must replace

1. WhatsApp number `5491100000000` (throughout `index.html`)
2. `CALENDLY_URL` in `script.js` + `data-url` on the inline Calendly widget in `index.html`
3. Google Maps link (`https://www.google.com/maps/search/?api=1&query=Mamba+Servicios`) → real Google Business Profile URL
4. Sponsor slots/cards content and logos
5. Real review texts (currently uses the two existing testimonials + one placeholder)
6. Video files in `videos/`
7. Social links in footer (Instagram, LinkedIn, Facebook) currently go to platform homepages
