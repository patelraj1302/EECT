import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../App.jsx';

const headers = ()=> ({ Authorization: `Bearer ${localStorage.getItem('admintoken')||''}` });

export default function OrdersAdmin(){
  const [list, setList] = useState([]);
  useEffect(()=>{ axios.get(`${API}/api/orders`, { headers: headers() }).then(r=>setList(r.data)); },[]);
  return (
    <section>
      <h3>Order History</h3>
      <table border="1" cellPadding="6">
        <thead><tr><th>Order ID</th><th>Date</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>
          {list.map(o=>(<tr key={o.id}><td>{o.id}</td><td>{new Date(o.date).toLocaleString()}</td><td>₹{o.total}</td><td>{o.status}</td></tr>))}
        </tbody>
      </table>
    </section>
  );
}
