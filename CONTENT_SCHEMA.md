# Content Schema

Schemas for the three Astro content collections, mirroring `WEBSITE_PLAN.md` §4. Defined in `src/content.config.ts`. **Sacred from this point onward** — schema changes require re-verifying every downstream phase (Phase 3+).

## Common conventions

- **Bilingual fields** end in `_bn` / `_en`. Parallel fields, not auto-translation.
- **`id`** is the filename slug (e.g. `book-agriculture-1.md` → id `book-agriculture-1`). Used for cross-references (`related_publications`).
- **Dates** accept either `YYYY` (year only, for older items where exact date is unknown) or `YYYY-MM-DD`.
- **Array fields** with no values default to `[]`; do not omit the key if downstream code expects it (though Zod `.default([])` makes them safe).
- **Markdown body** of a content file is currently unused — full text lives in `body_bn` / `body_en` frontmatter so both languages live in one entry. Body can be repurposed later if we move long-form content out of frontmatter.

## Collection: `publications`

Books, newspaper articles, blog posts, and journal articles. Files live under `src/content/publications/*.md`.

| Field            | Type                                                   | Required | Notes                                                       |
|------------------|--------------------------------------------------------|----------|-------------------------------------------------------------|
| `title_bn`       | string                                                 | yes      | Bengali title                                               |
| `title_en`       | string                                                 | yes      | English title                                               |
| `type`           | `book` \| `newspaper_article` \| `blog_post` \| `journal_article` | yes      |                                                             |
| `language`       | `bn` \| `en` \| `mixed`                                | yes      | Primary language of the source                              |
| `category`       | `agriculture` \| `nature_environment` \| `literature` \| `other` | yes      |                                                             |
| `date_published` | `YYYY` \| `YYYY-MM-DD` \| Date                         | yes      | Year only if exact date unknown                             |
| `venue`          | string                                                 | no       | Publisher / newspaper / journal                             |
| `venue_url`      | URL                                                    | no       |                                                             |
| `summary_bn`     | string                                                 | no       | 1–3 sentences, shown in listings                            |
| `summary_en`     | string                                                 | no       | 1–3 sentences, shown in listings                            |
| `body_bn`        | string                                                 | no       | Full text, multiline YAML (`\|`)                            |
| `body_en`        | string                                                 | no       | Full text                                                   |
| `scan_url`       | string                                                 | no       | Relative path or URL to PDF / scan                          |
| `external_url`   | URL                                                    | no       | Original online publication                                 |
| `cover_image`    | string                                                 | no       | For books                                                   |
| `tags`           | `string[]`                                             | no       | Defaults to `[]`. Free-form, cross-cutting                  |
| `featured`       | boolean                                                | no       | Defaults to `false`. Surfaces on homepage                   |

## Collection: `arboretum`

Plants, insects, spiders observed in the arboretum. Files live under `src/content/arboretum/*.md`.

| Field                   | Type                              | Required | Notes                                                |
|-------------------------|-----------------------------------|----------|------------------------------------------------------|
| `kind`                  | `plant` \| `insect` \| `spider`   | yes      |                                                      |
| `common_name_bn`        | string                            | yes      |                                                      |
| `common_name_en`        | string                            | yes      |                                                      |
| `scientific_name`       | string                            | yes      | Latin binomial                                       |
| `family`                | string                            | no       |                                                      |
| `photos`                | `Photo[]`                         | no       | Defaults to `[]`. See Photo schema below             |
| `description_bn`        | string                            | no       |                                                      |
| `description_en`        | string                            | no       |                                                      |
| `notes_bn`              | string                            | no       | Personal field observations — the distinctive content |
| `notes_en`              | string                            | no       |                                                      |
| `first_observed_date`   | `YYYY` \| `YYYY-MM-DD` \| Date    | no       |                                                      |
| `location_in_arboretum` | string                            | no       |                                                      |
| `related_publications`  | `string[]`                        | no       | Publication `id`s. Cross-link to species writings    |

### Photo

```yaml
- src: "path/or/url"
  caption_bn: "..."   # optional
  caption_en: "..."   # optional
```

## Collection: `biography` (singleton)

Currently a single file: `src/content/biography/roy.md`. Stored as a collection (not a global data file) so downstream code uses one consistent loader.

| Field           | Type                            | Required | Notes                                              |
|-----------------|---------------------------------|----------|----------------------------------------------------|
| `bio_short_bn`  | string                          | yes      | 1 sentence                                         |
| `bio_short_en`  | string                          | yes      | 1 sentence                                         |
| `bio_long_bn`   | string                          | no       | Multiline                                          |
| `bio_long_en`   | string                          | no       | Multiline                                          |
| `timeline`      | `TimelineEvent[]`               | no       | Defaults to `[]`                                   |
| `affiliations`  | `string[]`                      | no       | Defaults to `[]`                                   |
| `awards`        | `Award[]`                       | no       | Defaults to `[]`                                   |
| `photos`        | `Photo[]`                       | no       | Defaults to `[]`                                   |
| `contact_email` | email                           | no       |                                                    |

### TimelineEvent

```yaml
- year: 1995
  event_bn: "..."
  event_en: "..."
```

### Award

```yaml
- year: 2008          # optional
  name_bn: "..."
  name_en: "..."
```

## Validation

`npm run build` runs `astro:content` sync, which validates every Markdown frontmatter against the corresponding Zod schema. A schema violation aborts the build with a precise error pointing to the offending file and field.
