import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/register', async (req,res)=>{
  const db = req.app.locals.db;
  const { name, email, password, address } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email & password required' });
  if (db.data.users.find(u => u.email === email)) return res.status(409).json({ error: 'Email already exists' });
  const id = 'u_' + Date.now();
  const hash = bcrypt.hashSync(password, 10);
  db.data.users.push({ id, name, email, password: hash, address: address || '', role: 'customer' });
  await db.write();
  res.json({ message: 'Registered' });
});

router.post('/login', async (req,res)=>{
  const db = req.app.locals.db;
  const { email, password } = req.body;
  const user = db.data.users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, role: user.role, name: user.name, address: user.address } });
});

export default router;
