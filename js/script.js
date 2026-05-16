


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