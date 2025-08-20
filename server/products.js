
const products = [
  {
    id: 'p1',
    name: 'Bamboo Toothbrush',
    brand: 'EcoSmile',
    price: 199,
    mrp: 249,
    currency: '₹',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1200&auto=format&fit=crop',
    description: 'Biodegradable handle, plant-based bristles. Plastic-free packaging.',
    longDescription: 'This eco-friendly toothbrush is crafted with a biodegradable bamboo handle and BPA-free, plant‑based bristles. Compostable packaging reduces waste.',
    isRecommended: true,
    sustainabilityScore: 88,
    scoreDeltaOnPurchase: +12,
    badges: ['Plastic-free', 'Biodegradable', 'Cruelty-free'],
  },
  {
    id: 'p2',
    name: 'Organic Cotton T‑Shirt',
    brand: 'GreenThreads',
    price: 999,
    mrp: 1299,
    currency: '₹',
    image: 'https://images.unsplash.com/photo-1525171254930-643fc658b64e?q=80&w=1200&auto=format&fit=crop',
    description: 'GOTS certified organic cotton. Low‑impact dyes.',
    longDescription: 'GOTS-certified cotton, fair-trade factory, and low‑impact dyes. Timeless fit with breathable fabric.',
    isRecommended: true,
    sustainabilityScore: 92,
    scoreDeltaOnPurchase: +18,
    badges: ['GOTS', 'Fair‑trade', 'Low‑impact dyes'],
  },
  {
    id: 'p3',
    name: 'Refillable Water Bottle 750ml',
    brand: 'Loopware',
    price: 799,
    mrp: 999,
    currency: '₹',
    image: 'https://images.unsplash.com/photo-1561212044-bac5ef688a07?q=80&w=1200&auto=format&fit=crop',
    description: 'Double‑walled stainless steel. Keeps cold 24h.',
    longDescription: 'Durable double‑walled steel bottle keeps drinks cold 24h. Ditch single‑use plastics and save money.',
    isRecommended: false,
    sustainabilityScore: 76,
    scoreDeltaOnPurchase: +9,
    badges: ['Reusable', 'BPA‑free', '1% for the Planet'],
  },
];

function getProductById(id) { return products.find(p => p.id === id); }

module.exports = { products, getProductById };
