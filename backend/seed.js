import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
const db = new Low(new JSONFile('./db.json'), { users: [], products: [], orders: [] });
await db.read();
db.data.products ||= [];
if (db.data.products.length === 0) {
  db.data.products = [
    { id: 'p1', name: 'Radiator Alpha', description: 'High-performance radiator', price: 4999, image: 'https://via.placeholder.com/400x300', category: 'Cooling', rating: 4.6 },
    { id: 'p2', name: 'Radiator Beta', description: 'Compact and efficient', price: 3499, image: 'https://via.placeholder.com/400x300', category: 'Cooling', rating: 4.3 }
  ];
}
await db.write();
console.log('Seeded products');
