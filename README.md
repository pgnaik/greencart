
# GreenCart Fullstack (Render-ready)

End-to-end sustainable e‑commerce prototype with **frontend + backend** in one deploy:
- **Frontend:** React + Vite + Tailwind
- **Backend:** Node + Express (serves `/api/*`) and also serves the built frontend
- **Payments:** Mock pay out-of-the-box; optional Razorpay Test mode via env vars
- **Green Credits:** every 100 GC => +2% extra discount (max 20%)

## One-click deploy to Render (free tier)
1. Create a new GitHub repo and push this folder.
2. In Render, click **New → Blueprint** and select this repo (uses `render.yaml`).

3. Leave the default build/start commands. Click **Apply** to create the service.

4. (Optional) Add env vars `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` to enable Razorpay test checkout.

5. When deploy completes, your app is live at `https://<your-service>.onrender.com`

## Local dev
```bash
npm i
npm run client:dev    # frontend at http://localhost:5173 (for local only)
# In another terminal (optional if using dev proxy):
npm start             # server at http://localhost:8080
```

> In production (Render), Express serves the built frontend from `client/dist` and your API at `/api/*` on the same URL.

## API (prototype)
- `GET /api/products` → list products

- `GET /api/products/:id` → one product

- `POST /api/cart/price` → totals for cart lines

- `POST /api/orders` → create a mock order (returns order id)

- `POST /api/payments/razorpay/create-order` → creates Razorpay test order **if keys are set**; otherwise returns 501

- `POST /api/payments/mock` → returns a fake payment id

"# greencart" 
