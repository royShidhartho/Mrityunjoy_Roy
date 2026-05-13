export const languages = {
  en: 'English',
  bn: 'বাংলা',
} as const;

export type Locale = keyof typeof languages;

export const defaultLocale: Locale = 'en';

export const ui = {
  en: {
    'site.title': 'Mrityunjoy Roy',
    'site.tagline': 'Field notes, essays, and a working archive',
    'site.footer.colophon': 'Set in Fraunces & Noto Serif Bengali. Built in the open.',
    'site.footer.archive': 'Archive',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.publications': 'Publications',
    'nav.arboretum': "Roy's Arboretum",
    'nav.blog': 'Blog',
    'nav.search': 'Search',
    'toggle.language': 'বাংলা',
    'home.featured': 'Featured',
    'home.recent': 'Recent publications',
    'home.explore': 'Explore',
    'home.sections.publications': 'All publications',
    'home.sections.arboretum': "Roy's Arboretum",
    'home.sections.blog': 'Blog',
    'home.sections.about': 'About',
    'publications.title': 'Publications',
    'publications.empty': 'No publications yet.',
    'publication.type': 'Type',
    'publication.category': 'Category',
    'publication.language': 'Language',
    'publication.venue': 'Venue',
    'publication.date': 'Date',
    'publication.tags': 'Tags',
    'publication.scan': 'Scan / PDF',
    'publication.external': 'External link',
    'publication.summary': 'Summary',
    'publication.body': 'Full text',
    'publication.back': '← Back to publications',
    'arboretum.title': "Roy's Arboretum",
    'arboretum.plants': 'Plants',
    'arboretum.insects': 'Insects',
    'arboretum.spiders': 'Spiders',
    'arboretum.empty': 'No entries yet.',
    'arboretum.scientific': 'Scientific name',
    'arboretum.family': 'Family',
    'arboretum.description': 'Description',
    'arboretum.notes': 'Field notes',
    'arboretum.firstObserved': 'First observed',
    'arboretum.location': 'Location in arboretum',
    'arboretum.related': 'Related publications',
    'arboretum.back': '← Back to arboretum',
    'blog.title': 'Blog',
    'blog.empty': 'No posts yet.',
    'blog.back': '← Back to blog',
    'about.title': 'About',
    'about.timeline': 'Timeline',
    'about.affiliations': 'Affiliations',
    'about.awards': 'Awards',
    'about.photos': 'Photos',
    'about.contact': 'Contact',
    'type.book': 'Book',
    'type.newspaper_article': 'Newspaper article',
    'type.blog_post': 'Blog post',
    'type.journal_article': 'Journal article',
    'category.agriculture': 'Agriculture',
    'category.nature_environment': 'Nature & Environment',
    'category.literature': 'Literature',
    'category.other': 'Other',
    'language.bn': 'Bengali',
    'language.en': 'English',
    'language.mixed': 'Bilingual',
    'notfound.title': 'Page not found',
    'notfound.message': 'The page you asked for does not exist.',
    'notfound.home': 'Go to homepage',
  },
  bn: {
    'site.title': 'মৃত্যুঞ্জয় রায়',
    'site.tagline': 'মাঠ পর্যবেক্ষণ, প্রবন্ধ ও কর্মরত আর্কাইভ',
    'site.footer.colophon': 'Fraunces ও Noto Serif Bengali ফন্টে রচিত। উন্মুক্ত উৎসে নির্মিত।',
    'site.footer.archive': 'আর্কাইভ',
    'nav.home': 'প্রচ্ছদ',
    'nav.about': 'পরিচিতি',
    'nav.publications': 'প্রকাশনা',
    'nav.arboretum': 'রায়ের বৃক্ষশালা',
    'nav.blog': 'ব্লগ',
    'nav.search': 'অনুসন্ধান',
    'toggle.language': 'English',
    'home.featured': 'নির্বাচিত',
    'home.recent': 'সাম্প্রতিক প্রকাশনা',
    'home.explore': 'অন্বেষণ',
    'home.sections.publications': 'সকল প্রকাশনা',
    'home.sections.arboretum': 'রায়ের বৃক্ষশালা',
    'home.sections.blog': 'ব্লগ',
    'home.sections.about': 'পরিচিতি',
    'publications.title': 'প্রকাশনা',
    'publications.empty': 'এখনো কোনো প্রকাশনা নেই।',
    'publication.type': 'ধরন',
    'publication.category': 'বিভাগ',
    'publication.language': 'ভাষা',
    'publication.venue': 'প্রকাশস্থল',
    'publication.date': 'তারিখ',
    'publication.tags': 'ট্যাগ',
    'publication.scan': 'স্ক্যান / পিডিএফ',
    'publication.external': 'বাইরের লিংক',
    'publication.summary': 'সারাংশ',
    'publication.body': 'সম্পূর্ণ পাঠ্য',
    'publication.back': '← প্রকাশনায় ফিরে যান',
    'arboretum.title': 'রায়ের বৃক্ষশালা',
    'arboretum.plants': 'উদ্ভিদ',
    'arboretum.insects': 'পোকা',
    'arboretum.spiders': 'মাকড়সা',
    'arboretum.empty': 'এখনো কোনো ভুক্তি নেই।',
    'arboretum.scientific': 'বৈজ্ঞানিক নাম',
    'arboretum.family': 'পরিবার',
    'arboretum.description': 'বিবরণ',
    'arboretum.notes': 'মাঠ পর্যবেক্ষণ',
    'arboretum.firstObserved': 'প্রথম পর্যবেক্ষণ',
    'arboretum.location': 'বৃক্ষশালায় অবস্থান',
    'arboretum.related': 'সম্পর্কিত প্রকাশনা',
    'arboretum.back': '← বৃক্ষশালায় ফিরে যান',
    'blog.title': 'ব্লগ',
    'blog.empty': 'এখনো কোনো পোস্ট নেই।',
    'blog.back': '← ব্লগে ফিরে যান',
    'about.title': 'পরিচিতি',
    'about.timeline': 'কালপঞ্জি',
    'about.affiliations': 'সংশ্লিষ্টতা',
    'about.awards': 'পুরস্কার',
    'about.photos': 'ছবি',
    'about.contact': 'যোগাযোগ',
    'type.book': 'বই',
    'type.newspaper_article': 'সংবাদপত্রের প্রবন্ধ',
    'type.blog_post': 'ব্লগ পোস্ট',
    'type.journal_article': 'জার্নাল প্রবন্ধ',
    'category.agriculture': 'কৃষি',
    'category.nature_environment': 'প্রকৃতি ও পরিবেশ',
    'category.literature': 'সাহিত্য',
    'category.other': 'অন্যান্য',
    'language.bn': 'বাংলা',
    'language.en': 'ইংরেজি',
    'language.mixed': 'দ্বিভাষিক',
    'notfound.title': 'পৃষ্ঠা পাওয়া যায়নি',
    'notfound.message': 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা নেই।',
    'notfound.home': 'প্রচ্ছদে যান',
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
