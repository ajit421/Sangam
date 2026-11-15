# Sangam Hardware website

Static site built with Astro 7 and Tailwind 4, hosted free on Cloudflare Pages. It has three languages: Hindi `/`, Bhojpuri `/bho/` and English `/en/`.

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
npm test         # CSV parser tests
```

## Where things live
| What | File |
|---|---|
| Shop facts (phones, address, hours, areas, reviews) | `src/data/shop.ts` |
| Page text in all 3 languages | `src/i18n.ts` |
| Products and rates (fallback copy) | `src/data/products.csv` |
| Page sections | `src/components/Home.astro` |
| SEO meta and Google structured data | `src/layouts/Base.astro` |
| Fact sheet for AI assistants | `src/pages/llms.txt.ts` → `/llms.txt` |
| Category images (drop in `<category>.jpg`) | `src/assets/categories/` |

Category names: `pipes, tanks, pumps, sanitary, taps, tiles, paints`. Units: `piece, length, litre, kg, sqft, bag, set`. Leave `price` empty to show "ask for price".

## Deploy for ₹0 (Cloudflare Pages)
1. Push this `website/` folder to a GitHub repo.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo.
   Build command: `npm run build`. Output directory: `dist`. Project name: `sangamhardware` (gives `sangamhardware.pages.dev`).
   If that name is taken, change `SITE_URL` in `src/data/shop.ts` and the URLs in `public/robots.txt` and `public/sitemap.xml`.
3. Every push to GitHub redeploys automatically.

## Owner updates prices from his phone (Google Sheet)
1. Import `src/data/products.csv` into a new Google Sheet in the owner's Google account. Keep the header row exactly as it is.
2. In the Sheet: File → Share → Publish to web → choose the sheet → **CSV** → Publish. Copy the link.
3. In Cloudflare Pages → Settings → Variables, add `SHEET_CSV_URL` = that link.
4. Auto-refresh: Cloudflare Pages → Settings → Builds → Deploy hooks → create one. Add its URL to GitHub repo → Settings → Secrets → Actions as `CF_DEPLOY_HOOK`. `.github/workflows/refresh-prices.yml` then rebuilds the site every 6 hours, so the owner's changes go live within 6 hours.

The owner just edits the Sheet in the Google Sheets app. If the Sheet ever fails to load, the build falls back to `products.csv`, so the site never breaks.

## Getting found on Google, Maps and AI tools (after launch)
1. **Google Business Profile** (owner's phone): add the website link, set hours to 9 AM–6 PM, add the categories Paint store, Plumbing supply store and Bathroom supply store, upload new photos every month, and reply to every review.
2. **Reviews:** print a QR card for the counter that links to the Maps review page. Steady new reviews matter most for Maps ranking.
3. **Google Search Console:** add `https://sangamhardware.pages.dev`, submit `sitemap.xml`. This needs an email ID.
4. **Same name, address and phone everywhere:** also list the shop free on Justdial, IndiaMART and Bing Places.
5. AI assistants read the page text, the structured data, `/llms.txt` and the Maps reviews. Keep all of them accurate.
