// Зависимости
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/static', express.static(__dirname + '/static'));

// Маршруты
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// Запуск сервера
server.listen(5000, function () {
    console.log('Запускаю сервер на порте 5000');
});

var player = [];

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('new player', function () {
        player.push(socket.id);
        if (player.length % 2 != 0) {
            socket.emit('waiting');
        } else {
            io.emit('startGame');
        }

        console.log(player);
    });
    
    socket.on('mousemove', function(data) {
        console.log("data.user1");
        socket.broadcast.emit('mousemove', data);
    });

    socket.on('disconnect', function () {
        delete player[socket.id]
    });
});
