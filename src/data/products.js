/**
 * Catalogue rows. `image` follows the same convention as `data/media.js` —
 * null falls back to the drawn artwork, a path in `public/` replaces it.
 *
 * Prices are numbers so the cart can total them; render them through
 * `formatINR` from `lib/format.js` rather than hard-coding formatted strings.
 *
 * The three Load More rows reuse the same three photographs; swap in their own
 * files here when they exist rather than touching the Shop page.
 */
export const PRODUCTS = [
  {
    id: 'iphone-14-pro',
    brand: 'Apple',
    name: 'iPhone 14 Pro',
    spec: '256GB | Deep Purple',
    priceValue: 85999,
    mrpValue: 129900,
    emi: 'EMI from ₹3,583/mo',
    rating: '4.8',
    condition: { label: 'Like New', tone: 'green' },
    art: 'back',
    image: '/iphone_14.png',
  },
  {
    id: 'galaxy-s23-ultra',
    brand: 'Samsung',
    name: 'Galaxy S23 Ultra',
    spec: '512GB | Phantom Black',
    priceValue: 79499,
    mrpValue: 124999,
    emi: 'EMI from ₹3,312/mo',
    rating: '4.7',
    condition: { label: 'Excellent', tone: 'blue' },
    art: 'screen',
    image: '/samsung_s23.png',
  },
  {
    id: 'pixel-7-pro',
    brand: 'Google',
    name: 'Pixel 7 Pro',
    spec: '128GB | Obsidian',
    priceValue: 45999,
    mrpValue: 84999,
    emi: 'EMI from ₹1,916/mo',
    rating: '4.5',
    condition: { label: 'Good', tone: 'amber' },
    art: 'back',
    image: '/pixel_7_pro.png',
  },
  {
    id: 'iphone-13',
    brand: 'Apple',
    name: 'iPhone 13',
    spec: '128GB | Midnight',
    priceValue: 52999,
    mrpValue: 79900,
    emi: 'EMI from ₹2,208/mo',
    rating: '4.6',
    condition: { label: 'Excellent', tone: 'blue' },
    art: 'screen',
    image: '/iphone_14.png',
  },
  {
    id: 'oneplus-11',
    brand: 'OnePlus',
    name: 'OnePlus 11 5G',
    spec: '256GB | Titan Black',
    priceValue: 38499,
    mrpValue: 61999,
    emi: 'EMI from ₹1,604/mo',
    rating: '4.4',
    condition: { label: 'Like New', tone: 'green' },
    art: 'back',
    image: '/pixel_7_pro.png',
  },
  {
    id: 'galaxy-s22',
    brand: 'Samsung',
    name: 'Galaxy S22',
    spec: '128GB | Bora Purple',
    priceValue: 34999,
    mrpValue: 72999,
    emi: 'EMI from ₹1,458/mo',
    rating: '4.3',
    condition: { label: 'Good', tone: 'amber' },
    art: 'screen',
    image: '/samsung_s23.png',
  },
]

export const CONDITION_TONES = {
  green: 'bg-emerald-400/12 text-emerald-300 ring-emerald-400/25',
  blue: 'bg-blue-400/12 text-blue-300 ring-blue-400/25',
  amber: 'bg-amber-400/12 text-amber-300 ring-amber-400/25',
}
