import { parseCsv } from './csv';
import localCsv from '../data/products.csv?raw';

export type Product = {
  category: string; name_hi: string; name_en: string; brand: string;
  price: number | null; unit: string;
};

// The owner edits a Google Sheet (File → Share → Publish to web → CSV) and its link goes in SHEET_CSV_URL.
// Without it, or if the sheet can't be fetched, the build uses src/data/products.csv.
export async function loadProducts(): Promise<Product[]> {
  let text = localCsv;
  const url = import.meta.env.SHEET_CSV_URL;
  if (url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      text = await res.text();
    } catch (e) {
      console.warn(`[products] Google Sheet fetch failed (${e}), using local products.csv`);
    }
  }
  return parseCsv(text)
    .filter((r) => r.name_hi || r.name_en)
    .map((r) => {
      const n = Number(String(r.price).replace(/[₹,\s]/g, ''));
      return {
        category: r.category, name_hi: r.name_hi || r.name_en, name_en: r.name_en || r.name_hi,
        brand: r.brand, price: r.price && n > 0 ? n : null, unit: r.unit || 'piece',
      };
    });
}
