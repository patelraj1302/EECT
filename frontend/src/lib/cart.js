export function getCart(){
  try { return JSON.parse(localStorage.getItem('cart')||'[]'); } catch { return []; }
}
export function setCart(items){
  localStorage.setItem('cart', JSON.stringify(items));
}
