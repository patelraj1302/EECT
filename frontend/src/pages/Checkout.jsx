import React, { useState } from 'react';
import axios from 'axios';
import { API } from '../App.jsx';
import { getCart, setCart } from '../lib/cart.js';

export default function Checkout(){
  const items = getCart();
  const subtotal = items.reduce((s,i)=> s + i.qty*i.price, 0);
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;
  const [status, setStatus] = useState('');

  const pay = async ()=>{
    try {
      // amounts in paise for INR
      const { data } = await axios.post(`${API}/api/payments/create-intent`, { amount: total*100, currency: 'inr' });
      if(data.clientSecret){
        // For demo: we won't confirm the card here. In real app you'd use @stripe/stripe-js
        setStatus('Payment intent created. (Complete with Stripe Elements in a real app)');
      } else {
        setStatus('Payment service not configured.');
      }
    } catch (e) {
      setStatus('Payment failed.');
    }
  };

  return (
    <section>
      <h2>Checkout</h2>
      <div>Order total: ₹{total}</div>
      <button onClick={pay}>Confirm Purchase</button>
      <div style={{marginTop:8}}>{status}</div>
    </section>
  );
}
