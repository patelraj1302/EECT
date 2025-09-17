import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';
import { fileURLToPath } from 'url';
import authRouter from './routes/auth.js';
import productsRouter from './routes/products.js';
import customersRouter from './routes/customers.js';
import ordersRouter from './routes/orders.js';
import paymentsRouter from './routes/payments.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Setup lowdb
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile);
const db = new Low(adapter, { users: [], products: [], orders: [] });
await db.read();
db.data ||= { users: [], products: [], orders: [] };
app.locals.db = db;

// seed admin if not exists
import bcrypt from 'bcryptjs';
const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
if (!db.data.users.find(u => u.email === adminEmail)) {
  const hash = bcrypt.hashSync(adminPassword, 10);
  db.data.users.push({ id: 'u_admin', email: adminEmail, password: hash, name: 'Admin', role: 'admin', address: '' });
  await db.write();
  console.log('Seeded admin user:', adminEmail);
}

// routes
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);
app.use('/api/customers', customersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/payments', paymentsRouter);

// health
app.get('/api/health', (req,res)=> res.json({ ok: true }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
