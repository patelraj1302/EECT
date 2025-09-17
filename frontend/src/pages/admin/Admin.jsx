import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProductsAdmin from './ProductsAdmin.jsx';
import CustomersAdmin from './CustomersAdmin.jsx';
import OrdersAdmin from './OrdersAdmin.jsx';

export default function Admin(){
  return (
    <div>
      <h2>Admin Panel</h2>
      <nav style={{display:'flex', gap:12, borderBottom:'1px solid #ddd', paddingBottom:8}}>
        <Link to="products">Products</Link>
        <Link to="customers">Customers</Link>
        <Link to="orders">Order History</Link>
      </nav>
      <Routes>
        <Route path="products" element={<ProductsAdmin/>} />
        <Route path="customers" element={<CustomersAdmin/>} />
        <Route path="orders" element={<OrdersAdmin/>} />
      </Routes>
    </div>
  );
}
