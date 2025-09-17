# EECT Assignment 1 — E‑Commerce (Frontend + Admin + Backend)

## Quick start
1) Backend
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run seed
   npm run dev
   ```

2) Frontend
   ```bash
   cd ../frontend
   npm install
   echo "VITE_API=http://localhost:4000" > .env
   npm run dev
   ```

- Admin login defaults:
  - email: admin@example.com
  - password: Admin@123

- To enable real payments: set `STRIPE_SECRET_KEY` in `backend/.env` and wire Stripe Elements on the checkout page.

## What’s covered (per assignment spec)
- Frontend pages: Home, Product list, Product detail, Cart, Payment, My Profile
- Admin panel: CRUD for Products & Customers, Order History
- Backend: REST API with auth (JWT), products/customers/orders, Stripe PaymentIntent endpoint
