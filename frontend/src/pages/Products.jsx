import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../App.jsx';
export default function Products(){
  const [list, setList] = useState([]);
  useEffect(()=>{ axios.get(`${API}/api/products`).then(r=>setList(r.data)); },[]);
  return (
    <section>
      <h2>Products</h2>
      <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:16}}>
        {list.map(p=>(
          <div key={p.id} style={{border:'1px solid #eee', borderRadius:8, padding:12}}>
            <img src={p.image} alt={p.name} style={{width:'100%', height:140, objectFit:'cover', borderRadius:6}}/>
            <h4>{p.name}</h4>
            <div>₹{p.price}</div>
            <Link to={`/products/${p.id}`}>View</Link>
          </div>
        ))}
      </div>
    </section>
  );
}
