# Website Plan — [Father's Name] Roy

A bilingual archive and active publication hub for an agricultural researcher and prolific Bengali writer.

---

## 1. Project Summary

### 1.1 Purpose
Both an archive of past work and an active publication hub for ongoing new content.

### 1.2 Primary Audience
- Bengali-reading general public
- Agricultural researchers and academics
- Nature and environment enthusiasts

### 1.3 Scale
50–200 publications (newspaper articles plus books combined), growing over time.

### 1.4 Language
Fully bilingual user interface with a language toggle. Content stored as parallel Bengali and English fields.

### 1.5 Content Workflow
Shared model. The developer (you) sets up the system and maintains it. The father adds new posts through a visual editor that requires no technical knowledge.

---

## 2. Site Map

```
Home
├── About (Biography)
│   ├── Career timeline
│   ├── Photos
│   ├── CV / Awards / Affiliations
│   └── Contact
│
├── Roy's Arboretum
│   ├── Overview (essay introducing the arboretum)
│   ├── Plants (filterable catalog)
│   ├── Insects (filterable catalog)
│   ├── Spiders (filterable catalog)
│   └── Field notes / Observations (dated entries)
│
├── Publications
│   ├── Books
│   │   ├── Agriculture
│   │   ├── Nature & Environment
│   │   ├── Literature
│   │   └── Others
│   └── Newspaper articles
│       ├── Agriculture
│       ├── Nature & Environment
│       └── Others / Literature
│       (filterable by language, year, publication venue)
│
├── Blog / New writing (for ongoing web-first posts)
│
└── Search (global, across all content)
```

---

## 3. Technical Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Astro | Native internationalization, content-focused, fast static output, supports React components where needed |
| Content storage | Markdown files with frontmatter, in Git | Plain text, future-proof, version-controlled, easy bulk import |
| Content management system | Decap CMS (free) | Web-based editor for non-technical use; commits directly to Git; no separate database |
| Hosting | Cloudflare Pages (free tier) | Free, fast, automatic deploys on Git push |
| Domain | Registered through Namecheap or Cloudflare Registrar | ~$12/year |
| Search | Pagefind | Static-site search; handles Bengali correctly; runs at build time, no backend |
| Analytics | Umami (self-hosted) or Plausible (~$9/month) | Privacy-respecting, no cookie banner required |
| Image hosting | Cloudflare Images or Git LFS | Sufficient for projected volume |
| Repository | Private GitHub repository | Free, integrates with Cloudflare Pages and Decap CMS |

Estimated total cost: $12–120/year (domain mandatory; everything else uses free tiers unless upgraded).

---

## 4. Content Model

This is the schema that every layer downstream depends on. Defined once, applied everywhere.

### 4.1 Publication (article, book, or blog post)
- `id` — unique slug
- `title_bn`, `title_en`
- `type` — `book` | `newspaper_article` | `blog_post` | `journal_article`
- `language` — `bn` | `en` | `mixed`
- `category` — `agriculture` | `nature_environment` | `literature` | `other`
- `date_published` — year minimum, full date if known
- `venue` — publisher or newspaper or journal name
- `venue_url` (optional)
- `summary_bn`, `summary_en` — 1 to 3 sentences, used in listings
- `body_bn`, `body_en` — full text if available
- `scan_url` — link to PDF or image of original (optional)
- `external_url` — link to original online publication (optional)
- `cover_image` — for books (optional)
- `tags` — free-form, for cross-cutting topics
- `featured` — boolean

### 4.2 Arboretum entry (plant, insect, or spider)
- `id` — unique slug
- `kind` — `plant` | `insect` | `spider`
- `common_name_bn`, `common_name_en`
- `scientific_name` — Latin binomial
- `family`
- `photos[]` — with captions
- `description_bn`, `description_en`
- `notes_bn`, `notes_en` — personal field observations (the distinctive content)
- `first_observed_date`
- `location_in_arboretum` (optional)
- `related_publications[]` — links to publications about this species

### 4.3 Biography page (singleton)
- `bio_short_bn`, `bio_short_en`
- `bio_long_bn`, `bio_long_en`
- `timeline[]` — array of `{year, event_bn, event_en}`
- `affiliations[]`
- `awards[]`
- `photos[]`
- `contact_email`

---

## 5. Build Strategy

