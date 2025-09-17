import express from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { nanoid } from 'nanoid';
const router = express.Router();

// Create order (from cart)
router.post('/', requireAuth, async (req,res)=>{
  const db = req.app.locals.db;
  const { items, total } = req.body; // items [{productId, qty, price}]
  const id = 'ord_' + nanoid(8);
  const order = { id, userId: req.user.id, date: new Date().toISOString(), items: items||[], total: Number(total)||0, status: 'PAID' };
  db.data.orders.push(order);
  await db.write();
  res.status(201).json(order);
});

// List my orders
router.get('/my', requireAuth, (req,res)=>{
  const db = req.app.locals.db;
  res.json(db.data.orders.filter(o=>o.userId===req.user.id));
});

// Admin list all orders
router.get('/', requireAuth, requireAdmin, (req,res)=>{
  const db = req.app.locals.db;
  res.json(db.data.orders);
});

export default router;
