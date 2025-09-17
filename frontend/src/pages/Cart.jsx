import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart, setCart } from '../lib/cart.js';

export default function Cart(){
  const [items, setItems] = useState(getCart());
  const nav = useNavigate();
  const updateQty = (idx, q)=>{
    const next = [...items];
    next[idx].qty = Math.max(1, Number(q)||1);
    setItems(next); setCart(next);
  };
  const removeItem = idx => {
    const next = items.filter((_,i)=>i!==idx);
    setItems(next); setCart(next);
  };
  const subtotal = items.reduce((s,i)=> s + i.qty*i.price, 0);
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;
  return (
    <section>
      <h2>Cart</h2>
      {items.length===0 ? <p>No items.</p> : (
        <div>
          {items.map((i,idx)=>(
            <div key={idx} style={{display:'flex', gap:12, alignItems:'center', borderBottom:'1px dashed #ddd', padding:'8px 0'}}>
              <div style={{flex:1}}>{i.name}</div>
              <input type="number" min="1" value={i.qty} onChange={e=>updateQty(idx, e.target.value)} style={{width:60}}/>
              <div>₹{i.price}</div>
              <button onClick={()=>removeItem(idx)}>Remove</button>
            </div>
          ))}
          <div style={{marginTop:12}}>
            <div>Subtotal: ₹{subtotal}</div>
            <div>Taxes (18%): ₹{taxes}</div>
            <b>Total: ₹{total}</b>
          </div>
          <button style={{marginTop:12}} onClick={()=>nav('/checkout')}>Proceed to Checkout</button>
        </div>
      )}
    </section>
  );
}