### 5.1 Core Principles
1. **Function before design.** Every layer is built with minimal styling first. Visual design is a dedicated phase at the end.
2. **Layer by layer.** Each layer is independently verified before the next begins. A layer is "verified" when its acceptance criteria are met.
3. **Content schema is sacred.** Once Layer 2 is verified, the schema does not change without explicit re-verification of downstream layers.
4. **Real content from Layer 4 onward.** Avoid placeholder text past the point where real content is available; placeholder data hides bugs.

### 5.2 Layer Sequence

```
Layer 0: Inventory and material gathering        (runs in parallel)
Layer 1: Foundation                              (repository, hosting, domain)
Layer 2: Content schema and sample content       (5 hand-written entries)
Layer 3: Page templates, unstyled                (functional rendering only)
Layer 4: Bilingual routing and language toggle   (i18n working end-to-end)
Layer 5: Filtering, search, and listings         (discovery features)
Layer 6: Content management system               (father can add a post)
Layer 7: Bulk content migration                  (spreadsheet → site)
Layer 8: Design system and visual styling        (now make it beautiful)
Layer 9: Polish, SEO, performance                (production-ready)
Layer 10: Soft launch and training               (real users)
Layer 11: Public launch and maintenance handoff  (live)
```

Each layer below has a clear *Definition of Done*. Do not advance until met.

---

## 6. Detailed To-Do List

### Layer 0 — Inventory and Material Gathering
*Runs in parallel with all other layers. Bottleneck is the father's time.*

- [ ] Build inventory spreadsheet with columns matching the content model (Section 4)
- [ ] Father fills in metadata for all books (title, year, publisher, category, language)
- [ ] Father fills in metadata for newspaper articles (title, date, newspaper, category, language)
- [ ] Father writes a 2–3 sentence summary for each item in at least one language
- [ ] Gather 3–5 high-resolution portrait photographs
- [ ] Gather book cover images where they exist
- [ ] Gather arboretum photographs (plants, insects, spiders)
- [ ] Inventory arboretum species (one row per species, scientific + Bengali name)
- [ ] Decide on the website name and primary title
- [ ] Decide on Bengali numerals or Latin numerals for dates on the Bengali side
- [ ] Decide on copyright policy for hosting scans of newspaper articles

**Definition of Done:** Spreadsheet contains every known publication with at least title, year, language, category, and venue. Visual material is collected in a single folder.

---

### Layer 1 — Foundation

- [ ] Register the domain
- [ ] Create a private GitHub repository
- [ ] Set up an Astro project locally (`npm create astro@latest`)
- [ ] Configure Astro for internationalization (English + Bengali routes)
- [ ] Push the empty project to GitHub
- [ ] Connect the GitHub repository to Cloudflare Pages
- [ ] Verify that a placeholder page deploys automatically on push
- [ ] Connect the domain to Cloudflare Pages
- [ ] Configure HTTPS (automatic on Cloudflare Pages)
- [ ] Add a `README.md` documenting the stack and local development setup

**Definition of Done:** Pushing a change to the GitHub `main` branch automatically deploys a visible change to the live domain over HTTPS, within two minutes.

---

### Layer 2 — Content Schema and Sample Content

- [ ] Define the Astro content collections matching Section 4
- [ ] Create the directory structure: `src/content/publications/`, `src/content/arboretum/`, `src/content/biography/`
- [ ] Write the schema for each collection using Astro's content config
- [ ] Hand-write 5 sample publication entries as Markdown files with frontmatter:
  - 1 book (Bengali, agriculture)
  - 1 book (English, nature)
  - 1 newspaper article (Bengali, literature)
  - 1 newspaper article (English, agriculture)
  - 1 blog post (Bengali)
- [ ] Hand-write 3 sample arboretum entries (one plant, one insect, one spider)
- [ ] Hand-write the biography singleton entry
- [ ] Verify that Astro's build succeeds and validates all sample content against the schema

**Definition of Done:** `npm run build` succeeds with zero errors. All sample content passes schema validation. Schema is documented in a `CONTENT_SCHEMA.md` file in the repository.

---

### Layer 3 — Page Templates (Unstyled)
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

**Definition of Done:** Every page type renders correctly with sample content. All links work. No broken images. Pages are ugly but functional. Lighthouse accessibility score above 90 (because unstyled HTML is naturally accessible).

---

### Layer 4 — Bilingual Routing and Language Toggle

