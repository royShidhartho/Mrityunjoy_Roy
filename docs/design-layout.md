# Mrityunjoy Roy Archive — Current Design & Layout

*Snapshot of the deployed site (branch `sus_code_`, 2026-05-17). The site is a bilingual (Bengali/English) archive built in Astro and hosted on GitHub Pages. This document describes what is currently shipping; planned but-not-yet-built design work is out of scope.*

---

## 1. Design identity

The visual language is best described as an **editorial herbarium** — a hand-set field journal printed on warm paper, with deep moss-green accents and a recurring botanical leaf mark used for the brand, ornaments, and decorative watermarks.

The system is built around four ideas that recur on every page:

1. **Paper-and-ink palette** — warm cream `--ground` (`#F4EFE4`), near-black `--ink` (`#1A1814`), and moss-green `--moss` (`#3F5C3A`) as the single interactive accent. A `--rust` (`#8B3A22`) is reserved for destructive affordances.
2. **Serif-only typography** — Fraunces (variable, optical-sized) for English; Noto Serif Bengali for Bengali. Locale swaps the body font automatically via `:lang(bn)` and `:lang(en)`.
3. **Hairline rules instead of boxes** — most section boundaries are single-pixel `--rule` borders, not panels or shadows.
4. **A single leaf mark** — a stylised leaf SVG appears as the brand logo (rotated -12° at rest, animating to 0° on hover), in section ornaments, and as a faint hero watermark.

---

## 2. Design tokens (reference)

All tokens live in `src/styles/global.css` and are consumed via CSS custom properties. A dark-mode variant is defined under `@media (prefers-color-scheme: dark)`.

### Colour

| Token | Light | Role |
|---|---|---|
| `--ground` | `#F4EFE4` | page background (warm paper) |
| `--ground-deep` | `#ECE5D3` | sticky filter strip background |
| `--surface` | `#FCF8EE` | cards, selects, kind-marks |
| `--ink` | `#1A1814` | primary text |
| `--ink-soft` | `#4A4238` | secondary text |
| `--ink-muted` | `#756B5E` | labels, metadata |
| `--rule` | `#D9CFB8` | primary hairlines |
| `--rule-soft` | `#E8DFC8` | inner dividers (list rows) |
| `--moss` | `#3F5C3A` | links, hover, active accent |
| `--moss-hover` | `#2D4329` | primary-button pressed |
| `--moss-tint` | `#E5EDD8` | hover wash on cards/rows |
| `--rust` | `#8B3A22` | reset/destructive hover |

### Type

- **English body**: `Fraunces, "Iowan Old Style", "Apple Garamond", Garamond, "Cormorant Garamond", Georgia, serif`
- **Bengali body**: `"Noto Serif Bengali", "Hind Siliguri", "Lohit Bengali", serif`
- Loaded from Google Fonts with `font-display: swap`; Fraunces variable axes `opsz` (9–144) and `SOFT` are exploited for display-size titles (e.g. `font-variation-settings: "opsz" 144, "SOFT" 50`).

### Scale (1.25-ish ratio)

| Token | Size | Used for |
|---|---|---|
| `--t-mini` | 11px | labels, small-caps |
| `--t-small` | 13px | metadata, nav, filter selects |
| `--t-body` | 17px | body text |
| `--t-lead` | 19px | leads, list titles |
| `--t-h4` | 23px | card titles, specimen names |
| `--t-h3` | 30px | section titles, publication titles |
| `--t-h2` | 40px | stat numbers |
| `--t-h1` | 56px | (reserved) |
| `--t-display` | 84px | EN hero |
| `--t-display-bn` | 68px | BN hero (smaller deliberately) |

Leading: `--lh-body: 1.65` (EN), `--lh-bn-body: 1.85` (BN). Bengali always gets more leading because the script's descenders need room.

### Spacing, layout, motion

- Spacing scale `--s-1` (4px) through `--s-10` (144px), 8pt-ish with golden bumps.
- Containers: `--container: 72rem`, `--container-wide: 84rem`, reading-width `--measure: 38rem`.
- Gutter is fluid: `clamp(1.25rem, 4vw, 2.5rem)`.
- Radii: `--r-sm` 2px, `--r` 4px, `--r-lg` 10px. Most surfaces use 4px.
- Motion: single curve `--ease: cubic-bezier(0.2, 0.6, 0.2, 1)`. Durations `--dur-fast` 160ms / `--dur` 280ms / `--dur-slow` 520ms. A `.reveal` animation fades+translates content in with staggered `data-delay="1"` through `"5"`. Reduced-motion is honoured.

