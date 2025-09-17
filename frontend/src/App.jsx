import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Profile from './pages/Profile.jsx';
import Admin from './pages/admin/Admin.jsx';

export const API = import.meta.env.VITE_API || 'http://localhost:4000';

export default function App(){
  return (
    <div style={{fontFamily:'system-ui', maxWidth: 1100, margin: '0 auto', padding: 16}}>
      <nav style={{display:'flex', gap:12, padding:'8px 0', borderBottom:'1px solid #ddd'}}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/admin">Admin</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:id" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/admin/*" element={<Admin/>} />
      </Routes>
    </div>
  );
}