- [ ] Configure Astro's i18n routing with `en` and `bn` locales
- [ ] Set URL structure: `/en/publications/...` and `/bn/prakashana/...` (or chosen Bengali slugs)
- [ ] Generate every page in both language versions from the same content
- [ ] Build a language toggle component that switches to the equivalent page in the other language
- [ ] Define fallback behavior when a page exists in only one language
- [ ] Implement browser language detection on first visit
- [ ] Implement cookie-based memory of the user's manual language choice
- [ ] Add `<html lang="...">` and `hreflang` attributes correctly on every page
- [ ] Test that every link in the navigation respects the active language

**Definition of Done:** Clicking the language toggle on any page navigates to the same page in the other language without loss of context. URLs are clean and predictable. Search engines can crawl both versions independently.

---

### Layer 5 — Filtering, Search, and Listings

- [ ] Add filtering on the publications list page: by category, by language, by year, by venue
- [ ] Add filtering on the arboretum list page: by kind (plant / insect / spider)
- [ ] Build category subpages (`/publications/agriculture/`, `/publications/nature/`, etc.)
- [ ] Build a tag system — a page per tag listing all publications with that tag
- [ ] Integrate Pagefind for site-wide search
- [ ] Build a search results page
- [ ] Verify Bengali text searches return correct results (test with mixed-script queries)
- [ ] Add a recently-published feed on the homepage (latest 6 items)
- [ ] Add cross-links between arboretum entries and publications that mention them

**Definition of Done:** A visitor can find any publication by category, year, or keyword in three clicks or fewer. Search returns Bengali results correctly. Filtered URLs are bookmarkable and shareable.

---

### Layer 6 — Content Management System

- [ ] Install and configure Decap CMS in the Astro project
- [ ] Define the CMS schema for the publications collection (mirrors Section 4.1)
- [ ] Define the CMS schema for the arboretum collection (mirrors Section 4.2)
- [ ] Define the CMS schema for the biography singleton
- [ ] Configure side-by-side Bengali and English input fields in the editor
- [ ] Set up authentication for the CMS (GitHub OAuth or Netlify Identity)
- [ ] Create a user account for the father in the authentication provider
- [ ] Configure the CMS to commit to a `draft` branch first (optional but recommended)
- [ ] Write a one-page user guide for the father in both Bengali and English
- [ ] Verify the father can log in to `/admin` and add a test post end-to-end
- [ ] Verify the test post appears on the live site after the build completes
- [ ] Set up email notifications to the developer when new content is committed

**Definition of Done:** The father, without developer assistance, adds a complete bilingual blog post through the CMS, publishes it, and sees it live on the site within five minutes. This is verified by an actual dry run, not by reading documentation.

---

### Layer 7 — Bulk Content Migration

- [ ] Write a migration script that converts the inventory spreadsheet into Markdown files matching the schema
- [ ] Validate the script on 10 sample rows first
- [ ] Run the full migration on all spreadsheet rows
- [ ] Manually review every generated Markdown file for encoding issues, especially Bengali characters
- [ ] Upload all scanned PDFs and images to the chosen image host
- [ ] Link scans and cover images from the corresponding Markdown frontmatter
- [ ] Verify the full site builds without errors after migration
- [ ] Spot-check 20 random publication detail pages on the live site
- [ ] Set up redirects from any older URLs the father may want preserved

**Definition of Done:** Every item in the inventory spreadsheet appears on the live site as a working publication page. No build errors. No encoding artifacts in Bengali text.

---

### Layer 8 — Design System and Visual Styling
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

**Definition of Done:** Every page is fully styled, consistent across the site, comfortable to read in both languages, and works on phone, tablet, and desktop without horizontal scroll or broken layouts.

---

### Layer 9 — Polish, SEO, and Performance

- [ ] Generate a sitemap (`/sitemap.xml`) including both language versions
- [ ] Add `robots.txt`
- [ ] Add OpenGraph metadata to every page (title, description, image)
- [ ] Add Twitter card metadata
- [ ] Add structured data (JSON-LD) for articles and books — important for academic discoverability
- [ ] Add a favicon and apple-touch-icon
- [ ] Optimize all images (convert to WebP, generate responsive srcsets)
- [ ] Audit Lighthouse scores — target 90+ in all four categories
- [ ] Verify the site loads in under 2 seconds on a 3G connection
- [ ] Install privacy-respecting analytics (Umami or Plausible)
- [ ] Add an RSS feed for the blog and for new publications
- [ ] Add a contact form or contact email link
- [ ] Test the site on real phones (Android and iPhone)

