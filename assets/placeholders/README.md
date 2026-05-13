# Placeholder Assets

Stand-in files used during Phases 1–6 so layout and rendering can be developed before real material is collected. Every file here is replaced with real content in **Phase 7 — Bulk Content Migration** (see `PHASES.md`).

## Layout

```
assets/placeholders/
├── portrait/             # 3:4 portraits for the biography page (SVG)
├── book-covers/          # 2:3 book cover art (SVG)
├── book-pdfs/            # full-text book PDFs — 1-page placeholder, valid PDF/1.4
├── newspaper-scans/      # 4:5 scans of newspaper articles (SVG; real ones will be JPG/WebP)
└── arboretum/            # 4:3 species photos (SVG; real ones will be JPG/WebP)
```

## Per the user's intent

- **Newspaper articles** are represented by images (a scan of the printed article). The SVGs in `newspaper-scans/` stand in for those.
- **Books** are represented by PDFs. The PDFs in `book-pdfs/` are minimal one-page valid PDFs (open in Preview / browser PDF viewer) — they exist so the download link in the publication detail page works end-to-end during development.

## Why SVG for image placeholders

- Text-based, diff-friendly, version-controlled cleanly.
- Renders crisply at any size — won't trick us into thinking layout works at 800×800 when real photos will be 4000×3000.
- Each file labels itself with its filename, so a misrouted asset is visible immediately.

## Replacement workflow (Phase 7)

1. Replace each SVG/PDF with the real file at the **same relative path**, OR change extension and update the corresponding row in `inventory/publications.csv` / `inventory/arboretum.csv` / `inventory/biography.md`.
2. After replacement, rerun the build and spot-check that links and images resolve.
3. Delete this directory once every reference has migrated to a real-asset path.
