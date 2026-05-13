# Inventory

This folder is the working spreadsheet for Phase 0 of `PHASES.md`. The father fills in real data here; Phase 7 will migrate the rows into Markdown content files for the Astro site.

## Files

- `publications.csv` — books, newspaper articles, blog posts, journal articles. Columns mirror `WEBSITE_PLAN.md` §4.1.
- `arboretum.csv` — plants, insects, spiders. Columns mirror `WEBSITE_PLAN.md` §4.2.
- `biography.md` — the biography singleton (mirrors §4.3). Stored as Markdown + YAML frontmatter rather than CSV because it has nested arrays.

## CSV conventions

- **Encoding:** UTF-8. Bengali text is supported directly.
- **Array fields** (`tags`, `photos`, `related_publications`): pipe-separated within a single cell (`farming|soil`).
- **Empty fields:** leave blank, not `null` or `-`.
- **Dates:** `YYYY-MM-DD` if known; `YYYY` alone is acceptable for older items where only the year is known.
- **`id`:** kebab-case slug, unique across the file. The Phase 7 migration uses this as the filename.

## Placeholders

The `cover_image`, `scan_url`, and `photos` columns currently reference files under `assets/placeholders/`. Real scans, cover photos, and field photographs will replace these in Phase 7. See `assets/placeholders/README.md` for the placeholder strategy.

## Phase 0 deferred decisions

These belong with the inventory work but are not yet resolved (see `WEBSITE_PLAN.md` §8):

- Website name and primary title
- Bengali numerals vs. Latin numerals for dates on the Bengali side
- Copyright policy for hosting scans of newspaper articles
