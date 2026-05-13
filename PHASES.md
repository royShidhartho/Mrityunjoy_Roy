# Portfolio Development — Phased Plan

## Context

This plan mirrors the 12-layer build sequence already specified in `WEBSITE_PLAN.md` (§5–6) so it can serve as a standalone executable checklist for the bilingual portfolio site (Astro + Decap CMS + Cloudflare Pages). The source spec remains `WEBSITE_PLAN.md`; this file is the working to-do list to tick through as work progresses.

Two rules govern the whole sequence:

1. **Function before design.** No CSS beyond a minimal reset until Layer 8.
2. **Schema is sacred after Layer 2.** Schema changes past that point require re-verifying every downstream layer.

Each phase has a **Definition of Done (DoD)**. Do not advance until the current phase's DoD is met.

---

## Phase 0 — Inventory and Material Gathering
*Runs in parallel with all other phases. Bottleneck is the father's time.*

**Status (2026-05-13):** Scaffolding complete with placeholder assets. Real data pending father's input.

- [x] Build inventory spreadsheet with columns matching the content model (`WEBSITE_PLAN.md` §4) — `inventory/publications.csv`, `inventory/arboretum.csv`, `inventory/biography.md`
- [ ] Father fills in metadata for all books (title, year, publisher, category, language) — 1 placeholder row, awaiting real data
- [ ] Father fills in metadata for newspaper articles (title, date, newspaper, category, language) — 2 placeholder rows, awaiting real data
- [ ] Father writes a 2–3 sentence summary for each item in at least one language
- [~] Gather 3–5 high-resolution portrait photographs — 3 SVG placeholders in `assets/placeholders/portrait/`, awaiting real photos
- [~] Gather book cover images where they exist — 3 SVG placeholders in `assets/placeholders/book-covers/`, awaiting real covers
- [~] Gather arboretum photographs (plants, insects, spiders) — 3 SVG placeholders in `assets/placeholders/arboretum/`, awaiting real photos
- [~] (Implied) Placeholder full-text book PDFs — 3 valid 1-page PDFs in `assets/placeholders/book-pdfs/`, awaiting real scans
- [~] (Implied) Placeholder newspaper article scans — 3 SVG placeholders in `assets/placeholders/newspaper-scans/`, awaiting real scans
- [x] Inventory arboretum species (one row per species, scientific + Bengali name) — 3 placeholder rows in `inventory/arboretum.csv`
- [ ] Decide on the website name and primary title
- [ ] Decide on Bengali numerals or Latin numerals for dates on the Bengali side
- [ ] Decide on copyright policy for hosting scans of newspaper articles

**Legend:** `[x]` done · `[~]` scaffolded with placeholder, real asset pending · `[ ]` not started.

**DoD:** Spreadsheet contains every known publication with at least title, year, language, category, and venue. Visual material is collected in a single folder. — *Not yet met: real data pending.*

---

## Phase 1 — Foundation

**Status (2026-05-13):** Local foundation complete. GitHub Pages workflow ready. Push to GitHub to go live.

- [x] Set up an Astro project locally (`npm create astro@latest`) — Astro 6.3.1, TypeScript strict
- [x] Configure Astro for internationalization (English + Bengali routes) — `prefixDefaultLocale: true`, `/en/` + `/bn/` routes verified
- [x] Add a `README.md` documenting the stack and local development setup
- [x] Add GitHub Actions workflow for auto-deploy to GitHub Pages (`.github/workflows/deploy.yml`)
- [x] Configure base path handling for GitHub Pages subpath (`PAGES_SITE` / `PAGES_BASE` env vars)
- [ ] Create a GitHub repository and push — then enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
- [ ] Verify that a placeholder page deploys automatically on push

*Deferred to Phase 9 (Polish):*
- [ ] Register a custom domain
- [ ] Migrate from GitHub Pages to Cloudflare Pages (if desired)
- [ ] Connect the custom domain + configure HTTPS

**DoD:** Pushing a change to GitHub `main` automatically deploys a visible change to GitHub Pages, within two minutes.

---

## Phase 2 — Content Schema and Sample Content

**Status (2026-05-13):** Complete. Schema is now sacred — changes require re-verifying Phase 3+.

