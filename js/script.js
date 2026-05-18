


/* =========================================================
   CONTACT FORM BUTTON TEXT
========================================================= */

const input = document.getElementById("messageInput");
const button = document.getElementById("sendBtn");

if (input && button) {

  input.addEventListener("input", () => {

    if (input.value.trim() !== "") {
      button.textContent = "Send it 🚀";
    } 
    
    else {
      button.textContent = "Send Message";
    }

  });

}


/* =========================================================
   TICKET SYSTEM
========================================================= */

let selected = null;
let selectedCard = null;


/* -------------------------
   SELECT TICKET
------------------------- */

function selectTicket(type, price, element) {

  selected = {
    type,
    price
  };

  if (selectedCard) {
    selectedCard.classList.remove("selected");
  }

  selectedCard = element;
  selectedCard.classList.add("selected");

  document.getElementById("selectedText").innerText =
    `Selected: ${type} (€${price} each)`;

  updateTotal();
}


/* -------------------------
   UPDATE TOTAL PRICE
------------------------- */

function updateTotal() {

  const count =
    parseInt(document.getElementById("ticketCount").value) || 0;

  if (!selected) {

    document.getElementById("totalPrice").innerText =
      "Total: €0";

    return;
  }

  const total = count * selected.price;

  document.getElementById("totalPrice").innerText =
    `Total: €${total}`;
}


/* -------------------------
   TICKET INPUT EVENT
------------------------- */

const ticketInput = document.getElementById("ticketCount");

if (ticketInput) {
  ticketInput.addEventListener("input", updateTotal);
}


/* -------------------------
   BUY TICKET
------------------------- */

function buyTicket() {

  let valid = true;

  const first = document.getElementById("firstName");
  const last = document.getElementById("lastName");
  const email = document.getElementById("email");
  const count = document.getElementById("ticketCount");

  /* CLEAR OLD ERRORS */

  document
    .querySelectorAll(".error")
    .forEach(error => error.innerText = "");

  document.getElementById("message").innerText = "";


  /* VALIDATION */

  if (!first.value.trim()) {

    document.getElementById("firstErr").innerText =
      "First name required";

    valid = false;
  }

  if (!last.value.trim()) {

    document.getElementById("lastErr").innerText =
      "Last name required";

    valid = false;
  }

  if (!email.value.includes("@")) {

    document.getElementById("emailErr").innerText =
      "Invalid email";

    valid = false;
  }

  const qty = parseInt(count.value);

  if (!qty || qty < 1 || qty > 15) {

    document.getElementById("countErr").innerText =
      "Enter 1–15 tickets";

    valid = false;
  }

  if (!selected) {

    document.getElementById("message").innerText =
      "Please select a ticket type.";

    valid = false;
  }


  /* STOP IF INVALID */

  if (!valid) return;


  /* SUCCESS MESSAGE */

  const total = qty * selected.price;

  document.getElementById("message").innerText =
    `Success! You bought ${qty} ${selected.type} ticket(s). Total: €${total}`;
}


/* =========================================================
   MOVIE CARDS
========================================================= */

const cards = document.querySelectorAll(".movie-card");


/* =========================================================
BIOGRAPHY
========================================================= */

       const leftPanel = document.getElementById("aboutLeft");
const dots = document.querySelectorAll(".dot");
const images = document.querySelectorAll(".about-right img");

function activate(i){
  dots.forEach(d => d.classList.remove("active"));
  images.forEach(img => img.classList.remove("active"));

  if(dots[i]) dots[i].classList.add("active");
  if(images[i]) images[i].classList.add("active");
}

leftPanel.addEventListener("scroll", () => {
  const index = Math.round(leftPanel.scrollTop / leftPanel.clientHeight);
  activate(index);
});

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    const i = dot.dataset.index;
    leftPanel.scrollTo({ top: i * leftPanel.clientHeight, behavior: "smooth" });
  });
});
/* =========================================================
   script.js — Tarantino Experience
   Menu: adds/removes class "open" on #menu
   (panel slides from RIGHT via CSS: right: -320px → right: 0)
========================================================= */

function openMenu() {
  document.getElementById('menu').classList.add('open');
}

function closeMenu() {
  document.getElementById('menu').classList.remove('open');
}

