/* =========================================================
   MENU FUNCTIONS
========================================================= */
function openMenu() {
  document.getElementById('menu').classList.add('open');
}

function closeNav() {
  document.getElementById('menu').classList.remove('open');
}

document.addEventListener('click', function(e) {
  const menu = document.getElementById('menu');
  const hamburger = document.querySelector('.hamburguesa');
  if (!menu) return;
  if (menu.classList.contains('open') &&
      !menu.contains(e.target) &&
      e.target !== hamburger) {
    closeNav();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeNav();
});

/* =========================================================
   HAMBURGER MENU OPEN
========================================================= */
const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
if (openBtn) openBtn.onclick = () => document.getElementById('menu').classList.add('open');
if (closeBtn) closeBtn.onclick = closeNav;

/* =========================================================
   BIOGRAPHY PAGE — SLIDE ENGINE
========================================================= */
const TOTAL = 5;
let cur = 0, locked = false;

const left = document.getElementById('aboutLeft');
const track = document.getElementById('track');
const dots = document.querySelectorAll('.dot');
const imgs = document.querySelectorAll('.about-right img');
const curEl = document.getElementById('cur');
const hint = document.getElementById('hint');
const blocks = document.querySelectorAll('.text-block');

const mobile = () => window.innerWidth <= 860;

function setHeights() {
  if (mobile()) {
    blocks.forEach(b => b.style.height = '');
    return;
  }
  const h = left.clientHeight;
  blocks.forEach(b => b.style.height = h + 'px');
}

function moveTo(idx) {
  if (idx < 0 || idx >= TOTAL || idx === cur || locked) return;
  locked = true;
  cur = idx;

  if (mobile()) {
    blocks.forEach((b, i) => b.classList.toggle('active', i === cur));
    track.style.transform = 'none';
  } else {
    const h = left.clientHeight;
    track.style.transform = `translateY(${-cur * h}px)`;
  }

  imgs.forEach(img => img.classList.toggle('active', +img.dataset.index === cur));
  dots.forEach(d => d.classList.toggle('active', +d.dataset.index === cur));
  if (curEl) curEl.textContent = String(cur + 1).padStart(2, '0');
  if (hint) hint.classList.toggle('gone', cur > 0);

  setTimeout(() => { locked = false; }, 700);
}

if (left && track && dots.length > 0) {
  window.addEventListener('load', () => { setHeights(); });
  window.addEventListener('resize', () => {
    setHeights();
    if (!mobile()) track.style.transform = `translateY(${-cur * left.clientHeight}px)`;
    else track.style.transform = 'none';
  });

  dots.forEach(d => d.addEventListener('click', () => moveTo(+d.dataset.index)));

  /* Keyboard navigation */
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') moveTo(cur + 1);
    if (e.key === 'ArrowUp') moveTo(cur - 1);
  });

  /* Wheel scroll for slides */
  let accumulator = 0;
  left.addEventListener('wheel', e => {
    if (mobile()) return;
    e.preventDefault();
    
    if (locked) {
      accumulator = 0;
      return;
    }
    
    accumulator += e.deltaY;
    
    if (Math.abs(accumulator) < 100) return;
    
    accumulator = 0;
    moveTo(e.deltaY > 0 ? cur + 1 : cur - 1);
  }, { passive: false });
}

/* =========================================================
   CONTACT FORM
========================================================= */
const input = document.getElementById("messageInput");
const button = document.getElementById("sendBtn");

if (input && button) {
  input.addEventListener("input", () => {
    button.textContent = input.value.trim() !== "" ? "Send it 🚀" : "Send Message";
  });
}

/* =========================================================
   TICKET SYSTEM
========================================================= */
let selected = null;
let selectedCard = null;
let selectedDate = null;

function selectTicket(type, price, element) {
  selected = { type, price };
  if (selectedCard) selectedCard.classList.remove("selected");
  selectedCard = element;
  selectedCard.classList.add("selected");
  const selectedEl = document.getElementById("selectedText");
  if (selectedEl) selectedEl.innerText = `Selected: ${type} (€${price} each)`;
  updateTotal();
}