- [x] Define the Astro content collections matching `WEBSITE_PLAN.md` §4 — `src/content.config.ts`
- [x] Create the directory structure: `src/content/publications/`, `src/content/arboretum/`, `src/content/biography/`
- [x] Write the schema for each collection using Astro's content config
- [x] Hand-write 5 sample publication entries as Markdown files with frontmatter:
  - [x] 1 book (Bengali, agriculture) — `book-agriculture-1.md`
  - [x] 1 book (English, nature) — `book-nature-1.md`
  - [x] 1 newspaper article (Bengali, literature) — `article-bn-literature-1.md`
  - [x] 1 newspaper article (English, agriculture) — `article-en-agriculture-1.md`
  - [x] 1 blog post (Bengali) — `blog-bn-1.md`
- [x] Hand-write 3 sample arboretum entries (one plant, one insect, one spider) — `plant-1.md`, `insect-1.md`, `spider-1.md`
- [x] Hand-write the biography singleton entry — `biography/roy.md`
- [x] Verify that Astro's build succeeds and validates all sample content against the schema
- [x] Document schema in `CONTENT_SCHEMA.md`

**DoD:** `npm run build` succeeds with zero errors. All sample content passes schema validation. Schema is documented in a `CONTENT_SCHEMA.md` file in the repository. — *Met.*

---

## Phase 3 — Page Templates (Unstyled)
*Minimal HTML structure only. Default browser styling. No CSS beyond a single reset.*

**Status (2026-05-13):** Complete. 28 pages built; all routes return 200; both locales render correctly.

- [x] Build the homepage template — featured + recent publications, section links (`[locale]/index.astro`)
- [x] Build the biography page template (`[locale]/about.astro`)
- [x] Build the publication list page template — books + newspaper + journal articles, sorted by date desc (`[locale]/publications/index.astro`)
- [x] Build the publication detail page template — full metadata, summary, body, scan/external links (`[locale]/publications/[id].astro`)
- [x] Build the arboretum list page template — grouped by kind (plant/insect/spider) (`[locale]/arboretum/index.astro`)
- [x] Build the arboretum detail page template — photos, description, notes, related publications (`[locale]/arboretum/[id].astro`)
- [x] Build the blog list page template (`[locale]/blog/index.astro`)
- [x] Build the blog post template (`[locale]/blog/[id].astro`)
- [x] Build a basic site header with text-only navigation links (`BaseLayout.astro`, from Phase 1)
- [x] Build a basic site footer with text-only links (`BaseLayout.astro`)
- [x] Build a 404 page (`pages/404.astro`)

**Implementation notes:**
- Restructured pages to dynamic `src/pages/[locale]/...` routes so each template is written once and rendered for both `en` and `bn` via `getStaticPaths`.
- Moved placeholder assets from `assets/` → `public/assets/` so Astro serves them at `/assets/...` URLs.
- Bengali date formatting via `Intl.DateTimeFormat('bn-IN')` produces Bengali numerals automatically (resolves the deferred decision in `WEBSITE_PLAN.md` §8 toward Bengali numerals on the Bengali side, by default).

**DoD:** Every page type renders correctly with sample content. All links work. No broken images. Pages are ugly but functional. Lighthouse accessibility score above 90. — *Build + smoke test passed; Lighthouse audit deferred to Phase 9.*

---

## Phase 4 — Bilingual Routing and Language Toggle

**Status (2026-05-13):** Complete.

- [x] Configure Astro's i18n routing with `en` and `bn` locales — `astro.config.mjs`, Phase 1
- [x] Set URL structure — kept English slugs (`/en/publications/...` and `/bn/publications/...`). Bengali slugs deferred unless requested; see `CLAUDE.md`.
- [x] Generate every page in both language versions from the same content — dynamic `[locale]` routes via `getStaticPaths`, Phase 3
- [x] Build a language toggle component that switches to the equivalent page in the other language — `BaseLayout.astro`
- [x] Define fallback behavior when a page exists in only one language — Decision: **every page exists in both locales**; missing fields fall back to the other language via `pick()` in `src/utils/content.ts`. We never 404 a content URL based on language. Documented in `CLAUDE.md`.
- [x] Implement browser language detection on first visit — Inline script in `src/pages/index.astro` checks `navigator.language`
- [x] Implement cookie-based memory of the user's manual language choice — Inline script in `BaseLayout.astro` writes `lang=<locale>` cookie (1-year, `SameSite=Lax`) on every page load; the root `/` redirect reads it first
- [x] Add `<html lang="...">` and `hreflang` attributes correctly on every page — `<html lang>` + `<link rel="canonical">` + `hreflang="en"` + `hreflang="bn"` + `hreflang="x-default"` (English) on every page
- [x] Test that every link in the navigation respects the active language — Verified via dev-server smoke tests in Phase 3

