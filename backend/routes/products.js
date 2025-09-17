import express from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { nanoid } from 'nanoid';
const router = express.Router();

// Public: list products
router.get('/', (req,res)=>{
  const db = req.app.locals.db;
  res.json(db.data.products);
});

// Public: get product detail
router.get('/:id', (req,res)=>{
  const db = req.app.locals.db;
  const p = db.data.products.find(p=>p.id===req.params.id);
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

// Admin CRUD
router.post('/', requireAuth, requireAdmin, async (req,res)=>{
  const db = req.app.locals.db;
  const { name, description, price, image, category, rating } = req.body;
  const id = nanoid(8);
  const product = { id, name, description, price: Number(price)||0, image: image||'', category: category||'General', rating: Number(rating)||4.5 };
  db.data.products.push(product);
  await db.write();
  res.status(201).json(product);
});

router.put('/:id', requireAuth, requireAdmin, async (req,res)=>{
  const db = req.app.locals.db;
  const idx = db.data.products.findIndex(p=>p.id===req.params.id);
  if (idx<0) return res.status(404).json({ error: 'Not found' });
  db.data.products[idx] = { ...db.data.products[idx], ...req.body };
  await db.write();
  res.json(db.data.products[idx]);
});

router.delete('/:id', requireAuth, requireAdmin, async (req,res)=>{
  const db = req.app.locals.db;
  const before = db.data.products.length;
  db.data.products = db.data.products.filter(p=>p.id!==req.params.id);
  await db.write();
  if (db.data.products.length===before) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;
