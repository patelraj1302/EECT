import React, { useState } from 'react';
export default function Profile(){
  const [form, setForm] = useState({ name:'', email:'', address:'' });
  const save = ()=> alert('Changes saved (wire this to /api/auth/update in a real app)');
  return (
    <section>
      <h2>My Profile</h2>
      <div style={{display:'grid', gap:8, maxWidth:480}}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <textarea placeholder="Address" value={form.address} onChange={e=>setForm({...form, address:e.target.value})}/>
        <button onClick={save}>Save changes</button>
      </div>
    </section>
  );
}