**DoD:** Clicking the language toggle on any page navigates to the same page in the other language without loss of context. URLs are clean and predictable. Search engines can crawl both versions independently. — *Met.*

---

## Phase 5 — Filtering, Search, and Listings

**Status (2026-05-13):** Complete. 63 pages indexed by Pagefind across both locales.

- [x] Add filtering on the publications list page: by category, language, year, venue — client-side dropdowns + `data-*` attributes, `[locale]/publications/index.astro`
- [x] Add filtering on the arboretum list page: by kind (plant / insect / spider) — `[locale]/arboretum/index.astro`
- [x] Build category subpages — `[locale]/publications/category/[category].astro` (4 categories × 2 locales = 8 pages)
- [x] Build a tag system — `[locale]/tags/[tag].astro` (one page per unique tag, both locales)
- [x] Integrate Pagefind for site-wide search — `pagefind` devDep; `build` script chains `astro build && pagefind --site dist`
- [x] Build a search results page — `[locale]/search.astro` with Pagefind JS API integration, language-filtered queries, debounced input
- [x] Verify Bengali text searches return correct results — Pagefind indexed 31 BN pages + 32 EN pages; language filter passes `{ language: [locale] }` to keep results in the active locale
- [x] Add a recently-published feed on the homepage (latest 6 items) — already done in Phase 3
- [x] Add cross-links between arboretum entries and publications that mention them — already done in Phase 3 via `related_publications`; tag links and category links now also cross-cut

**Implementation notes:**
- Search is **production-only**: dev server doesn't run Pagefind. Run `npm run build && npm run preview` to test locally. Search page gracefully degrades in dev with a localized "index not built" message.
- Pagefind picks up `<html lang>` automatically and segments indexes by language; `<main data-pagefind-body>` in `BaseLayout.astro` scopes indexing to page content (excludes nav/footer).
- Pagefind notes: no Bengali stemming support — search will not match across root forms (e.g., "চাষ" vs. "চাষি"). Substring matching still works. Acceptable for archive use; if it becomes a problem, a custom tokenizer can be added later.
- Filter UI uses native `<select>` + inline JS — no framework, works without styling.

**DoD:** A visitor can find any publication by category, year, or keyword in three clicks or fewer. Search returns Bengali results correctly. Filtered URLs are bookmarkable and shareable. — *Met. Category subpages and tag pages provide bookmarkable filtered URLs; full-text search via Pagefind covers keyword queries in both scripts.*

---

## Phase 6 — Content Management System

**Status (2026-05-13):** CMS app and schemas wired. OAuth proxy + father's account pending — see "Remaining" below. Local editing already works.

- [x] Install and configure Decap CMS in the Astro project — loaded from CDN in `public/admin/index.html`; pinned to `decap-cms@^3.5.0`
- [x] Define the CMS schema for the publications collection (mirrors §4.1) — `public/admin/config.yml` → `publications`
- [x] Define the CMS schema for the arboretum collection (mirrors §4.2) — `public/admin/config.yml` → `arboretum`
- [x] Define the CMS schema for the biography singleton — `files` collection mode, single file `src/content/biography/roy.md`
- [x] Configure side-by-side Bengali and English input fields in the editor — every `_bn`/`_en` field pair appears as two adjacent inputs with bilingual labels (e.g., `"Title — Bengali / শিরোনাম (বাংলা)"`)
- [x] Configure media uploads — `media_folder: public/assets/uploads`, `public_folder: assets/uploads` (no leading slash so base-path templates work)
- [x] Configure local backend for developer editing — `local_backend: true` enables `npx decap-server` without OAuth
- [x] Write a one-page user guide in English + Bengali — `docs/CMS_GUIDE.md`
- [x] Smoke test: admin page + config served at `/admin/` and `/admin/config.yml` in production preview (200 each)

*Optional / recommended:*
- [ ] Editorial workflow (draft branch + PR before publish) — deliberately disabled for now to keep the writer UX simple. Re-enable with `publish_mode: editorial_workflow` if review-before-publish becomes desirable.
- [ ] Email notifications when new content is committed — can be done via GitHub repo notifications (Settings → Notifications → Watching) or a GitHub Actions step that emails on commits matching `cms:`. Defer until the father is actively publishing.

