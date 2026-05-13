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

- **URL structure:** `/en/publications/...` and `/bn/publications/...` — both locales currently use English path segments. The plan (§2) mentioned `/bn/prakashana/...` as an option; we deliberately stuck with English slugs for now because (a) URL stability matters once links are shared, and (b) Bengali slugs require a one-time mapping and breaks every existing crawler link if changed later. Switch only if the father specifically requests it.
- **Fallback policy:** Every page exists in both locales (generated from the same data via `getStaticPaths`). We never 404 a content URL based on language. When a bilingual field is missing for the active locale, `pick()` in `src/utils/content.ts` falls back to the other language's value. This is field-level fallback, not page-level — see `CONTENT_SCHEMA.md`.
- **Language toggle** navigates to the **equivalent page** in the other locale, preserving context. A toggle that drops the user on the homepage is a regression.
- **Browser detection + cookie memory:** `src/pages/index.astro` (the root `/` route) is a static HTML page with an inline script that checks (1) the `lang` cookie, (2) `navigator.language`. It redirects to `/<locale>/` accordingly. `BaseLayout.astro` writes the `lang` cookie on every page load so whichever locale the user is currently viewing becomes their preference. Meta-refresh to `/en/` is the no-JS fallback.
- **Bengali numerals for dates** are produced automatically via `Intl.DateTimeFormat('bn-IN')` on the Bengali side (e.g., `৯ এপ্রি, ২০২০`). This resolves the deferred decision in `WEBSITE_PLAN.md` §8 in favor of Bengali numerals, by default.
- **Pagefind** must be verified against Bengali queries (including mixed-script) — Latin-only verification is insufficient. Phase 5.

## Commands

```bash
npm run dev        # dev server at http://localhost:4321
npm run build      # build static site + Pagefind index → dist/
npm run preview    # preview production build locally (search works here)
```

**Search is production-only.** `npm run dev` does not run Pagefind, so `/[locale]/search` shows a graceful "index not built" message. To test search locally, run `npm run build && npm run preview` and open the search page.

No test framework is configured yet. When one is added, document how to run a single test here.

## Key source files

- `astro.config.mjs` — Astro config including i18n (`defaultLocale: 'en'`, `prefixDefaultLocale: true`) and `site`/`base` from `PAGES_SITE`/`PAGES_BASE` env vars
- `src/content.config.ts` — Zod schemas for `publications`, `arboretum`, `biography` collections (sacred, do not change)
- `src/i18n/ui.ts` — translation strings (~70 keys per locale), `useTranslations()`, `getLocaleFromUrl()`, `getLocalizedPath()`
- `src/utils/content.ts` — `pick()` field-level locale fallback, `formatDate()` Bengali-numeral aware
- `src/layouts/BaseLayout.astro` — shared HTML shell with nav, language toggle, `hreflang` + `canonical`, cookie writer, `<main data-pagefind-body>`
- `src/pages/index.astro` — static page with client-side `lang` cookie + `navigator.language` detection, meta-refresh fallback to `/en/`
- `src/pages/[locale]/` — dynamic locale routes (homepage, about, publications, arboretum, blog, search, category/tag subpages); each template uses `getStaticPaths` to emit `en` and `bn` variants
- `public/admin/index.html` + `public/admin/config.yml` — Decap CMS app and schemas. CMS commits to `main` (the deploy branch).
- `.github/workflows/deploy.yml` — auto-deploy to GitHub Pages on push to `main`. Sets `PAGES_SITE`/`PAGES_BASE` from the repo metadata.

## CMS

`/admin/` on the live site is Decap CMS. Schemas mirror `src/content.config.ts` and the documented schema in `CONTENT_SCHEMA.md`. Bilingual fields show as adjacent inputs with bilingual labels.

- **Local editing (no OAuth needed):** run `npx decap-server` alongside `npm run dev`, then open `/admin/` on `localhost`.
- **Production login** requires a GitHub OAuth proxy — see `PHASES.md` → Phase 6 → "Remaining".
- **Media uploads** land in `public/assets/uploads/`. Decap writes paths without a leading slash so they survive the `base` prefix on GH Pages.
