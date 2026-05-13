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

- [ ] Define the Astro content collections matching `WEBSITE_PLAN.md` §4
- [ ] Create the directory structure: `src/content/publications/`, `src/content/arboretum/`, `src/content/biography/`
- [ ] Write the schema for each collection using Astro's content config
- [ ] Hand-write 5 sample publication entries as Markdown files with frontmatter:
  - [ ] 1 book (Bengali, agriculture)
  - [ ] 1 book (English, nature)
  - [ ] 1 newspaper article (Bengali, literature)
  - [ ] 1 newspaper article (English, agriculture)
  - [ ] 1 blog post (Bengali)
- [ ] Hand-write 3 sample arboretum entries (one plant, one insect, one spider)
- [ ] Hand-write the biography singleton entry
- [ ] Verify that Astro's build succeeds and validates all sample content against the schema

**DoD:** `npm run build` succeeds with zero errors. All sample content passes schema validation. Schema is documented in a `CONTENT_SCHEMA.md` file in the repository.

---

## Phase 3 — Page Templates (Unstyled)
*Minimal HTML structure only. Default browser styling. No CSS beyond a single reset.*

- [ ] Build the homepage template — lists recent publications, links to main sections
- [ ] Build the biography page template
- [ ] Build the publication list page template — shows all publications in a flat list
- [ ] Build the publication detail page template — shows full content of one publication
- [ ] Build the arboretum list page template — shows all entries in a flat list
- [ ] Build the arboretum detail page template — shows full content of one entry
- [ ] Build the blog list page template
- [ ] Build the blog post template
- [ ] Build a basic site header with text-only navigation links
- [ ] Build a basic site footer with text-only links
- [ ] Build a 404 page

**DoD:** Every page type renders correctly with sample content. All links work. No broken images. Pages are ugly but functional. Lighthouse accessibility score above 90.

---

## Phase 4 — Bilingual Routing and Language Toggle

- [ ] Configure Astro's i18n routing with `en` and `bn` locales
- [ ] Set URL structure: `/en/publications/...` and `/bn/prakashana/...` (or chosen Bengali slugs)
- [ ] Generate every page in both language versions from the same content
- [ ] Build a language toggle component that switches to the equivalent page in the other language
- [ ] Define fallback behavior when a page exists in only one language
- [ ] Implement browser language detection on first visit
- [ ] Implement cookie-based memory of the user's manual language choice
- [ ] Add `<html lang="...">` and `hreflang` attributes correctly on every page
- [ ] Test that every link in the navigation respects the active language

**DoD:** Clicking the language toggle on any page navigates to the same page in the other language without loss of context. URLs are clean and predictable. Search engines can crawl both versions independently.

---

## Phase 5 — Filtering, Search, and Listings

- [ ] Add filtering on the publications list page: by category, language, year, venue
- [ ] Add filtering on the arboretum list page: by kind (plant / insect / spider)
- [ ] Build category subpages (`/publications/agriculture/`, `/publications/nature/`, etc.)
- [ ] Build a tag system — a page per tag listing all publications with that tag
- [ ] Integrate Pagefind for site-wide search
- [ ] Build a search results page
- [ ] Verify Bengali text searches return correct results (test with mixed-script queries)
- [ ] Add a recently-published feed on the homepage (latest 6 items)
- [ ] Add cross-links between arboretum entries and publications that mention them

**DoD:** A visitor can find any publication by category, year, or keyword in three clicks or fewer. Search returns Bengali results correctly. Filtered URLs are bookmarkable and shareable.

---

## Phase 6 — Content Management System

- [ ] Install and configure Decap CMS in the Astro project
- [ ] Define the CMS schema for the publications collection (mirrors §4.1)
- [ ] Define the CMS schema for the arboretum collection (mirrors §4.2)
- [ ] Define the CMS schema for the biography singleton
- [ ] Configure side-by-side Bengali and English input fields in the editor
- [ ] Set up authentication for the CMS (GitHub OAuth or Netlify Identity)
- [ ] Create a user account for the father in the authentication provider
- [ ] Configure the CMS to commit to a `draft` branch first (optional but recommended)
- [ ] Write a one-page user guide for the father in both Bengali and English
- [ ] Verify the father can log in to `/admin` and add a test post end-to-end
- [ ] Verify the test post appears on the live site after the build completes
- [ ] Set up email notifications to the developer when new content is committed

**DoD:** The father, without developer assistance, adds a complete bilingual blog post through the CMS, publishes it, and sees it live within five minutes. Verified by an actual dry run, not by reading documentation.

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

- [ ] Choose final typography: Bengali serif, English serif, UI sans-serif
- [ ] Define color palette as CSS custom properties
- [ ] Define spacing scale, border radius scale, type scale
- [ ] Build the design tokens file (`tokens.css` or equivalent)
- [ ] Style the site header and navigation
- [ ] Style the site footer
- [ ] Style the homepage
- [ ] Style the publication list page (and category pages)
- [ ] Style the publication detail page (most important — long-form reading)
- [ ] Style the arboretum pages
- [ ] Style the biography page
- [ ] Style the blog pages
- [ ] Style the search results and filter UI
- [ ] Style the 404 page
- [ ] Test all pages in both Bengali and English for typographic balance
- [ ] Test all pages at mobile, tablet, and desktop breakpoints
- [ ] Test color contrast for accessibility (target WCAG AA)

**DoD:** Every page is fully styled, consistent across the site, comfortable to read in both languages, and works on phone, tablet, and desktop without horizontal scroll or broken layouts.

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
