

// Подключаемся к тому же хосту и пути
const socket = io({
  path: "/api/socket"
});

const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    socket.emit("chat message", text);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const messageElement = document.createElement("div");
  messageElement.textContent = msg;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
});
