import type { Locale } from '../i18n/ui';

export function pick(locale: Locale, bn?: string, en?: string, fallback = ''): string {
  if (locale === 'bn') return bn || en || fallback;
  return en || bn || fallback;
}

export function formatDate(date: string | Date, locale: Locale): string {
  if (typeof date === 'string' && /^\d{4}$/.test(date)) {
    return date;
  }
  const d = date instanceof Date ? date : new Date(date);
  if (isNaN(d.getTime())) return String(date);
  return new Intl.DateTimeFormat(locale === 'bn' ? 'bn-IN' : 'en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
}

export function dateForSort(date: string | Date): number {
  if (date instanceof Date) return date.getTime();
  if (/^\d{4}$/.test(date)) return new Date(`${date}-01-01`).getTime();
  return new Date(date).getTime();
}

export function localizedPath(base: string, segments: string[]): string {
  const root = base.replace(/\/$/, '');
  return root + '/' + segments.filter(Boolean).join('/');
}