**Definition of Done:** Lighthouse scores are 90+ across performance, accessibility, best practices, and SEO. The site validates in Google Search Console without errors. Analytics is recording visits.

---

### Layer 10 — Soft Launch and Training

- [ ] Share the live URL with a small private circle: family, 3–5 of the father's colleagues
- [ ] Collect feedback for 2 weeks
- [ ] Fix bugs reported during the soft launch
- [ ] Sit with the father for a one-hour training session on the CMS
- [ ] Have the father publish 3 real posts during the training session
- [ ] Document any frequently-confused steps for the user guide

**Definition of Done:** The father independently publishes a real post during training. At least 5 outside readers have visited the site and given feedback. All critical bugs are resolved.

---

### Layer 11 — Public Launch and Maintenance Handoff

- [ ] Announce the site (newspapers the father writes for, academic networks, social media if applicable)
- [ ] Submit the site to Google Search Console and Bing Webmaster Tools
- [ ] Set up automatic Git backups to a second location (e.g., a private mirror)
- [ ] Document the maintenance workflow in a `MAINTENANCE.md` file in the repository
- [ ] Schedule quarterly check-ins to review analytics and content quality
- [ ] Schedule annual review of stack dependencies and domain renewal

**Definition of Done:** Site is publicly announced. The father is publishing independently. Developer's ongoing involvement is limited to quarterly reviews and ad-hoc requests.

---

## 7. Decisions Already Made

These were resolved through the planning conversation and should not be reopened without explicit reason.

1. **Stack:** Astro + Decap CMS + Cloudflare Pages.
2. **Content stored as Markdown in Git.**
3. **Fully bilingual UI** with parallel content fields, not auto-translation.
4. **No comments at launch.** A contact email is sufficient.
5. **No e-commerce on the site.** Link out to publishers for book purchases.
6. **Privacy-respecting analytics**, not Google Analytics.
7. **Function-first build order**, design phase deferred to Layer 8.
8. **Layer-by-layer verification** with explicit Definition of Done at each layer.

---

## 8. Decisions Deferred

To be resolved before reaching the corresponding layer.

| Decision | Resolve before | Default if unresolved |
|---|---|---|
| Domain name | Layer 1 | Use a `pages.dev` subdomain temporarily |
| Bengali numerals or Latin for dates | Layer 4 | Latin |
| Newsletter | Layer 11 | No newsletter at launch |
| Hosting scans of newspaper articles (copyright comfort) | Layer 7 | Host with attribution; remove on request |
| Decap CMS vs. Sanity | Layer 6 | Decap (free, in-repo) |
| Specific Bengali serif font | Layer 8 | Noto Serif Bengali |

---

## 9. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Inventory phase (Layer 0) stalls | Build the spreadsheet to accept partial entries; allow missing fields |
| Father finds the CMS confusing | Layer 6 includes an actual dry-run before declaring Done; alternative is Sanity |
| Bengali typography looks wrong | Layer 8 includes explicit bilingual review; budget time for font experimentation |
| Newspaper copyright objections | Host with attribution; respond to takedown requests individually |
| Site outgrows static generation | Not a concern until ~1000s of pages; current architecture migrates cleanly to dynamic if needed |
| Developer becomes unavailable long-term | Content is plain Markdown in Git; any developer can pick it up; CMS works without the original developer |

---

## 10. Reference: Why This Order

The build sequence is deliberately function-first. Reasoning:

- **Designing before content exists** produces a beautiful shell that fits no content. The 5 hand-written entries in Layer 2 reveal real constraints (article length, title length, missing fields) that fictional placeholders hide.
- **Designing before the CMS works** is risky because the CMS sometimes constrains layout (Decap's preview pane, image upload paths, etc.). Building Layer 6 before Layer 8 ensures the design accommodates how content is actually created.
- **Bulk migration before design** means the design is tested against the full content variety from the start, not against an idealized sample.
- **Verifying each layer before advancing** prevents compounding bugs. Most production website failures come from skipping verification on an earlier layer and discovering the breakage three layers later, when its source is no longer obvious.

The cost of this order is that the site looks ugly for the majority of the build timeline. The benefit is that when design begins, every functional question is already answered, and design becomes a pure focus task rather than a tangled mix of structural and visual decisions.
