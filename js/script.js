
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