/* Close menu when clicking outside of it */
document.addEventListener('click', function(e) {
  const menu = document.getElementById('menu');
  const hamburger = document.querySelector('.hamburguesa');
  if (!menu) return;
  if (menu.classList.contains('open') &&
      !menu.contains(e.target) &&
      e.target !== hamburger) {
    closeMenu();
  }
});

/* Close on Escape key */
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMenu();
});




const products = [
      { id:1,  cat:'tshirt', emoji:'👕', name:'Pulp Fiction Tee',        sub:'Classic fit · Black',        price:34, badge:'Bestseller', badgeType:'' },
      { id:2,  cat:'tshirt', emoji:'👕', name:'Kill Bill Vol.1 Tee',     sub:'Oversized · Washed black',   price:36, badge:'',          badgeType:'' },
      { id:3,  cat:'tshirt', emoji:'👕', name:'Reservoir Dogs Tee',      sub:'Classic fit · White',        price:34, badge:'New',        badgeType:'gold' },
      { id:4,  cat:'tshirt', emoji:'👕', name:'Django Unchained Tee',    sub:'Classic fit · Brown',        price:34, badge:'',          badgeType:'' },
      { id:5,  cat:'hoodie', emoji:'🧥', name:'The Bride Hoodie',        sub:'Heavy GSM · Black',          price:68, badge:'Limited',    badgeType:'' },
      { id:6,  cat:'hoodie', emoji:'🧥', name:'Pulp Fiction Hoodie',     sub:'Unisex · Vintage wash',      price:72, badge:'',          badgeType:'' },
      { id:7,  cat:'tote',   emoji:'👜', name:'Mia Wallace Tote',        sub:'Canvas · Natural',           price:28, badge:'Bestseller', badgeType:'' },
      { id:8,  cat:'tote',   emoji:'👜', name:'Briefcase Tote',          sub:'Canvas · Black',             price:30, badge:'',          badgeType:'' },
      { id:9,  cat:'book',   emoji:'📖', name:'Cinema Tarantino',        sub:'Hardcover · 320pp',          price:55, badge:'New',        badgeType:'gold' },
      { id:10, cat:'book',   emoji:'📖', name:'Tarantino: Scripts',      sub:'Paperback · All scripts',    price:42, badge:'',          badgeType:'' },
      { id:11, cat:'cup',    emoji:'☕', name:'Royale With Cheese Mug',  sub:'Ceramic · 350ml',            price:22, badge:'',          badgeType:'' },
      { id:12, cat:'cup',    emoji:'☕', name:'Five Dollar Shake Cup',   sub:'Enamel · 450ml',             price:26, badge:'Limited',    badgeType:'' },
      { id:13, cat:'cap',    emoji:'🧢', name:'QT Signature Cap',        sub:'6-panel · Black',            price:38, badge:'',          badgeType:'' },
      { id:14, cat:'cap',    emoji:'🧢', name:'Bride Revenge Cap',       sub:'Trucker · Yellow/Black',     price:40, badge:'New',        badgeType:'gold' },
    ];
 
    let cart = [];
 
    function renderGrid(data) {
      const grid = document.getElementById('grid');
      if (data.length === 0) {
        grid.innerHTML = '<p style="padding:60px;color:var(--muted);font-size:13px;letter-spacing:0.1em;">No products in this category yet.</p>';
        return;
      }
      grid.innerHTML = data.map(p => `
        <div class="product-card">
          <div class="product-img">
            ${p.badge ? `<div class="product-badge ${p.badgeType}">${p.badge}</div>` : ''}
            <span style="font-size:3.5rem">${p.emoji}</span>
          </div>
          <div class="product-info">
            <div class="product-name">${p.name}</div>
            <div class="product-sub">${p.sub}</div>
            <div class="product-footer">
              <div class="product-price">$${p.price}</div>
              <button class="add-btn" id="btn-${p.id}" onclick="addToCart(${p.id})">Add</button>
            </div>
          </div>
        </div>
      `).join('');
    }
 
    function filter(cat, el) {
      document.querySelectorAll('.cat-pill').forEach(b => b.classList.remove('active'));
      el.classList.add('active');
      const filtered = cat === 'all' ? products : products.filter(p => p.cat === cat);
      renderGrid(filtered);
    }
 
    function addToCart(id) {
      const product = products.find(p => p.id === id);
      cart.push(product);
      updateCartUI();
 
      const btn = document.getElementById('btn-' + id);
      if (btn) {
        btn.textContent = '✓ Added';
        btn.classList.add('added');
        setTimeout(() => {
          btn.textContent = 'Add';
          btn.classList.remove('added');
        }, 1800);
      }
      showNotif(product.name + ' added to cart');
    }
 
    function removeFromCart(index) {
      cart.splice(index, 1);
      updateCartUI();
    }
 
    function updateCartUI() {
      document.getElementById('cart-count').textContent = cart.length;
 
      const itemsEl = document.getElementById('cart-items');
      const footerEl = document.getElementById('cart-footer');
 
      if (cart.length === 0) {
        itemsEl.innerHTML = '<div class="cart-empty">Your cart is empty.</div>';
        footerEl.style.display = 'none';
        return;
      }
 
      footerEl.style.display = 'block';
 
      itemsEl.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
          <div class="cart-item-emoji">${item.emoji}</div>
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">$${item.price}</div>
          </div>
          <button class="cart-item-remove" onclick="removeFromCart(${i})">&#10005;</button>
        </div>
      `).join('');
 
      const total = cart.reduce((sum, item) => sum + item.price, 0);
      document.getElementById('cart-total').textContent = '$' + total;
    }
 
    function toggleCart() {
      document.getElementById('cart-drawer').classList.toggle('open');
      document.getElementById('cart-overlay').classList.toggle('open');
    }
 
    function showNotif(msg) {
      const n = document.getElementById('notif');
      n.textContent = msg;
      n.classList.add('show');
      setTimeout(() => n.classList.remove('show'), 2400);
    }
 
    // Init
    renderGrid(products);

    // SHOP //

    window.addEventListener('DOMContentLoaded', () => {
    window._cartCount = 0;
    window._cartTotal = 0;
  });

  function addToCart(btn, name, price) {
    window._cartCount = (window._cartCount || 0) + 1;
    window._cartTotal = (window._cartTotal || 0) + parseFloat(price);
    btn.textContent = 'Added ✓';
    btn.classList.add('added');
    setTimeout(() => { btn.textContent = 'Add to Cart'; btn.classList.remove('added'); }, 1500);
    document.getElementById('cartCount').textContent = window._cartCount;
    document.getElementById('cartTotal').textContent = '€' + window._cartTotal.toFixed(2);
    document.getElementById('cartBar').classList.add('visible');
    const c = document.getElementById('shopConfirm');
    c.textContent = '"' + name + '" added to your cart.';
    setTimeout(() => { c.textContent = ''; }, 2500);
  }

  function filterProducts(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category);
    });
  }

  function checkout() {
    if (!window._cartCount) return;
    const bar = document.getElementById('cartBar');
    bar.innerHTML = '<p style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:1.1rem;color:#c9a84c;text-align:center;width:100%;">Order placed. Expect the unexpected, you will recevie and Confirmation soon!— Q.T.</p>';
    window._cartCount = 0; window._cartTotal = 0;
    setTimeout(() => { bar.classList.remove('visible'); }, 3000);
  }

  window.addEventListener('DOMContentLoaded', () => {
    window._cartCount = 0;
    window._cartTotal = 0;
  });

  function addToCart(btn, name, price) {
    window._cartCount = (window._cartCount || 0) + 1;
    window._cartTotal = (window._cartTotal || 0) + parseFloat(price);
    btn.textContent = 'Added ✓';
    btn.classList.add('added');
    setTimeout(() => { btn.textContent = 'Add to Cart'; btn.classList.remove('added'); }, 1500);
    document.getElementById('cartCount').textContent = window._cartCount;
    document.getElementById('cartTotal').textContent = '€' + window._cartTotal.toFixed(2);
    document.getElementById('cartBar').classList.add('visible');
    const c = document.getElementById('shopConfirm');
    c.textContent = '"' + name + '" added to your cart.';
    setTimeout(() => { c.textContent = ''; }, 2500);
  }

  function filterProducts(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.product-card').forEach(card => {
      card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category);
    });
  }

  function checkout() {
    if (!window._cartCount) return;
    const bar = document.getElementById('cartBar');
    bar.innerHTML = '<p style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:1.1rem;color:#c9a84c;text-align:center;width:100%;">Order placed. Expect the unexpected. — Q.T.</p>';
    window._cartCount = 0; window._cartTotal = 0;
    setTimeout(() => { bar.classList.remove('visible'); }, 3000);
  }






