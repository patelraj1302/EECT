import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../App.jsx';

const headers = ()=> ({ Authorization: `Bearer ${localStorage.getItem('admintoken')||''}` });

export default function ProductsAdmin(){
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ name:'', description:'', price:0, image:'', category:'General' });

  const load = ()=> axios.get(`${API}/api/products`).then(r=>setList(r.data));
  useEffect(()=>{ load(); },[]);

  const create = async ()=>{
    await axios.post(`${API}/api/products`, form, { headers: headers() });
    setForm({ name:'', description:'', price:0, image:'', category:'General' }); 
    load();
  };
  const remove = async (id)=>{
    await axios.delete(`${API}/api/products/${id}`, { headers: headers() });
    load();
  };

  return (
    <section>
      <h3>Manage Products</h3>
      <div style={{display:'grid', gap:6, maxWidth:500}}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
        <input placeholder="Price" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})}/>
        <input placeholder="Image URL" value={form.image} onChange={e=>setForm({...form, image:e.target.value})}/>
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})}/>
        <button onClick={create}>Create</button>
      </div>
      <ul>
        {list.map(p=>(
          <li key={p.id} style={{display:'flex', gap:8, alignItems:'center'}}>
            <img src={p.image} alt="" width="60"/>
            <span style={{flex:1}}>{p.name} - ₹{p.price}</span>
            <button onClick={()=>remove(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <p><i>Tip: set an admin token into localStorage from browser console:</i><br/>
      <code>localStorage.setItem('admintoken', 'TOKEN_FROM_LOGIN')</code></p>
    </section>
  );
}