---

## 3. Site chrome (`BaseLayout.astro`)

Every page is wrapped by `BaseLayout`, which provides the masthead, the `<main>` slot, and the footer. The shell uses a vertical `flex` body so the footer sits at the viewport bottom on short pages.

### 3.1 Masthead

```
┌─────────────────────────────────────────────────────────────────┐
│ [🍃] Mrityunjoy Roy            About  Publications  Arboretum   │
│      Archive                   Blog   Search        [⇋ বাংলা] │
└─────────────────────────────────────────────────────────────────┘
```

- **Position**: `position: sticky; top: 0; z-index: 50` — stays at the top during scroll.
- **Background**: semi-transparent ground colour `color-mix(in oklab, var(--ground) 92%, transparent)` with `backdrop-filter: blur(8px) saturate(140%)` for a frosted-paper effect over scrolled content.
- **Bottom edge**: 1px `--rule` hairline (no shadow).
- **Inner container**: `.container-wide` (84rem), `display: flex; align-items: center; gap: var(--s-5); flex-wrap: wrap; padding-block: var(--s-4)`.
- **Brand**: leaf SVG (24×24, `stroke-width: 1.2`, rotated `-12deg` at rest, rotates to `0deg` on hover via `transform`) plus a two-line word-stack: site name on top, optional small-caps "Archive" sub-label below (hidden on the home page so the brand doesn't compete with the hero).
- **Nav**: 5 items (`About`, `Publications`, `Arboretum`, `Blog`, `Search`). Each link is `--t-small`, `--ink-soft`, with a `::after` pseudo-element acting as a left-anchored underline that scales from 0 to 1 on hover (`transform: scaleX`). The active link gets a half-width moss-coloured underline (`transform: scaleX(0.5)`).
- **Language toggle**: a pill at the far right, 1px `--rule` border, 999px radius, label is small-caps in English / normal-case at `--t-small` in Bengali. Hovering tints the pill `--moss-tint` and turns the border moss.
- **Mobile (≤720px)**: the nav wraps onto its own full-width row beneath the brand; gaps tighten.

### 3.2 Main content

`<main id="content" data-pagefind-body>` — the `data-pagefind-body` attribute scopes the search index to in-page content only (excluding chrome). `id="content"` is the target of a visually-hidden **skip link** that slides in from above on focus.

### 3.3 Footer ("colophon")

A single thin band, `margin-top: var(--s-9)` (144px) of breathing room above it, then `border-top: 1px solid var(--rule)`, `padding-block: var(--s-6)`, `--ink-muted` text at `--t-small`.

Three flex children: small leaf mark + `© {year} Mrityunjoy Roy` on the left, an italic colophon note in the middle (italics drop to normal in Bengali), and a duplicate language toggle on the right.

### 3.4 Cross-page primitives

`global.css` defines a small set of reusable classes:

- `.container` / `.container-wide` — centred, padded by `--gutter`.
- `.measure` — `max-width: 38rem` reading column.
- `.label` — 11px, small-caps in English (Bengali drops the uppercasing and relaxes letter-spacing).
- `.rule` — hairline divider; `.rule--ornament` overlays a small leaf SVG centred on the line.
- `.skip` — accessibility skip-link, hidden until focused.
- `.reveal` — opacity/translate animation with `data-delay` from 1–5.

---

## 4. Page layouts

The site has seven distinct page templates. They share the `BaseLayout` shell but each composes a different sequence of sections from the primitives above.

### 4.1 Home (`/[locale]/index.astro`)

A four-section stacked composition, each section separated by a 1px `--rule` hairline.

```
┌─────────────────────────────────────────────────────────────────┐
│ HERO                                          [faint leaf SVG] │
│                                                                │
│ ○ A bilingual archive                                           │
│                                                                │
│ Mrityunjoy Roy                                                  │
│ মৃত্যুঞ্জয় রায়       ← other-locale, muted, italic, smaller │
│                                                                │
│ Tagline (lead)                                                  │
│ Short bio (italic, muted)                                       │
│ ─────────────────────────────────────                          │
│   12         8          3                                      │
│   PUBS       ARBORETUM  BLOG                                   │
│                                                                │
├─────────────────────────────────────────────────────────────────┤
│ SELECTED  Selected writings                                     │
│                                                                │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐                       │
│ │ card      │ │ card      │ │ card      │                       │
│ └───────────┘ └───────────┘ └───────────┘                       │
├─────────────────────────────────────────────────────────────────┤
│ RECENT  Latest additions                                        │
│ 2024-04-09  Title of publication           BOOK                 │
│ 2024-03-22  Title of publication           ARTICLE              │
│ ...                                                             │
├─────────────────────────────────────────────────────────────────┤
│ EXPLORE  Browse the archive                                     │
│ ┌─────────┬─────────┬─────────┬─────────┐                       │
│ │ 🍃 Pubs │ 🍃 Arb. │ 🍃 Blog │ 🍃 About│                       │
│ │  hint   │  hint   │  hint   │  hint   │                       │
│ └─────────┴─────────┴─────────┴─────────┘                       │
└─────────────────────────────────────────────────────────────────┘
```

**Hero**

- Container `.container-wide`; `padding-block: var(--s-8) var(--s-7)`; `position: relative; overflow: hidden`.
- A `::before` pseudo-element is positioned `top: 8%; right: -8rem`, sized `24rem × 24rem`, painted with an inline-encoded leaf SVG at `stroke-opacity: 0.18` — this is the faint watermark, sitting behind text via z-index.
- `.hero__inner` is `max-width: 52rem` so the hero never feels gymnasium-wide.
- Title stack: active-locale name at `clamp(2.5rem, 7vw, --t-display)` weight 400 with display-optical axes; other-locale name beneath in italic `--ink-muted` at roughly half the size (font-style normal when the other locale is Bengali).
- Stats strip sits above a `border-top: 1px --rule`. Three `<a>` "stat" cells (`display: flex; flex-direction: column`) with a giant tabular number at `--t-h2` and a small-caps label beneath. Hovering tints the entire stat moss-green.

**Featured cards**

- Grid: `repeat(auto-fit, minmax(18rem, 1fr))`, gap `--s-5`.
- Each card has a `--rule` border, `--r-lg` (10px) radius, `--surface` background, an internal radial-gradient overlay (`moss-tint`) that fades in on hover, and lifts `-2px` with a soft moss-coloured shadow.
- Card content: small-caps meta (type · date), `--t-h4` title, `--t-small` excerpt, and a "Read →" CTA at the bottom of the flex column that nudges right on hover.

**Recent (Latest additions)**

- A tabular "index" list: each row is a CSS grid with three columns — `9rem 1fr auto` (date / title / type).
- Date is tabular-numeric `--ink-muted`; title is `--t-lead` and underlines on hover; type sits to the right as a small-caps label.
- Rows separated by `--rule-soft` and wash with `--moss-tint` on hover.
- ≤640px the grid collapses to single column with tighter spacing.

**Sections (Browse the archive)**

- A 4-up grid `repeat(auto-fit, minmax(14rem, 1fr))` with **1px gap on a `--rule` background** — this is the trick that produces "joined cards with hairline separators" without per-cell borders.
- Outer wrapper has `--rule` border and `--r-lg` radius with `overflow: hidden` so the inner grid is masked into the rounded rectangle.
- Each cell is a 3-column grid (icon / label / count) where the leaf icon and the count both span both rows.

### 4.2 Listing template — Publications (`/[locale]/publications/index.astro`)

This is the most layout-dense page. It composes four stacked sections: a page head, a quick-jump chip strip, a **sticky filter bar**, and the entries list.

```
┌─────────────────────────────────────────────────────────────────┐
│ SECTION                                                         │
│ Publications                                                    │
│ 47 entries · 4 categories · 22 years                            │
├─────────────────────────────────────────────────────────────────┤
│ QUICK JUMP                                                      │
│ ⓐ Agriculture  ⓑ Nature  ⓒ Literature  ⓓ Other                │
├═════════════════════════════════════════════════════════════════┤  ← sticky
│ FILTER  Category ▾   Language ▾   Year ▾   Venue ▾    [Reset]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ 2024  ┌──────────────────────────────────────────────────────┐  │
│       │ Publication title (h3, big serif)                    │  │
│       │ BOOK · AGRICULTURE · Anandabazar Patrika             │  │
│       │ Summary excerpt, max 48rem, soft ink                 │  │
│       │ #soil #bengal #rice                                  │  │
│       └──────────────────────────────────────────────────────┘  │
│ 2023  ┌──────────────────────────────────────────────────────┐  │
│       │ ...                                                  │  │
│ ─────────────────────────────────────────────────────────────  │
└─────────────────────────────────────────────────────────────────┘
```

**Page head**

`padding-block: var(--s-8) var(--s-5)`. Three stacked lines: small label, large title `clamp(2.5rem, 6vw, 4rem)` weight 400, italic muted sub-line with counts.

**Quick jump (`.quick-cats`)**

A row of pill-shaped category links (`.chip`). Each: 1px `--rule` border, 999px radius, `0.4rem 0.85rem` padding, small text. Hover swaps the background to `--moss-tint`, border and text to moss.

**Sticky filter bar (`.filters`)**

- `position: sticky; top: 4.25rem` — sits just below the also-sticky masthead.
- `z-index: 10`, `background: var(--ground-deep)`, blurred backdrop, bordered top + bottom.
- Layout: `display: flex; align-items: center; gap: var(--s-4); flex-wrap: wrap`.
- Form inside is also a flex row of 4 `<select>` filters + a reset button. Each filter is a tiny `<label>` stack with a small-caps caption above the select.
- ≤720px the bar drops `position: sticky` and behaves as static (because mobile users would lose too much vertical space).

**Entries list (`.entry`)**

- Each entry is a 2-column CSS grid: **6rem year column / 1fr body**, separated by gap `--s-5`, vertical padding `--s-6`, bottom border `--rule`.
- Year is large (`--t-h4`), `--ink-muted`, tabular numerals; turns moss on row hover.
- Title is `--t-h3` weight 400 with a "growing-underline" effect implemented as a 0-to-100% `background-size` 1px gradient (cleaner than `text-decoration` animation).
- Meta line is small-caps `--ink-muted`, with venue rendered italic + lowercase to look like a citation.
- Excerpt capped at `48rem`.
- Tags: small-caps, `--ink-muted`, `font-variant: small-caps`, no `#` styling beyond the literal character.
- ≤720px the year column collapses; year shrinks to `--t-small` above the title.

**Client-side filter script**

A tiny inline script reads four `<select>` values, then walks `pub-list.children` toggling `[hidden]` based on `data-category`, `data-language`, `data-year`, `data-venue` matches. An "empty-state" line shows when zero entries pass.

### 4.3 Article template — Publication detail (`/[locale]/publications/[id].astro`)

Centred, narrow, reading-first layout. Roughly three vertical bands inside a single `.container`.

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back to publications                                          │
│                                                                 │
│              BOOK · AGRICULTURE                                 │
│         A Centred Big Title At max 28ch                         │
│           Other-locale title (italic muted)                     │
│   ─────────────────────────────────────────────                │
│   DATE              VENUE                LANGUAGE               │
│   9 Apr 2024        Anandabazar          Bengali                │
│                                                                 │
│              [optional cover image, max 26rem,                  │
│               soft 24px drop-shadow]                            │
│                                                                 │
│   ──── lede: italic, bordered top & bottom ────                 │
│                                                                 │
│   L orem ipsum body paragraph with a moss-coloured             │
│     3.5em drop-cap on the first letter (English only —          │
│     drop-cap is disabled for Bengali, where it would            │
│     mangle conjuncts).                                          │
│                                                                 │
│   Body paragraph two. Body paragraph three.                     │
│                                                                 │
│   ─────────────────────────────────────                        │
│   [↓ Read scan]   [↗ External link]                            │
│                                                                 │
│   ───────                                                       │
│   TAGS   #soil #rice                                            │
└─────────────────────────────────────────────────────────────────┘
```

- Outer `.article { padding-block: var(--s-7) var(--s-8) }`.
- **Header is `text-align: center`** desktop, falls back to start-aligned on ≤640px. Back link sits left-aligned above the centred content.
- Title `clamp(2rem, 6vw, 4rem)` weight 400, capped at `max-width: 28ch` with `text-wrap: balance` for tidy line breaks.
- Citation block `.article__cite` is a `<dl>` grid: `repeat(auto-fit, minmax(8rem, max-content))`, `justify-content: center`, separated from the title by a 1px `--rule` top border.
- Cover image, when present, is its own band — centred, `max-width: 26rem`, drop shadow `0 24px 48px -24px` mixed with `--ink`.
- Body wrapper `.article__body` is `max-width: 38rem` (the reading measure).
- Lede paragraph sits between two `--rule` horizontal lines, italic in English, normal in Bengali.
- Drop-cap is implemented as `.prose p:first-of-type::first-letter { font-size: 3.5em; float: left; color: var(--moss); }`. Bengali overrides reset this to inherit (a floated drop-cap mangles Bengali conjunct rendering).
- **Action buttons** (`Scan` / `External`): the first is a solid moss button with `--ground` text; the second sibling (`.action + .action`) is automatically restyled as a moss-bordered outline button, no extra class needed.
- Tag footer is a flex row with a small-caps "TAGS" label and small-caps tag links.

### 4.4 Listing template — Arboretum (`/[locale]/arboretum/index.astro`)

A **card-grid** listing (the publications page is a typographic list — the arboretum is a visual catalog because specimens have photos).

```
┌─────────────────────────────────────────────────────────────────┐
│ FIELD COLLECTION                                                │
│ Roy's Arboretum                                                 │
│ 28 species · 18 plants · 7 insects · 3 spiders                  │
├─────────────────────────────────────────────────────────────────┤
│ [ All ] [● Plants (18)] [● Insects (7)] [● Spiders (3)]        │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐                 │
│ │ photo   │ │ photo   │ │ photo   │ │ photo   │                 │
│ │  [PLANT]│ │ [INSECT]│ │  [PLANT]│ │ [SPIDER]│                 │
│ ├─────────┤ ├─────────┤ ├─────────┤ ├─────────┤                 │
│ │ Name    │ │ Name    │ │ Name    │ │ Name    │                 │
│ │ sci.    │ │ sci.    │ │ sci.    │ │ sci.    │                 │
│ │ FAMILY  │ │ FAMILY  │ │ FAMILY  │ │ FAMILY  │                 │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘                 │
└─────────────────────────────────────────────────────────────────┘
```

- **Page head**: identical pattern to publications (label / title / sub).
- **Kind tabs** (`.kinds__tabs`): a flex row of pill buttons. Each pill carries a tiny coloured dot (`.kind-tab__dot--plant` `#6E8C50`, `--insect` `#C58A3D`, `--spider` `#6E5E4E`) plus a parenthesised count. The active pill flips to a solid `--ink` background with `--ground` text. Click handlers in an inline script toggle `[hidden]` on `<li>` items by `data-kind`.
- **Specimen grid** (`.specimen-grid`): `grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr))`, gap `--s-5`.
- **Card** (`.specimen`):
  - Border `1px --rule`, radius `--r` (4px), `overflow: hidden`.
  - Two stacked regions: figure on top (`aspect-ratio: 4/3`, `object-fit: cover`), body below (`padding: --s-4`).
  - A pill **kind badge** is absolutely positioned `top: --s-3; inset-inline-start: --s-3` over the photo, with a frosted-paper background (`color-mix` ground + `backdrop-filter: blur(4px)`) and a kind-coloured border.
  - When a specimen has no photo, the figure becomes a centred leaf-SVG placeholder over a radial `--moss-tint` wash.
  - Hover: image scales `1.03` over `--dur-slow`, card lifts `-2px`, border becomes moss, soft moss shadow appears.
  - Body: specimen common name `--t-h4`, italic scientific name forced to `var(--font-en)` even on Bengali pages (Latin binomials must be Latin), tiny family label.

### 4.5 Detail template — Arboretum entry (`/[locale]/arboretum/[id].astro`)

A two-column scientific-style detail page with a **sticky meta sidebar**.

```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back to arboretum                                             │
├─────────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────┐ ┌──────────────────────────┐   │
│ │ ● PLANT (kind-mark pill)     │ │                          │   │
│ │ Specimen common name         │ │   hero photo, 4:3        │   │
│ │ other-locale (italic muted)  │ │                          │   │
│ │ *Scientific name*            │ │                          │   │
│ └──────────────────────────────┘ └──────────────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│ ┌───────────────┐ ┌─────────────────────────────────────────┐   │
│ │ FAMILY        │ │ DESCRIPTION                             │   │
│ │ Asteraceae    │ │ Body paragraph(s)...                    │   │
│ │ ───────────   │ │                                         │   │
│ │ FIRST OBSERVED│ │ NOTES                                   │   │
│ │ 9 Apr 2020    │ │ ▌ moss-bordered italic blockquote-y    │   │
│ │ ───────────   │ │   notes paragraph                       │   │
│ │ LOCATION      │ │                                         │   │
│ │ South gate    │ │ PHOTOS                                  │   │
│ │ (sticky)      │ │ ┌──────┐ ┌──────┐ ┌──────┐              │   │
│ │               │ │ │      │ │      │ │      │              │   │
│ │               │ │ └──────┘ └──────┘ └──────┘              │   │
│ │               │ │                                         │   │
│ │               │ │ RELATED PUBLICATIONS                    │   │
│ │               │ │ → Linked publication title              │   │
│ └───────────────┘ └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

- Outer container is `.container-wide`; everything else is grid layout.
- **Header `.spec-head`**: single-column on mobile, **`1fr 1fr` two-column at ≥800px** with the text block on the left and the hero photo (`aspect-ratio: 4/3`, `object-fit: cover`, 1px border, `--r` radius) on the right. Bottom border `--rule` separates the header from the body.
- **Kind mark**: a pill identical in colour-key to the listing tabs — a coloured dot + label.
- **Body grid `.spec-grid`**: single-column on mobile, **`14rem 1fr` two-column at ≥800px**.
  - Left column: `.spec-meta` aside — `--surface` background, `--rule` border, `--r` radius, `padding: --s-4`. **`position: sticky; top: 5rem`** so the metadata stays visible while the user scrolls the description. Reverts to `position: static` below 800px.
  - The meta itself is a `<dl>` grid with small-caps `<dt>` and `--t-small` `<dd>`, each row separated by a `--rule-soft` bottom border (suppressed on the last row).
  - Right column: stacked `.spec-section` blocks (description, notes, photos, related publications), each with an `--t-h5` heading.
  - **Notes block** gets a `border-inline-start: 3px solid var(--moss); padding-inline-start: var(--s-4)` — a margin-quote treatment, italic in English, normal in Bengali.
  - **Photos**: `repeat(auto-fit, minmax(14rem, 1fr))` grid of `4/3` images, each with an optional italic caption underneath.
  - **Related publications**: a flat list of underlined links with a small-caps "· type" suffix.

### 4.6 About page (`/[locale]/about.astro`)

A long-scroll biography composed of five logically separated bands. Each band after the hero is separated by `border-top: 1px --rule` and `padding-block: --s-7`.

1. **About hero** — Two-column at ≥880px (`1.2fr 1fr`); label + name (`clamp(2.5rem, 6vw, 4.5rem)`) + short italic bio on the left, portrait photo on the right. Photo is `aspect-ratio: 3/4` with a 1px border, `--r` radius, and a soft drop shadow (`0 24px 60px -32px` mixed with ink). Caption sits below the image inside the same `<figure>`, separated by a `--rule-soft` line, padded `--s-3`, italic muted.
2. **Long bio prose** — Centred `.measure` (38rem) reading column.
3. **Timeline** — A CSS-grid list, `7rem 1.25rem 1fr` columns (year / dot / event). A 1px `--rule` runs vertically through the dot column via a `::before` pseudo-element on `.timeline` (positioned at `7rem + --s-4` from start, inset top/bottom by `0.6rem` so it doesn't poke past the first/last dot). Each dot is a 9px ring (`border: 1px solid --moss; background: --ground; border-radius: 50%`) sitting `z-index: 1` above the rule. Below 640px the year column shrinks to `3.5rem`.
4. **Affiliations + Awards** — Two-column at ≥720px. Each column is a `.section-head` label over a `.plain-list` of items separated by `--rule-soft`. Awards get a 4rem-wide moss-coloured tabular year prefix.
5. **Photo grid** — `repeat(auto-fit, minmax(14rem, 1fr))` of `4/3` images with italic captions.
6. **Contact** — A single `mailto:` link styled as a large (`--t-h4`) underlined name that turns moss on hover.

### 4.7 Search page (`/[locale]/search.astro`)

The simplest layout. A narrow centred column (`.container` capped at `48rem`):

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│ SEARCH                                                          │
│ Search the archive                                              │
│ Type Bengali or English freely.                                 │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────┐     │
│ │ 🔍  Start typing…                                       │     │
│ └─────────────────────────────────────────────────────────┘     │
│                                                                 │
│ 12 results                                                      │
│                                                                 │
│ 1. Title                                                        │
│    Excerpt with <mark>highlighted</mark> match…                 │
│    /bn/publications/some-id                                     │
│                                                                 │
│ 2. Title                                                        │
│    ...                                                          │
└─────────────────────────────────────────────────────────────────┘
```

- Padded `padding-block: --s-8` top and bottom.
- The form is a single `<input type="search">` with an SVG magnifier icon laid in front of it (positioned inside a flex parent).
- Pagefind is loaded lazily via dynamic import; if the index isn't built (i.e. `npm run dev` without a prior build), a warning replaces the live status line and the input is disabled.
- Results render server-side as a numbered list; each result is a `<a>` with title `<h3>`, excerpt paragraph, and the URL as a small-caps label.
- Filtered to the current locale via `filters: { language: [locale] }`.

---

## 5. Responsive system

There is **no design-token-driven breakpoint scale** — each page picks the breakpoint where its specific layout breaks. The breakpoints actually used across the site:

| Breakpoint | Used by | Effect |
|---|---|---|
| ≤640px | publications listing index, publication article header, about timeline | grid collapses, type shrinks, citations align-start |
| ≤720px | masthead nav, filters bar, publications entries | nav wraps full width, filters drop sticky, entries collapse to single column |
| ≤799px / ≥800px | arboretum detail | spec-head and spec-grid switch between 1-col and 2-col |
| ≥880px | about hero | switches from 1-col to `1.2fr 1fr` two-column |

The most important responsive trick is that **`position: sticky` is consistently disabled on mobile** (filters bar, spec-meta sidebar). Sticky chrome on a phone steals scroll real estate from already-cramped content; the site treats it as a desktop affordance only.

Other consistent responsive behaviours:

- Container gutter is fluid `clamp(1.25rem, 4vw, 2.5rem)` — no media queries needed for the gutter itself.
- Display titles use `clamp(min, viewport, max)` so the hero never overflows or shrinks to illegibility.
- Bengali sizes are always set lower than their English equivalents (the script is denser; equivalent point sizes look heavier on the page).
- `:focus-visible` produces a 2px moss outline with 3px offset everywhere — never removed for visual reasons.

---

## 6. Accessibility and printing

- **Skip link** in `BaseLayout` jumps to `#content`.
- `hreflang` + `canonical` are emitted for both locales on every page.
- The language toggle is `<a hreflang="...">` to the equivalent page in the other locale — not a JS toggle.
- `prefers-reduced-motion` reduces all animations and transitions to ~0ms.
- `prefers-color-scheme: dark` triggers an inverted palette (cream → near-black background, ink → cream text, moss flips to a lighter mint `#A5C99A`).
- A `@media print` rule strips the masthead, colophon, nav, skip link, and filter bar; switches to black-on-white; sets body size to 11pt; underlines all links — so any page can be printed as a clean archival reference.

---

## 7. What is *not* in the design yet

- No icon set beyond the leaf mark and one search-icon SVG.
- No image lightbox / gallery — photo grids open the raw asset URL.
- No favicon design (the placeholder `favicon.svg` ships as-is).
- No OG/share-card design (Phase 9).
- No empty-state illustrations — empty lists show italic muted prose only.
- No 404 design beyond the default Astro page in `src/pages/404.astro`.

These are intentional gaps per the function-first build order documented in `WEBSITE_PLAN.md`; Phase 8 polish covered the surfaces above and Phase 9 will fill the remaining slots before public launch.
