import { parseCsv } from './csv.ts';

export type Product = {
  category: string; name_hi: string; name_en: string; brand: string;
  price: number | null; unit: string;
};

// Turns the owner's CSV (Google Sheet or products.csv) into products. Forgiving on purpose: the owner edits it on a phone,
// so case/space slips in category or unit, "₹1,250" style prices and blank rows must not break or hide anything.
export function toProducts(text: string): Product[] {
  return parseCsv(text)
    .filter((r) => r.name_hi || r.name_en)
    .map((r) => {
      const n = Number(String(r.price ?? '').replace(/[₹,\s]/g, ''));
      return {
        category: (r.category ?? '').trim().toLowerCase(),
        name_hi: r.name_hi || r.name_en,
        name_en: r.name_en || r.name_hi,
        brand: r.brand ?? '',
        price: r.price && n > 0 ? n : null,
        unit: (r.unit ?? '').trim().toLowerCase() || 'piece',
      };
    });
}
