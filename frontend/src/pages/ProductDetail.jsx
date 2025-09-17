import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App.jsx';
import { getCart, setCart } from '../lib/cart.js';

export default function ProductDetail(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  const nav = useNavigate();
  useEffect(()=>{ axios.get(`${API}/api/products/${id}`).then(r=>setP(r.data)); },[id]);
  if(!p) return <div>Loading...</div>;
  const addToCart = ()=>{
    const cart = getCart();
    const existing = cart.find(i=>i.productId===p.id);
    if(existing){ existing.qty += 1; } else { cart.push({ productId: p.id, name: p.name, price: p.price, qty: 1 }); }
    setCart(cart);
    nav('/cart');
  };
  return (
    <section>
      <h2>{p.name}</h2>
      <img src={p.image} alt={p.name} style={{width:400, maxWidth:'100%', borderRadius:8}}/>
      <p>{p.description}</p>
      <div>Price: ₹{p.price}</div>
      <button onClick={addToCart}>Add to Cart</button>
    </section>
  );
}