function updateTotal() {
  const count = parseInt(document.getElementById("ticketCount").value) || 0;
  const totalEl = document.getElementById("totalPrice");
  if (!selected) { 
    if (totalEl) totalEl.innerText = "Total: €0"; 
    return; 
  }
  if (totalEl) totalEl.innerText = `Total: €${count * selected.price}`;
}

const ticketInput = document.getElementById("ticketCount");
if (ticketInput) ticketInput.addEventListener("input", updateTotal);

function buyTicket() {
  let valid = true;
  const first = document.getElementById("firstName");
  const last = document.getElementById("lastName");
  const email = document.getElementById("email");
  const count = document.getElementById("ticketCount");
  const messageEl = document.getElementById("message");

  document.querySelectorAll(".error").forEach(e => e.innerText = "");
  if (messageEl) messageEl.innerText = "";

  if (first && !first.value.trim()) { 
    const err = document.getElementById("firstErr");
    if (err) err.innerText = "First name required"; 
    valid = false; 
  }
  if (last && !last.value.trim()) { 
    const err = document.getElementById("lastErr");
    if (err) err.innerText = "Last name required"; 
    valid = false; 
  }
  if (email && !email.value.includes("@")) { 
    const err = document.getElementById("emailErr");
    if (err) err.innerText = "Invalid email"; 
    valid = false; 
  }

  const qty = parseInt(count.value);
  if (!qty || qty < 1 || qty > 15) { 
    const err = document.getElementById("countErr");
    if (err) err.innerText = "Enter 1–15 tickets"; 
    valid = false; 
  }
  if (!selected) { 
    if (messageEl) messageEl.innerText = "Please select a ticket type."; 
    valid = false; 
  }
  if (!selectedDate) { 
    const err = document.getElementById("dateErr");
    if (err) err.innerText = "Please select a date"; 
    valid = false; 
  }

  if (!valid) return;

  const total = qty * selected.price;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (messageEl) {
    messageEl.innerText = 
      `Success! ${qty} ${selected.type} ticket(s) on ${selectedDate.getDate()} ${months[selectedDate.getMonth()]} ${selectedDate.getFullYear()}. Total: €${total}`;
  }
}

/* =========================================================
   SHOP SYSTEM
========================================================= */
window.addEventListener('DOMContentLoaded', () => {
  window._cartCount = 0;
  window._cartTotal = 0;
});

function addToCart(btn, name, price) {
  window._cartCount = (window._cartCount || 0) + 1;
  window._cartTotal = (window._cartTotal || 0) + parseFloat(price);
  btn.textContent = 'Added ✓';
  btn.classList.add('added');
  setTimeout(() => { 
    btn.textContent = 'Add to Cart'; 
    btn.classList.remove('added'); 
  }, 1500);

  const countEl = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');
  const barEl = document.getElementById('cartBar');
  const confEl = document.getElementById('shopConfirm');

  if (countEl) countEl.textContent = window._cartCount;
  if (totalEl) totalEl.textContent = '€' + window._cartTotal.toFixed(2);
  if (barEl) barEl.classList.add('visible');
  if (confEl) { 
    confEl.textContent = '"' + name + '" added to your cart.'; 
    setTimeout(() => { confEl.textContent = ''; }, 2500); 
  }
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
  if (!bar) return;
  bar.innerHTML = '<p style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:1.1rem;color:#c9a84c;text-align:center;width:100%;">Order placed. Expect the unexpected. — Q.T.</p>';
  window._cartCount = 0;
  window._cartTotal = 0;
  setTimeout(() => { bar.classList.remove('visible'); }, 3000);
}

/* =========================================================
   PAGE LOADER
========================================================= */
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  if (!loader) return;
  setTimeout(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
          if (loader.parentNode) loader.remove();
        }, 1000);
      });
    });
  }, 1500);
});