# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository status

This repository is **pre-implementation**. As of writing, it contains only `WEBSITE_PLAN.md` and `.gitattributes` — no Astro project, no `package.json`, no source code. `WEBSITE_PLAN.md` is the authoritative specification and should be treated as the single source of truth for what is being built and in what order.

When implementation begins, the first task is Layer 1 in the plan (foundation: Astro scaffold, GitHub repo, Cloudflare Pages, domain). Do not skip ahead to design or styling work — see "Build philosophy" below.

## What is being built

A bilingual (Bengali / English) archive and active publication site for an agricultural researcher and Bengali writer. Three primary content domains:

- **Publications** — books, newspaper articles, blog posts, journal articles (50–200 items, growing)
- **Roy's Arboretum** — catalog of plants, insects, spiders with field notes
- **Biography** — singleton page with timeline, affiliations, photos

Content is bilingual via **parallel fields** (`title_bn` / `title_en`, `body_bn` / `body_en`, etc.) — not via auto-translation. Every page renders in both languages with a working toggle.

## Stack (locked decisions)

| Layer | Choice |
|---|---|
| Framework | Astro (with content collections + i18n routing) |
| Content storage | Markdown + frontmatter, committed to Git |
| CMS | Decap CMS (web editor, commits to Git, no separate DB) |
| Hosting | Cloudflare Pages |
| Search | Pagefind (static, must handle Bengali correctly) |
| Analytics | Umami or Plausible (privacy-respecting; not Google Analytics) |

See `WEBSITE_PLAN.md` §7 for the full list of locked decisions and §8 for decisions still deferred (with their default fallbacks).

## Build philosophy — read before changing approach

The plan enforces a **function-first, layer-by-layer** build order (§5, §10). Two rules dominate:

1. **Visual design is deferred to Layer 8.** Layers 3–7 are explicitly unstyled. Do not add CSS beyond a minimal reset until the functional site (templates, i18n, filtering, CMS, bulk migration) is verified end-to-end. Premature styling against placeholder content is the failure mode this order exists to prevent.
2. **The content schema (§4) is sacred once Layer 2 is verified.** Schema changes after Layer 2 require explicit re-verification of every downstream layer. Treat any proposed schema edit past that point as a significant decision, not a tweak.

Each layer has a **Definition of Done** in `WEBSITE_PLAN.md`. Do not advance to the next layer until the current one's DoD is met. When working on a layer, check its checklist in §6 rather than improvising scope.

## Content model — quick reference

Full schemas live in `WEBSITE_PLAN.md` §4. The three collections and their distinguishing fields:

- **Publication** — `type` (book / newspaper_article / blog_post / journal_article), `category` (agriculture / nature_environment / literature / other), `language` (bn / en / mixed), parallel title/summary/body fields
- **Arboretum entry** — `kind` (plant / insect / spider), `scientific_name`, parallel common-name/description/notes fields, `related_publications[]` for cross-linking to publications about a species
- **Biography** — singleton; parallel short/long bio fields, `timeline[]` of `{year, event_bn, event_en}`

The cross-link between arboretum entries and publications (Layer 5) is a deliberate feature — preserve it when touching either collection.

## Bilingual handling — non-obvious constraints

- URL structure: `/en/publications/...` and `/bn/prakashana/...` (Bengali slug path, not just `/bn/publications/`). Every page generates in both locales from the same content source.
- Fallback behavior when a page exists in only one language must be explicit, not implicit (Layer 4 DoD).
- The language toggle navigates to the **equivalent page** in the other language, preserving context. A toggle that drops the user on the homepage is a regression.
- Pagefind must be verified against Bengali queries (including mixed-script) — Latin-only verification is insufficient.
- Bengali vs. Latin numerals for dates on the Bengali side is a deferred decision (§8); default is Latin if unresolved by Layer 4.

## Commands

```bash
npm run dev        # dev server at http://localhost:4321
npm run build      # build static site to dist/
npm run preview    # preview production build locally
```

No test framework is configured yet. When one is added, document how to run a single test here.

## Key source files

- `astro.config.mjs` — Astro config including i18n (`defaultLocale: 'en'`, `prefixDefaultLocale: true`)
- `src/i18n/ui.ts` — translation strings, `useTranslations()`, `getLocaleFromUrl()`, `getLocalizedPath()`
- `src/layouts/BaseLayout.astro` — shared HTML shell with nav, language toggle, `hreflang` alternate link
- `src/pages/index.astro` — root redirect to `/en`
- `src/pages/en/` and `src/pages/bn/` — locale-specific pages
