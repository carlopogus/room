var io = require('socket.io')(3001);

io.on('connection', function (socket) {
  socket.on('device', function (data) {
    io.emit('coords', data);
  });
});
