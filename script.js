const products = [
 {id:1,name:"The Sculpted Blazer",category:"Clothing",price:89500,tag:"Bestseller",image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80"},
 {id:2,name:"Soft Structure Tote",category:"Bags",price:68500,tag:"New",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80"},
 {id:3,name:"The Everyday Shirt",category:"Clothing",price:42000,tag:"Essential",image:"https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=700&q=80"},
 {id:4,name:"Sculptural Gold Hoops",category:"Accessories",price:18500,tag:"",image:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80"},
 {id:5,name:"Relaxed Tailored Trouser",category:"Clothing",price:56000,tag:"New",image:"https://images.unsplash.com/photo-1506629905607-d9a3b7d4b4c1?auto=format&fit=crop&w=700&q=80"},
 {id:6,name:"The Mini Shoulder Bag",category:"Bags",price:49500,tag:"Limited",image:"https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=700&q=80"},
 {id:7,name:"Linen Blend Co-ord",category:"Clothing",price:73500,tag:"",image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80"},
 {id:8,name:"Minimalist Sunglasses",category:"Accessories",price:22500,tag:"New",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=80"}
];
let cart = [];
let activeCategory = "All";
const formatPrice = amount => new Intl.NumberFormat("en-NG",{style:"currency",currency:"NGN",maximumFractionDigits:0}).format(amount);
const card = p => `<article class="product-card">
  <div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag" ${p.tag ? "" : "hidden"}>${p.tag||""}</span><button class="add-button" data-add="${p.id}">Add to bag +</button></div>
  <div class="product-info"><div><p class="product-name">${p.name}</p><p class="product-category">${p.category}</p></div><span class="product-price">${formatPrice(p.price)}</span></div>
</article>`;
function renderProducts(){
 const query = (document.getElementById("searchInput").value || "").trim().toLowerCase();
 const filtered = products.filter(p => (activeCategory==="All"||p.category===activeCategory) && `${p.name} ${p.category}`.toLowerCase().includes(query));
 document.getElementById("allProducts").innerHTML = filtered.map(card).join("") || '<p>No pieces found. Try another search.</p>';
 document.getElementById("newProducts").innerHTML = products.slice(0,4).map(card).join("");
}
function addToCart(id){const item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});renderCart();openCart();}
function changeQty(id,delta){const item=cart.find(x=>x.id===id);if(!item)return;item.qty+=delta;if(item.qty<1)cart=cart.filter(x=>x.id!==id);renderCart();}
function removeItem(id){cart=cart.filter(x=>x.id!==id);renderCart();}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0), total=cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0);
 document.getElementById("bagCount").textContent=count;document.getElementById("drawerCount").textContent=`(${count})`;document.getElementById("subtotal").textContent=formatPrice(total);
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>{const p=products.find(p=>p.id===x.id);return `<div class="cart-item"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>${formatPrice(p.price)}</p><div class="quantity-controls"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span>${x.qty}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${p.id}" aria-label="Remove ${p.name}">×</button></div>`}).join(""):'<p class="empty-cart">Your bag is waiting for something lovely.</p>';
}
const drawer=document.getElementById("cartDrawer"),overlay=document.getElementById("overlay");
function openCart(){drawer.classList.add("open");overlay.classList.add("show");document.body.classList.add("drawer-open");drawer.setAttribute("aria-hidden","false");}
function closeCart(){drawer.classList.remove("open");overlay.classList.remove("show");document.body.classList.remove("drawer-open");drawer.setAttribute("aria-hidden","true");}
document.addEventListener("click",e=>{
 const add=e.target.closest("[data-add]");if(add){addToCart(Number(add.dataset.add));return;}
 const qty=e.target.closest("[data-qty]");if(qty){changeQty(Number(qty.dataset.qty),Number(qty.dataset.delta));return;}
 const remove=e.target.closest("[data-remove]");if(remove)removeItem(Number(remove.dataset.remove));
});
document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{activeCategory=btn.dataset.category;document.querySelectorAll(".filter").forEach(b=>b.classList.toggle("active",b===btn));renderProducts();}));
document.getElementById("searchInput").addEventListener("input",renderProducts);
document.getElementById("searchToggle").addEventListener("click",()=>{const panel=document.getElementById("searchPanel");panel.classList.toggle("open");if(panel.classList.contains("open")){document.getElementById("searchInput").focus();document.getElementById("shop").scrollIntoView({behavior:"smooth"});}});
document.getElementById("bagToggle").addEventListener("click",openCart);document.getElementById("closeCart").addEventListener("click",closeCart);overlay.addEventListener("click",closeCart);
document.getElementById("menuToggle").addEventListener("click",()=>document.getElementById("mainNav").classList.toggle("open"));
document.querySelectorAll("#mainNav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("mainNav").classList.remove("open")));
document.getElementById("checkoutButton").addEventListener("click",()=>{document.getElementById("checkoutNote").textContent=cart.length?"This demo does not process payments. Connect a checkout provider before accepting orders.":"Add an item to your bag to continue.";});
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("formMessage").textContent="Thank you for joining us — this demo form is not connected to an email service.";e.target.reset();});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
