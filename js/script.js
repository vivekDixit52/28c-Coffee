// ====== EDIT THESE ======
const WHATSAPP_NUMBER = "7500509965"; // country code + number, no + or spaces
const SHOP_NAME = "28°C Hand Beaten Coffee";
// ========================

const MENU = [
  { id:"coffee", name:"Hand Beaten Coffee", note:"Strong coffee: ₹10 extra.", items:[
    ["Hand Beaten Cold Coffee","",60,80],
    ["Strong Coffee","",70,90],
    ["Cold Coffee Flavours","Hazelnut, Vanilla, Irish, Caramel, Butter Scotch, Chocolate, Oreo, Crunchy",80,100],
    ["Nutella Coffee","",90,120],
    ["Browni Coffee","",90,120],
    ["Davidoff Cold Coffee","",80,100],
    ["Nescafe & Cold Coffee","",80,100],
    ["Davidoff & Nescafe Flavour","Hazelnut, Vanilla, Irish, Caramel, Butter Scotch, Chocolate",100,120],
    ["Smoothie","Berry Berry, Strawberry Mint, Mango, Rose, Blueberry",100,120]
  ]},
  { id:"mocktails", name:"Mocktails", note:"", items:[
    ["Fresh Lime Soda / Mineral Water","",50,70],
    ["Masala Lemonade Soda (Shikanji)","",50,70],
    ["Mint Masala Soda","",60,80],
    ["Ice Tea Flavour","Lemon, Peach, Strawberry, Cranberry, Mango, Orange, Pineapple, Watermelon",80,110],
    ["Kokam Soda","",80,100],
    ["Chilli Guava","",80,100],
    ["Rose + Mint Sharbat","",70,90],
    ["Spicy Mango","",70,90],
    ["Passionberry Cooler Soda","",100],
    ["Special 28°C Watermelon + Peach","",100],
    ["Special 28°C Orange + Peach","",100]
  ]},
  { id:"mojito", name:"Virgin Mojito", note:"", items:[
    ["Mint Lime Mojito","Green Apple, Watermelon, Strawberry, Blueberry, Kiwi, Blue Curacao, Black Currant, Masala, Mojito, Pineapple, Peach, Mango, Orange, Cranberry, Passion Fruit, Bubblegum, Rose",90,120],
    ["Pina Colada","",100,120],
    ["Ice Gola","Watermelon, Mango, Rose + Mint, Strawberry, Kiwi, Orange",90,110],
    ["Power Punch","Mango + Orange + Pineapple + Kiwi + Strawberry",90,110],
    ["Boba-Tea Shake","Blueberry, Strawberry, Mango, Chocolate, Butterscotch, Black Currant, Hazelnut",140,150],
    ["Coffee Boba Tea","",120,150]
  ]},
  { id:"shakes", name:"Shakes", note:"", items:[
    ["Chocolate Shake","",90],["Butter Scotch Shake","",90],["Oreo Shake","",90],["Paan Shake","",90],
    ["Kit-Kat Shake","",110],["Strawberry Shake","",80],["Oreo + Chocolate Shake","",110],["Mango Shake","",80],
    ["Rose Shake","",80],["Nutella Chocolate Shake","",130],["Vanilla Shake","",80],["Browni Shake","",130],
    ["Caramel Shake","",80],["Hazelnut Shake","",80],["Nutella + Kit-Kat Shake","",130],["Bubblegum Shake","",80],
    ["Fruit Flavour Shake","Mango + Strawberry + Pineapple",80],["Black Currant Shake","",80],
    ["Blueberry Shake","",90],["Irish Shake","",80]
  ]}
];

const $ = id => document.getElementById(id);
let active = 0;
let cart = {}; // key -> {name,size,price,qty}

