# Backend (Node + Express)
- `cp .env.example .env` and set `JWT_SECRET` and `STRIPE_SECRET_KEY` (test key).
- `npm install`
- `npm run seed` (optional)
- `npm run dev` (starts on http://localhost:4000)

## REST endpoints
- Auth: `POST /api/auth/register`, `POST /api/auth/login`
- Products: `GET /api/products`, `GET /api/products/:id`, `POST/PUT/DELETE /api/products` (admin JWT)
- Customers: `GET /api/customers`, `PUT/DELETE /api/customers/:id` (admin JWT)
- Orders: `POST /api/orders` (auth), `GET /api/orders/my` (auth), `GET /api/orders` (admin)
- Payments: `POST /api/payments/create-intent` with `{ amount, currency }`

Data is stored in `db.json` using lowdb for simplicity.
