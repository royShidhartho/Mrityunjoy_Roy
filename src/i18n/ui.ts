export const languages = {
  en: 'English',
  bn: 'বাংলা',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';

export const ui = {
  en: {
    'site.title': 'Portfolio',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.publications': 'Publications',
    'nav.arboretum': "Roy's Arboretum",
    'nav.blog': 'Blog',
    'nav.search': 'Search',
    'toggle.language': 'বাংলা',
  },
  bn: {
    'site.title': 'পোর্টফোলিও',
    'nav.home': 'প্রচ্ছদ',
    'nav.about': 'পরিচিতি',
    'nav.publications': 'প্রকাশনা',
    'nav.arboretum': 'রায়ের বৃক্ষশালা',
    'nav.blog': 'ব্লগ',
    'nav.search': 'অনুসন্ধান',
    'toggle.language': 'English',
  },
} as const;

export function useTranslations(locale: Locale) {
  return function t(key: keyof (typeof ui)['en']): string {
    return ui[locale][key] ?? ui[defaultLocale][key];
  };
}

function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (base && pathname.startsWith(base)) {
    return pathname.slice(base.length) || '/';
  }
  return pathname;
}

export function getLocaleFromUrl(url: URL): Locale {
  const path = stripBase(url.pathname);
  const [, locale] = path.split('/');
  if (locale in languages) return locale as Locale;
  return defaultLocale;
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const clean = stripBase(path);
  const segments = clean.split('/').filter(Boolean);
  if (segments[0] in languages) {
    segments[0] = locale;
  } else {
    segments.unshift(locale);
  }
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + '/' + segments.join('/');
}
