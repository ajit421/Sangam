// Single source of truth for shop facts. Page text, SEO schema and llms.txt all read from here.
export const SITE_URL = 'https://sangamhardware.pages.dev';

export const shop = {
  name: 'Sangam Hardware',
  nameHi: 'संगम हार्डवेयर',
  owner: { en: 'Dharmendra Kumar', hi: 'धर्मेन्द्र कुमार' },
  phones: ['9973565331', '7903476101'],
  whatsapp: '919973565331',
  address: {
    street: 'Opposite MDR Mall, Mela Mod, Main Road',
    streetHi: 'MDR मॉल के सामने, मेला मोड़, मेन रोड',
    locality: 'Mopti Bazar',
    localityHi: 'मोपती बाजार',
    district: 'Bhojpur',
    districtHi: 'भोजपुर',
    region: 'Bihar',
    regionHi: 'बिहार',
    pin: '802222',
  },
  geo: { lat: 25.2564052, lng: 84.4986037 },
  hours: { open: '09:00', close: '18:00' }, // open 7 days; at night only for urgent or bulk orders on call
  deliveryKm: 20,
  yearsTrust: 30,
  rating: { value: 5.0, count: 8 },
  // shortcut: only places confirmed so far; add the client's delivery villages here, they help local search
  areas: ['Mopti Bazar', 'Sikarhatta', 'Bhojpur'],
  areasHi: ['मोपती बाजार', 'सिकरहट्टा', 'भोजपुर'],
  brands: ['Asian Paints', 'Berger', 'Parryware', 'Hindware', 'Supreme', 'Prince'],
  mapsUrl: 'https://maps.google.com/?cid=4184313526596026266',
  // shortcut: opens the Maps listing; replace with the owner's direct review link (Business Profile → "Ask for reviews", g.page/r/…/review)
  reviewUrl: 'https://maps.google.com/?cid=4184313526596026266',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=25.2564052,84.4986037',
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d361.7818692053405!2d84.4984899!3d25.2563939!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398d6db97f75f6e5%3A0x3a11aafba59e3f9a!2sSangam%20Hardware%20Mopti!5e1!3m2!1sen!2sin!4v1794741284496!5m2!1sen!2sin',
};

// Google reviews (5★ each). Hindi lines are translations, marked as such on the page.
export const reviews = [
  { name: 'Nikhil Singh', en: 'They have branded, quality products. I bought an A1 quality motor. Good products at affordable rates.', hi: 'यहाँ ब्रांडेड और अच्छी क्वालिटी का सामान है। मैंने A1 क्वालिटी की मोटर ली। सही रेट पर अच्छा सामान।' },
  { name: 'Suresh Darling', en: 'Excellent service, the automatic Berger machine produces perfect shades, and the staff is very helpful!', hi: 'बेहतरीन सर्विस, Berger की ऑटोमैटिक मशीन से एकदम सही रंग बनता है, और स्टाफ़ बहुत मददगार है!' },
  { name: 'Anurag Kumar', en: 'Very nice person and a good seller. Cheaper prices compared to any other seller.', hi: 'बहुत अच्छे इंसान और अच्छे दुकानदार। दूसरी दुकानों से सस्ता रेट।' },
  { name: 'Priyanka Kumari', en: 'Goods are available at the lowest rates in Mopti.', hi: 'मोपती में सबसे कम रेट में सामान मिलता है।' },
  { name: 'Sharwan Kumar', en: 'The cheapest stuff is available here.', hi: 'यहाँ सबसे सस्ता सामान मिलता है।' },
  { name: 'Vikash Singh', en: 'Best quality.', hi: 'सबसे अच्छी क्वालिटी।' },
  { name: 'RAMJI KUMAR SINGH', en: 'The cheapest stuff in the market.', hi: 'बाज़ार में सबसे सस्ता सामान।' },
  { name: 'golu khan', en: 'Good seller.', hi: 'अच्छे दुकानदार।' },
];
