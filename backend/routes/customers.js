import express from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
const router = express.Router();

// Admin list customers
router.get('/', requireAuth, requireAdmin, (req,res)=>{
  const db = req.app.locals.db;
  res.json(db.data.users.filter(u=>u.role==='customer').map(({password, ...rest})=>rest));
});

// Admin update customer
router.put('/:id', requireAuth, requireAdmin, async (req,res)=>{
  const db = req.app.locals.db;
  const idx = db.data.users.findIndex(u=>u.id===req.params.id);
  if (idx<0) return res.status(404).json({ error: 'Not found' });
  const { name, email, address } = req.body;
  db.data.users[idx] = { ...db.data.users[idx], name, email, address };
  await db.write();
  const { password, ...rest } = db.data.users[idx];
  res.json(rest);
});

// Admin delete customer
router.delete('/:id', requireAuth, requireAdmin, async (req,res)=>{
  const db = req.app.locals.db;
  const before = db.data.users.length;
  db.data.users = db.data.users.filter(u=>u.id!==req.params.id || u.role==='admin');
  await db.write();
  if (db.data.users.length===before) return res.status(404).json({ error: 'Not found' });
  res.json({ ok: true });
});

export default router;
