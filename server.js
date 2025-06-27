const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// отдаём index.html и всё остальное
app.use(express.static(__dirname));

io.on('connection', socket => {
  console.log('🔌 Пользователь подключён');

  socket.on('chat message', msg => {
    io.emit('chat message', msg); // рассылаем всем
  });

  socket.on('disconnect', () => {
    console.log('❌ Пользователь отключён');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Сервер запущен: http://localhost:${PORT}`);
});
