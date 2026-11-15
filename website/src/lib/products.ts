import { toProducts, type Product } from './catalog';
import localCsv from '../data/products.csv?raw';

export type { Product };

// The owner edits a Google Sheet (File → Share → Publish to web → CSV) and its link goes in SHEET_CSV_URL.
// Without it, or if the sheet can't be fetched or is empty, the build uses src/data/products.csv.
// Fetched once per build so all pages and llms.txt show the same prices even if the sheet changes mid-build.
let cached: Promise<Product[]> | undefined;
export const loadProducts = () => (cached ??= load());

async function load(): Promise<Product[]> {
  const url = import.meta.env.SHEET_CSV_URL;
  if (url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const sheet = toProducts(await res.text());
      if (sheet.length) return sheet;
      throw new Error('sheet has no products (check the header row)');
    } catch (e) {
      console.warn(`[products] Google Sheet not used (${e}); falling back to local products.csv`);
    }
  }
  return toProducts(localCsv);
}
