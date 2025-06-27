const socket = io();

const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

// Ник пользователя
const username = prompt("Введите ваше имя") || "Гость";

// Отправка сообщения
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    const message = {
      user: username,
      text: text,
      time: new Date().toLocaleTimeString()
    };
    socket.emit('chat message', message);
    input.value = '';
  }
});

// Получение сообщения
socket.on('chat message', function (msg) {
  addMessage(msg);
});

// Отображение в чате
function addMessage({ user, text, time }) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${user}</strong> <span style="opacity: 0.6; font-size: 0.8em">[${time}]</span>: ${text}`;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
}