*Remaining (external, requires the user's action):*
- [ ] **Set up GitHub OAuth for `/admin/` on the live site.** GitHub Pages can't run server code, so we need a tiny OAuth proxy. Easiest path: deploy [`decaporg/oauth-provider`](https://github.com/decaporg/decap-cms/tree/main/packages/netlify-cms-backend-github) to a free Cloudflare Worker (~5 min) and add `base_url` + `auth_endpoint` keys to `config.yml`. Until this is done, the live `/admin/` will load but login won't work — local editing via `npx decap-server` is fully functional in the meantime.
- [ ] **Invite father as a GitHub collaborator** on `royShidhartho/Mrityunjoy_Roy` so he can commit through the CMS.
- [ ] **Dry-run with the father:** he logs in, adds a test post, sees it live within five minutes.

**DoD:** The father, without developer assistance, adds a complete bilingual blog post through the CMS, publishes it, and sees it live within five minutes. Verified by an actual dry run, not by reading documentation. — *Not yet met: OAuth proxy and father's account pending.*

---

## Phase 7 — Bulk Content Migration

- [ ] Write a migration script that converts the inventory spreadsheet into Markdown files matching the schema
- [ ] Validate the script on 10 sample rows first
- [ ] Run the full migration on all spreadsheet rows
- [ ] Manually review every generated Markdown file for encoding issues, especially Bengali characters
- [ ] Upload all scanned PDFs and images to the chosen image host
- [ ] Link scans and cover images from the corresponding Markdown frontmatter
- [ ] Verify the full site builds without errors after migration
- [ ] Spot-check 20 random publication detail pages on the live site
- [ ] Set up redirects from any older URLs the father may want preserved

**DoD:** Every item in the inventory spreadsheet appears on the live site as a working publication page. No build errors. No encoding artifacts in Bengali text.

---

## Phase 8 — Design System and Visual Styling
*Only now does design enter. The functional site already works.*

**Status (2026-05-13):** Complete (Phase 7 deferred). Design direction: **editorial herbarium** — a literary journal crossed with a 19th-century botanical field notebook. Warm aged-paper background, deep moss-green accent, hairline rules, hand-drawn leaf mark as signature flourish.

- [x] Choose final typography — **Fraunces** (variable English serif, multiple optical sizes) + **Noto Serif Bengali**. No sans, no mono — all-serif for editorial cohesion. Locale-aware via CSS `:lang()`.
- [x] Define color palette as CSS custom properties — warm paper (`#F4EFE4`), moss green (`#3F5C3A`), rust accent (`#8B3A22`). Auto dark mode via `prefers-color-scheme`.
- [x] Define spacing scale, border radius scale, type scale — in `src/styles/global.css` (8pt-ish with golden bumps, modular type ratio)
- [x] Build the design tokens file — `src/styles/global.css` (tokens + reset + base typography + utility classes)
- [x] Style the site header and navigation — sticky masthead, leaf-mark brand, animated underline nav, pill language toggle
- [x] Style the site footer — colophon with leaf-mark, italic typeset credit, secondary language link
- [x] Style the homepage — hero with bilingual title stacked, archive-stat links, featured cards, recent-additions index pattern, browse-the-archive section cards. Subtle leaf SVG watermark in hero.
- [x] Style the publication list page (and category pages) — sticky filter bar (category / language / year / venue selects), academic-CV "index" pattern with year in left margin, animated underline on title hover, category subpages reuse the same pattern
- [x] Style the publication detail page — book-interior centered layout, lede with hairline rules, drop cap on first paragraph (English only), citation `<dl>`, moss-green primary action with arrow tilt
- [x] Style the arboretum pages — specimen-card grid with photo + scientific name italics + family small-caps, color-coded kind dots (plant/insect/spider), kind-tab filter pills, detail page with sticky meta sidebar and field-notes accent rule
- [x] Style the biography page — bilingual hero with portrait, prose section with measure-constrained width, visual timeline with dotted thread + year column, awards/affiliations side-by-side
- [x] Style the blog pages — magazine-style list with the most-recent post highlighted (moss tint), centered detail layout, drop cap, ornament rule
- [x] Style the search results and filter UI — magnifying-glass icon-inset input, focus-ring in moss-tint, live results as quiet underlined rows
- [x] Style the 404 page — large rotated leaf SVG with subtle drift animation, centered code/title/message
- [x] Test all pages in both Bengali and English for typographic balance — Bengali line-height bumped to 1.85; italic styles dropped on Bengali (italic isn't a stylistic convention in Bengali typography); Fraunces variable axes used (`opsz`, `SOFT`); Bengali numerals via `Intl.DateTimeFormat('bn-IN')`
- [x] Test all pages at mobile, tablet, and desktop breakpoints — fluid sizes via `clamp()`; nav wraps to second row on narrow screens; specimen grid uses `auto-fill minmax(16rem, 1fr)`; index rows stack on mobile
- [ ] Test color contrast for accessibility (target WCAG AA) — visual review by user pending; primary text (`#1A1814` on `#F4EFE4`) and (`#ECE2C9` on `#100E0A`) are both well above AA. Moss-on-paper for accents passes AA Large.

**Implementation notes:**
- All page-specific styles live in scoped `<style>` blocks (Astro auto-scopes); shared tokens in `src/styles/global.css` imported by `BaseLayout.astro`.
- Locale-aware fonts use `:lang(bn)` and `:lang(en)` selectors so inline `<span lang="bn">` switches font mid-sentence (used in detail-page bilingual subtitles).
- Fonts loaded via Google Fonts CDN with `preconnect`. `font-display: swap` prevents FOIT.
- Reduced-motion users get instant transitions via `@media (prefers-reduced-motion: reduce)`.
- Print styles strip nav/footer/filters and switch to plain-paper layout.

**DoD:** Every page is fully styled, consistent across the site, comfortable to read in both languages, and works on phone, tablet, and desktop without horizontal scroll or broken layouts. — *Met (pending user visual review).*

---

## Phase 9 — Polish, SEO, and Performance

- [ ] Generate a sitemap (`/sitemap.xml`) including both language versions
- [ ] Add `robots.txt`
- [ ] Add OpenGraph metadata to every page (title, description, image)
- [ ] Add Twitter card metadata
- [ ] Add structured data (JSON-LD) for articles and books
- [ ] Add a favicon and apple-touch-icon
- [ ] Optimize all images (convert to WebP, generate responsive srcsets)
- [ ] Audit Lighthouse scores — target 90+ in all four categories
- [ ] Verify the site loads in under 2 seconds on a 3G connection
- [ ] Install privacy-respecting analytics (Umami or Plausible)
- [ ] Add an RSS feed for the blog and for new publications
- [ ] Add a contact form or contact email link
- [ ] Test the site on real phones (Android and iPhone)
- [ ] (Deferred from Phase 1) Register a custom domain
- [ ] (Deferred from Phase 1) Migrate from GitHub Pages to Cloudflare Pages (if desired)
- [ ] (Deferred from Phase 1) Connect the custom domain + configure HTTPS

**DoD:** Lighthouse 90+ across performance, accessibility, best practices, SEO. Site validates in Google Search Console without errors. Analytics is recording visits.

---

## Phase 10 — Soft Launch and Training

- [ ] Share the live URL with a small private circle: family, 3–5 of the father's colleagues
- [ ] Collect feedback for 2 weeks
- [ ] Fix bugs reported during the soft launch
- [ ] Sit with the father for a one-hour training session on the CMS
- [ ] Have the father publish 3 real posts during the training session
- [ ] Document any frequently-confused steps for the user guide

**DoD:** The father independently publishes a real post during training. At least 5 outside readers have visited the site and given feedback. All critical bugs are resolved.

---

## Phase 11 — Public Launch and Maintenance Handoff

- [ ] Announce the site (newspapers the father writes for, academic networks, social media if applicable)
- [ ] Submit the site to Google Search Console and Bing Webmaster Tools
- [ ] Set up automatic Git backups to a second location (e.g., a private mirror)
- [ ] Document the maintenance workflow in a `MAINTENANCE.md` file in the repository
- [ ] Schedule quarterly check-ins to review analytics and content quality
- [ ] Schedule annual review of stack dependencies and domain renewal

**DoD:** Site is publicly announced. The father is publishing independently. Developer's ongoing involvement is limited to quarterly reviews and ad-hoc requests.

---

## Verification

This plan is a checklist, not code — "verification" is per-phase DoD compliance. To use it:

1. Work top-down; do not start Phase N+1 until Phase N's DoD is met.
2. Tick boxes as items complete; do not pre-tick optimistically.
3. When a phase's DoD is met, note the date next to the phase header so future-you knows when the boundary was crossed.

## Critical file references

- `WEBSITE_PLAN.md` — full specification (content model in §4, locked decisions in §7, deferred decisions in §8, risks in §9, rationale in §10)
- `CLAUDE.md` — guidance for Claude Code instances working in this repo

## Note on plan location

The plan currently lives at `~/.claude/plans/make-plan-of-different-unified-cupcake.md` (per the plan-mode workflow). To keep it inside the repo for easy reference (e.g., as `PHASES.md` or `TODO.md`), copy it after exiting plan mode — that copy step requires a normal write, which plan mode does not allow.
