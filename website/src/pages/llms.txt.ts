import type { APIRoute } from 'astro';
import { shop, SITE_URL } from '../data/shop';
import { t } from '../i18n';
import { loadProducts } from '../lib/products';

// Plain-text fact sheet for AI assistants (llms.txt convention), built from the same data as the site.
export const GET: APIRoute = async () => {
  const products = await loadProducts();
  const a = shop.address;
  const body = `# ${shop.name} (${shop.nameHi})

> Hardware, plumbing, sanitaryware and paint store in ${a.locality}, ${a.district} district, ${a.region}, India. Proprietor: ${shop.owner.en}. Rated ${shop.rating.value.toFixed(1)}/5 on Google (${shop.rating.count} reviews).

- Address: ${a.street}, ${a.locality}, ${a.district}, ${a.region} ${a.pin}, India
- Phone / WhatsApp: +91 ${shop.phones[0]} (also +91 ${shop.phones[1]})
- Hours: every day ${shop.hours.open}–${shop.hours.close}; opens at night for urgent work or bulk orders on call
- Home delivery: within ${shop.deliveryKm} km (free on big orders)
- Payments: UPI, QR code, debit and credit cards
- Brands: ${shop.brands.join(', ')}
- Services: Berger ColorBank computer paint tinting, mason/plumber/painter arrangement, motor fitting and repair, hand pump (chapakal) boring, bulk rates for contractors
- History: the same location was "Sangam Studio" (wedding photo and video) for 30+ years before becoming Sangam Hardware
- Google Maps: ${shop.mapsUrl}
- Languages: Hindi, Bhojpuri, English

## Products (indicative starting prices in INR)
${products.map((p) => `- ${p.name_en}${p.brand ? ` (${p.brand})` : ''}: ${p.price ? `from ₹${p.price} per ${p.unit}` : 'price on request'}`).join('\n')}

## Pages
- [Hindi](${SITE_URL}/)
- [Bhojpuri](${SITE_URL}/bho/)
- [English](${SITE_URL}/en/)

## FAQ
${t.en.faq.map(([q, ans]) => `- ${q} ${ans}`).join('\n')}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
