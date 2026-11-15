# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Website for **Sangam Hardware** (संगम हार्डवेयर), a hardware, plumbing, sanitary and paint shop in Mopti Bazar, Bhojpur, Bihar. The client is the proprietor, Dharmendra Kumar.

- `website/` holds the actual site: Astro 7 + Tailwind 4, fully static, deployed to Cloudflare Pages.
- `google-maps-data/` is source material scraped from the shop's Google Maps listing (facts in `BUSINESS-INFO.md`, photos). It is not part of the build; selected photos were copied into `website/src/assets/`.
- `CLIENT-QUESTIONS.md` holds the client questionnaire. `IMAGE-PROMPTS.md` holds AI-image prompts and the file names/folders where generated images go.

## Hard constraints from the client

- **Zero running cost.** Free tiers only (Cloudflare Pages, GitHub Actions, a Google Sheet). No paid services, no backend; orders go out as a prefilled WhatsApp message.
- **Audience:** rural Bihar users on cheap phones and slow networks. Hindi first, big tap targets, minimal JS, every image through `astro:assets` (`<Image>`).
- **Languages:** Hindi `/`, Bhojpuri `/bho/`, English `/en/`.
- Product prices in `products.csv` are **placeholders** the owner will correct. Reviews are real Google reviews; Hindi versions are translations and are labelled as such. Don't add AI-generated photos of the owner or of customers.

## Commands (run inside `website/`)

```sh
npm install
astro dev --background        # dev server on :4321; manage with astro dev stop|status|logs
npm run build                 # static output in dist/
npx astro preview             # serve the built dist/
npm test                      # node:test on src/lib/csv.test.ts
node --test --test-name-pattern="quoted" src/lib/csv.test.ts   # single test
```

No linter is configured. Tests run on Node's built-in TypeScript stripping (Node ≥ 22.18), with no test framework.

## Architecture

**One page component, three thin routes.** `src/pages/index.astro`, `bho/index.astro` and `en/index.astro` only render `<Base lang><Home lang/></Base>`. All sections live in `src/components/Home.astro`; head/SEO lives in `src/layouts/Base.astro`.

**Text comes from `src/i18n.ts`.** The `hi` dictionary is the base. `bho` and `en` are written as `{ ...hi, ... }`, so a key missing from them silently falls back to Hindi. When adding a string, add it to all three. `langPath` and `langLabel` drive the language switcher and the hreflang links.

**Shop facts come from `src/data/shop.ts`.** Phones, address, hours, geo, delivery radius, areas and reviews live there. Three outputs read them: the page, the JSON-LD (`HardwareStore` + `FAQPage`) in `Base.astro`, and the AI fact sheet `src/pages/llms.txt.ts`. Change a fact here once and all three update. `SITE_URL` is also imported by `astro.config.mjs`, but `public/robots.txt` and `public/sitemap.xml` hardcode the domain and must be updated by hand.

**Products are read at build time.** `src/lib/products.ts` → `loadProducts()` fetches a published Google Sheet CSV when the `SHEET_CSV_URL` env var is set, and falls back to `src/data/products.csv` if that var is missing or the fetch fails. The CSV header (`category,name_hi,name_en,brand,price,unit`) is a contract with the owner's sheet, so don't rename columns. `category` values must match the keys of `cats` in `i18n.ts` and the `emoji` map in `Home.astro`. `unit` values must match the `units` dicts. An empty `price` renders as "ask for price".

**Category images are picked up by file name.** Put `src/assets/categories/<category>.{jpg,png,webp}` in place and `import.meta.glob` in `Home.astro` uses it; without one, the tile shows an emoji.

**Client-side JS is one `<script>` at the bottom of `Home.astro`.** It sets the live open/closed status in the top strip (IST, from `shop.hours`), runs the category filter (`data-filter` / `data-cat`, toggling `hidden`), the paint-swatch wall preview, and the order list. The order list is an in-memory `Map` rendered into a native `<dialog>` (a bottom sheet on phones), and sending it builds a `wa.me` link. Per-language strings reach the script through `data-*` attributes, because Astro bundles the script and it can't read frontmatter variables.

**Styling** is Tailwind 4 with tokens in `src/styles/global.css` `@theme`. The palette comes from the shop's own signboard: `brick` red, `marigold`, `indigo`, `leaf` (WhatsApp), on `paper` / `paper-2` with `ink` / `ink-soft` text and `line` borders. Fonts are Eczar (`font-display`, headings) and Anek Devanagari (body), both with Devanagari. Keep heading line-height at 1.3 and avoid tight tracking, or Hindi matras collide between lines. Icons come from `src/components/Icon.astro`, which inlines `lucide-static` SVGs at build time (`<Icon name="phone" />`); don't use emoji as icons. The deliberate look is a printed rate list (dotted leaders, ruled rows), not generic cards, gradients or blurred blobs. Animations are CSS-only: scroll reveal uses `animation-timeline: view()` behind `@supports`, and everything is disabled under `prefers-reduced-motion`.

## Deployment

The Cloudflare Pages project is connected to this repo with **root directory `website`**, build `npm run build`, output `dist`. Every push redeploys. `.github/workflows/refresh-prices.yml` (at the repo root) POSTs to the `CF_DEPLOY_HOOK` secret every 6 hours, so the owner's Google Sheet edits go live without a commit. `website/README.md` has the full setup and the post-launch local-SEO checklist.