function renderTabs(){
  $("tabs").innerHTML = MENU.map((c,i)=>`<button role="tab" aria-selected="${i===active}" data-i="${i}">${c.name}</button>`).join("");
}
function renderItems(){
  const cat = MENU[active];
  $("note").textContent = cat.note;
  $("items").innerHTML = cat.items.map((it,idx)=>{
    const [name,desc,m,l] = it;
    const btns = l
      ? `<button class="p" data-a="${active}:${idx}:M"><span>M</span>₹${m}</button><button class="p" data-a="${active}:${idx}:L"><span>L</span>₹${l}</button>`
      : `<button class="p" data-a="${active}:${idx}:S">₹${m}</button>`;
    return `<li><div><h3>${name}</h3>${desc?`<small>${desc}</small>`:""}</div><div class="prices">${btns}</div></li>`;
  }).join("");
}
function add(a,btn){
  const [c,i,s] = a.split(":");
  const it = MENU[c].items[i];
  const price = s==="L" ? it[3] : it[2];
  const key = it[0]+"|"+s;
  cart[key] = cart[key] || {name:it[0],size:s,price,qty:0};
  cart[key].qty++;
  renderCart();
  btn.classList.add("added");
  setTimeout(()=>btn.classList.remove("added"),500);
}
function renderCart(){
  const list = Object.entries(cart);
  const qty = list.reduce((n,[,v])=>n+v.qty,0);
  const total = list.reduce((n,[,v])=>n+v.qty*v.price,0);
  $("count").textContent = qty;
  $("total").textContent = "₹"+total;
  $("empty").style.display = qty ? "none" : "block";
  $("cartList").innerHTML = list.map(([k,v])=>`<li><div><span class="nm">${v.name}</span><small>${v.size==="S"?"":"Size "+v.size+" · "}₹${v.price}</small></div>
    <div class="qty"><button data-q="${k}:-1" aria-label="Remove one">−</button><span>${v.qty}</span><button data-q="${k}:1" aria-label="Add one">+</button></div></li>`).join("");
}
function toggleDrawer(on){
  $("drawer").classList.toggle("on",on);
  $("scrim").classList.toggle("on",on);
  $("drawer").setAttribute("aria-hidden",!on);
}
function sendWA(){
  const list = Object.values(cart);
  if(!list.length){ toggleDrawer(true); return; }
  const name = $("custName").value.trim();
  const lines = list.map(v=>`• ${v.qty} × ${v.name}${v.size==="S"?"":" ("+v.size+")"} – ₹${v.qty*v.price}`);
  const total = list.reduce((n,v)=>n+v.qty*v.price,0);
  const msg = `Hi ${SHOP_NAME}, I'd like to order:\n${lines.join("\n")}\nTotal: ₹${total}${name?"\nName: "+name:""}`;
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,"_blank","noopener");
}

document.addEventListener("click",e=>{
  const t = e.target.closest("button");
  if(!t) return;
  if(t.dataset.i){ active=+t.dataset.i; renderTabs(); renderItems(); }
  else if(t.dataset.a){ add(t.dataset.a,t); }
  else if(t.dataset.q){
    const [k,d] = [t.dataset.q.slice(0,t.dataset.q.lastIndexOf(":")), +t.dataset.q.slice(t.dataset.q.lastIndexOf(":")+1)];
    cart[k].qty += d; if(cart[k].qty<=0) delete cart[k]; renderCart();
  }
});
$("openCart").onclick = ()=>toggleDrawer(true);
$("closeCart").onclick = $("scrim").onclick = ()=>toggleDrawer(false);
$("clear").onclick = ()=>{cart={};renderCart();};
$("sendWA").onclick = sendWA;
$("burger").onclick = ()=>{const o=$("nav").classList.toggle("on");$("burger").setAttribute("aria-expanded",o);};
$("nav").onclick = e=>{ if(e.target.tagName==="A"){ $("nav").classList.remove("on"); $("burger").setAttribute("aria-expanded",false);} };
document.addEventListener("keydown",e=>{ if(e.key==="Escape") toggleDrawer(false); });

$("waDirect").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I have a question about "+SHOP_NAME)}`;
$("yr").textContent = new Date().getFullYear();
renderTabs(); renderItems(); renderCart();
