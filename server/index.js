
const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const dotenv = require('dotenv');
dotenv.config();

const { products, getProductById } = require('./products');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(compression());
app.use(express.json());
app.use(cors());

// Health
app.get('/api/health', (req, res) => res.json({ ok: true }));

// Products
app.get('/api/products', (req, res) => {
  res.json({ items: products });
});

app.get('/api/products/:id', (req, res) => {
  const p = getProductById(req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

// Cart pricing (server-authoritative calculation incl. credits discount)
function creditsToPct(credits) { return Math.min(20, Math.floor((credits||0) / 100) * 2); }

app.post('/api/cart/price', (req, res) => {
  const { lines = [], credits = 0 } = req.body || {};
  let subtotal = 0, ecoDelta = 0;
  for (const line of lines) {
    const p = getProductById(line.productId);
    if (!p) continue;
    const qty = Math.max(1, parseInt(line.qty || 1, 10));
    subtotal += p.price * qty;
    ecoDelta += (p.scoreDeltaOnPurchase || 0) * qty;
  }
  const discountPct = creditsToPct(credits);
  const total = Math.max(0, Math.round(subtotal * (1 - discountPct / 100)));
  res.json({ subtotal, ecoDelta, discountPct, total });
});

// Orders (mock)
const orders = [];
app.post('/api/orders', (req, res) => {
  const { lines = [], email, address } = req.body || {};
  const id = 'ord_' + Math.random().toString(36).slice(2,10);
  const createdAt = new Date().toISOString();
  orders.push({ id, lines, email, address, createdAt, status: 'CREATED' });
  res.json({ id, createdAt });
});

// Payments: Razorpay integration (optional)
// If RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set, create an order in Razorpay Test
app.post('/api/payments/razorpay/create-order', async (req, res) => {
  try {
    const key = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const { amount } = req.body || {};
    if (!key || !secret) return res.status(501).json({ error: 'Razorpay keys not configured' });
    if (!amount || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

    const auth = Buffer.from(`${key}:${secret}`).toString('base64');
    const resp = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount: Math.round(amount), currency: 'INR', receipt: 'rcpt_'+Date.now(), payment_capture: 1 })
    });
    const data = await resp.json();
    if (!resp.ok) return res.status(resp.status).json(data);

    res.json({ orderId: data.id, amount: data.amount, currency: data.currency, keyId: key });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
});

// Mock payment
app.post('/api/payments/mock', (req, res) => {
  const pid = 'mock_pay_' + Math.random().toString(36).slice(2,8);
  res.json({ paymentId: pid });
});

// Serve frontend (built by Vite) from client/dist
const clientDist = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

app.listen(PORT, () => console.log('GreenCart running on :' + PORT));
