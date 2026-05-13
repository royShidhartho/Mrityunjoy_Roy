import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const publicationType = z.enum(['book', 'newspaper_article', 'blog_post', 'journal_article']);
const language = z.enum(['bn', 'en', 'mixed']);
const category = z.enum(['agriculture', 'nature_environment', 'literature', 'other']);
const arboretumKind = z.enum(['plant', 'insect', 'spider']);

const dateOrYear = z.union([
  z.string().regex(/^\d{4}$/, 'Year must be 4 digits'),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be YYYY-MM-DD'),
  z.date(),
]);

const photo = z.object({
  src: z.string(),
  caption_bn: z.string().optional(),
  caption_en: z.string().optional(),
});

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    title_bn: z.string(),
    title_en: z.string(),
    type: publicationType,
    language: language,
    category: category,
    date_published: dateOrYear,
    venue: z.string().optional(),
    venue_url: z.string().url().optional(),
    summary_bn: z.string().optional(),
    summary_en: z.string().optional(),
    body_bn: z.string().optional(),
    body_en: z.string().optional(),
    scan_url: z.string().optional(),
    external_url: z.string().url().optional(),
    cover_image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const arboretum = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/arboretum' }),
  schema: z.object({
    kind: arboretumKind,
    common_name_bn: z.string(),
    common_name_en: z.string(),
    scientific_name: z.string(),
    family: z.string().optional(),
    photos: z.array(photo).default([]),
    description_bn: z.string().optional(),
    description_en: z.string().optional(),
    notes_bn: z.string().optional(),
    notes_en: z.string().optional(),
    first_observed_date: dateOrYear.optional(),
    location_in_arboretum: z.string().optional(),
    related_publications: z.array(z.string()).default([]),
  }),
});

const biography = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/biography' }),
  schema: z.object({
    bio_short_bn: z.string(),
    bio_short_en: z.string(),
    bio_long_bn: z.string().optional(),
    bio_long_en: z.string().optional(),
    timeline: z
      .array(
        z.object({
          year: z.number().int(),
          event_bn: z.string(),
          event_en: z.string(),
        })
      )
      .default([]),
    affiliations: z.array(z.string()).default([]),
    awards: z
      .array(
        z.object({
          year: z.number().int().optional(),
          name_bn: z.string(),
          name_en: z.string(),
        })
      )
      .default([]),
    photos: z.array(photo).default([]),
    contact_email: z.string().email().optional(),
  }),
});

export const collections = { publications, arboretum, biography };
