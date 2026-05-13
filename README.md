# Dad Portfolio

Bilingual (Bengali / English) archive and publication site for an agricultural researcher and Bengali writer.

## Stack

- **Framework:** [Astro](https://astro.build/) v6 with TypeScript (strict)
- **Content:** Markdown + frontmatter in Git
- **CMS:** [Decap CMS](https://decapcms.org/) (planned — Phase 6)
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/) (planned — Phase 1)
- **Search:** [Pagefind](https://pagefind.app/) (planned — Phase 5)

See `WEBSITE_PLAN.md` for the full specification and `PHASES.md` for the build checklist.

## Local development

```bash
npm install
npm run dev        # start dev server at http://localhost:4321
npm run build      # build static site to dist/
npm run preview    # preview production build locally
```

## Project structure

```
src/
  i18n/ui.ts             # translation strings + locale utilities
  layouts/BaseLayout.astro # shared HTML shell with nav + language toggle
  pages/
    index.astro          # root redirect → /en
    en/                  # English pages
    bn/                  # Bengali pages
inventory/               # Phase 0 inventory spreadsheets (CSV + YAML)
assets/placeholders/     # placeholder images/PDFs for development
```

## i18n

Both locales are URL-prefixed: `/en/...` and `/bn/...`. The root `/` redirects to `/en`. The language toggle on every page links to the equivalent page in the other locale.

Configuration: `astro.config.mjs` → `i18n` block. Translation strings: `src/i18n/ui.ts`.
