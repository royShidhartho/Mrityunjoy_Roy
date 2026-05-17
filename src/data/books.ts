/**
 * Book covers — placeholder manifest.
 *
 * Titles are romanized from the inventory filenames in
 * `inventory/book_cover_/`. They are placeholders; replace `title_en` /
 * `title_bn`, add `year`, `publisher`, `summary_*` and `buy_url` as the
 * real metadata becomes available. Order is the original inventory
 * numbering (`index`). A few near-duplicate scans from the inventory
 * were dropped to avoid double-tiles; see comments below.
 *
 * Image paths are relative to `/public/` and are joined with
 * `import.meta.env.BASE_URL` at render time.
 */

export interface BookCover {
  /** Original inventory number — sort key. */
  index: number;
  /** Path under /public/ without leading slash. */
  src: string;
  /** Placeholder English title (romanized). Replace when real titles arrive. */
  title_en: string;
  /** Optional Bengali title. Empty for now; add when real titles arrive. */
  title_bn?: string;
}

export const books: BookCover[] = [
  { index: 1,  src: 'assets/uploads/books/01. Sabjeer Pokamakor-01.jpg',          title_en: 'Sabjeer Pokamakor' },
  { index: 2,  src: 'assets/uploads/books/02. Hybrid sabji chash.jpg',            title_en: 'Hybrid Sabji Chash' },
  { index: 3,  src: 'assets/uploads/books/03. Baromas sabji chash 1.jpg',         title_en: 'Baromas Sabji Chash' },
  { index: 4,  src: 'assets/uploads/books/04. Sabuj Pan.jpg',                     title_en: 'Sabuj Pan' },
  { index: 5,  src: 'assets/uploads/books/05. Oushadi Gach.jpg',                  title_en: 'Oushadi Gach' },
  { index: 6,  src: 'assets/uploads/books/06. Pollibromon 2.jpg',                 title_en: 'Pollibromon' },
  { index: 7,  src: 'assets/uploads/books/07. Chade bagan 2.jpg',                 title_en: 'Chade Bagan' },
  { index: 8,  src: 'assets/uploads/books/08. Shaksabjir Rogh.jpg',               title_en: 'Shaksabjir Rogh' },
  { index: 9,  src: 'assets/uploads/books/09. Faler roge.jpg',                    title_en: 'Faler Roge' },
  { index: 10, src: 'assets/uploads/books/10. Upakulio Krishi.jpg',               title_en: 'Upakulio Krishi' },
  { index: 11, src: 'assets/uploads/books/11. Goru Palon.jpg',                    title_en: 'Goru Palon' },
  { index: 12, src: 'assets/uploads/books/12. Pukure Mas Chash.jpg',              title_en: 'Pukure Mas Chash' },
  { index: 13, src: 'assets/uploads/books/13. Mashlar Chash.jpg',                 title_en: 'Mashlar Chash' },
  { index: 14, src: 'assets/uploads/books/14. Fol.jpg',                           title_en: 'Fol' },
  { index: 15, src: 'assets/uploads/books/15. Baro Mash Fol Production.jpg',      title_en: 'Baro Mash Fol Production' },
  { index: 16, src: 'assets/uploads/books/16. Math Fosheler Chashabad.jpg',       title_en: 'Math Fosheler Chashabad' },
  { index: 17, src: 'assets/uploads/books/17. Foler Shamnnitay Balai Babosthapona.jpg', title_en: 'Foler Shamannitay Balai Babosthapona' },
  { index: 18, src: 'assets/uploads/books/18. Poultry palon.jpg',                 title_en: 'Poultry Palon' },
  { index: 19, src: 'assets/uploads/books/19. Dhaner Rogh.jpg',                   title_en: 'Dhaner Rogh' },
  { index: 20, src: 'assets/uploads/books/20. Krishi shikkha 01.jpg',             title_en: 'Krishi Shikkha' },
  // 21 and 23 are absent from the inventory.
  { index: 22, src: 'assets/uploads/books/22. Vashoman Dhape Fashol Chash.jpg',   title_en: 'Vashoman Dhape Fashol Chash' },
  { index: 24, src: 'assets/uploads/books/24. Shak sabji chash.jpg',              title_en: 'Shak Sabji Chash' },
  { index: 25, src: 'assets/uploads/books/25. Pahari Foshol.jpg',                 title_en: 'Pahari Foshol' },
  { index: 26, src: 'assets/uploads/books/26. palli Vromon.jpg',                  title_en: 'Palli Vromon' },
  { index: 27, src: 'assets/uploads/books/27. Pranider mojar katha.jpg',          title_en: 'Pranider Mojar Katha' },
  { index: 28, src: 'assets/uploads/books/28. Roof Garden.jpg',                   title_en: 'Roof Garden' },
  { index: 29, src: 'assets/uploads/books/29. Basotbari bagan.jpg',               title_en: 'Basotbari Bagan' },
  { index: 30, src: 'assets/uploads/books/30. Foler roge 2013.jpg',               title_en: 'Foler Roge (2013)' },
  // Inventory also has "31. Pan supari chash 1.jpg" — assumed duplicate scan, skipped.
  { index: 31, src: 'assets/uploads/books/31. Pan supari chash.jpg',              title_en: 'Pan Supari Chash' },
  { index: 32, src: 'assets/uploads/books/32. FUl Lota.jpg',                      title_en: 'Ful Lota' },
  // Inventory also has "33. Tushartirtho.jpg" — duplicate spelling, skipped.
  { index: 33, src: 'assets/uploads/books/33. Tushar Tirtho.jpg',                 title_en: 'Tushar Tirtho' },
  { index: 34, src: 'assets/uploads/books/34. Handaramer keccha.jpg',             title_en: 'Handaramer Keccha' },
  { index: 35, src: 'assets/uploads/books/35. Rupkathar Rupali Rajya.jpg',        title_en: 'Rupkathar Rupali Rajya' },
  { index: 36, src: 'assets/uploads/books/36. Moshlar Chash.jpg',                 title_en: 'Moshlar Chash' },
  { index: 37, src: 'assets/uploads/books/37. Alu Chash.jpg',                     title_en: 'Alu Chash' },
  { index: 38, src: 'assets/uploads/books/38. Sheeter sabji.jpg',                 title_en: 'Sheeter Sabji' },
  { index: 39, src: 'assets/uploads/books/39. Dhan Chash.jpg',                    title_en: 'Dhan Chash' },
  { index: 40, src: 'assets/uploads/books/40. First boy.jpg',                     title_en: 'First Boy' },
  { index: 41, src: 'assets/uploads/books/41. Kather Gash.jpg',                   title_en: 'Kather Gash' },
  { index: 42, src: 'assets/uploads/books/42. Lau Kumrar Rogh & Pokamakor.jpg',   title_en: 'Lau Kumrar Rogh & Pokamakor' },
  { index: 43, src: 'assets/uploads/books/43. Amer Rogh & Poka.jpg',              title_en: 'Amer Rogh & Poka' },
  { index: 44, src: 'assets/uploads/books/44. Baguner Rogh & Pokamakor.jpg',      title_en: 'Baguner Rogh & Pokamakor' },
  // Inventory also has "45.Desher matite Bideshi Fal. 2 jpg.jpg" — duplicate scan, skipped.
  { index: 45, src: 'assets/uploads/books/45. Desher matite Bideshi Fal.jpg',     title_en: 'Desher Matite Bideshi Fal' },
  { index: 46, src: 'assets/uploads/books/46. Denmark Din Ratri.jpg',             title_en: 'Denmark Din Ratri' },
  { index: 47, src: 'assets/uploads/books/47. Banglar Aytijjo.jpg',               title_en: 'Banglar Aytijjo' },
  { index: 48, src: 'assets/uploads/books/48. Deshi Foler Chash.jpg',             title_en: 'Deshi Foler Chash' },
  { index: 49, src: 'assets/uploads/books/49. Dhekhi Banglar Mukh.jpg',           title_en: 'Dhekhi Banglar Mukh' },
  { index: 50, src: 'assets/uploads/books/50. Parir Deshe.jpg',                   title_en: 'Parir Deshe' },
];

export function getBooks(): BookCover[] {
  return [...books].sort((a, b) => a.index - b.index);
}
