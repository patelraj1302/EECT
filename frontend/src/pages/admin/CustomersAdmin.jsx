import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../App.jsx';

const headers = ()=> ({ Authorization: `Bearer ${localStorage.getItem('admintoken')||''}` });

export default function CustomersAdmin(){
  const [list, setList] = useState([]);
  const [edit, setEdit] = useState(null);

  const load = ()=> axios.get(`${API}/api/customers`, { headers: headers() }).then(r=>setList(r.data));
  useEffect(()=>{ load(); },[]);

  const save = async ()=>{
    await axios.put(`${API}/api/customers/${edit.id}`, edit, { headers: headers() });
    setEdit(null); load();
  };

  return (
    <section>
      <h3>Customers</h3>
      <ul>
        {list.map(c=>(
          <li key={c.id} style={{borderBottom:'1px solid #eee', padding:8}}>
            {edit?.id===c.id ? (
              <div style={{display:'grid', gap:6, maxWidth:480}}>
                <input value={edit.name} onChange={e=>setEdit({...edit, name:e.target.value})}/>
                <input value={edit.email} onChange={e=>setEdit({...edit, email:e.target.value})}/>
                <textarea value={edit.address} onChange={e=>setEdit({...edit, address:e.target.value})}/>
                <button onClick={save}>Save</button>
              </div>
            ) : (
              <div style={{display:'flex', gap:8}}>
                <div style={{flex:1}}>{c.name} · {c.email}</div>
                <button onClick={()=>setEdit(c)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
