
function openMenu() {
    document.getElementById("menu").style.left = "0";
}
function closeMenu() {
    document.getElementById("menu").style.left = "-100%";
}

const input = document.getElementById("messageInput");
const button = document.getElementById("sendBtn");

input.addEventListener("input", () => {

    if (input.value.trim() !== "") {
        button.textContent = "Send it 🚀";
    } else {
        button.textContent = "Send Message";
    }

});

let selectedCard = null;

function selectTicket(type, price, element) {
  selected = { type, price };

  if (selectedCard) selectedCard.classList.remove("selected");
  selectedCard = element;
  selectedCard.classList.add("selected");

  document.getElementById("selectedText").innerText =
    `Selected: ${type} (€${price} each)`;

  updateTotal();
}

function updateTotal() {
  const count = parseInt(document.getElementById("ticketCount").value) || 0;

  if (!selected) {
    document.getElementById("totalPrice").innerText = "Total: €0";
    return;
  }

  const total = count * selected.price;
  document.getElementById("totalPrice").innerText = `Total: €${total}`;
}

document.getElementById("ticketCount").addEventListener("input", updateTotal);

function buyTicket() {
  let valid = true;

  const first = document.getElementById("firstName");
  const last = document.getElementById("lastName");
  const email = document.getElementById("email");
  const count = document.getElementById("ticketCount");

  document.querySelectorAll(".error").forEach(e => e.innerText = "");
  document.getElementById("message").innerText = "";

  if (!first.value) {
    document.getElementById("firstErr").innerText = "First name required";
    valid = false;
  }

  if (!last.value) {
    document.getElementById("lastErr").innerText = "Last name required";
    valid = false;
  }

  if (!email.value.includes("@")) {
    document.getElementById("emailErr").innerText = "Invalid email";
    valid = false;
  }

  const qty = parseInt(count.value);
  if (!qty || qty < 1 || qty > 15) {
    document.getElementById("countErr").innerText = "Enter 1–15 tickets";
    valid = false;
  }

  if (!selected) {
    document.getElementById("message").innerText = "Please select a ticket type.";
    valid = false;
  }

  if (!valid) return;

  const total = qty * selected.price;

  document.getElementById("message").innerText =
    `Success! You bought ${qty} ${selected.type} ticket(s). Total: €${total}`;
}
