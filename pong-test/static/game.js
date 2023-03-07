var socket = io();
var player = player;
const canvas = document.getElementById("pong")
const ctx = canvas.getContext("2d")

// ракетка пользователя

const user1 = {
    x: 0,
    y: canvas.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}

const user2 = {
    x: canvas.width - 10,
    y: canvas.height / 2 - 100 / 2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}

// const user2 = {
//     x: canvas.width - 10,
//     y: canvas.height/2 - 100/2,
//     width: 10,
//     height: 100,
//     color: "WHITE",
//     score: 0
// }

// создаем мячик

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE"
}

// прямоугольник

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
}

// создаем сеть

const net = {
    x: canvas.width / 2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE"
}

// рисуем сеть

function drawNet() {
    for (let i = 0; i < canvas.height; i += 15) {
        drawRect(net.x, net.y + i, net.width, net.height, net.color)
    }
}

// круг

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2, false)
    ctx.closePath()
    ctx.fill()
}

// текст

function drawText(text, x, y, color) {
    ctx.fillStyle = color
    ctx.font = "45px fantasy"
    ctx.fillText(text, x, y)
}

// рисуем игру

function render() {
    drawRect(0, 0, canvas.width, canvas.height, "BLACK")

    //сеть
    drawNet()

    // счет

    drawText(user1.score, canvas.width / 4, canvas.height / 5, "WHITE")
    drawText(user2.score, 3 * canvas.width / 4, canvas.height / 5, "WHITE")

    // рисуем игрока

    drawRect(user1.x, user1.y, user1.width, user1.height, user1.color)
    drawRect(user2.x, user2.y, user2.width, user2.height, user2.color)

    // рисуем мячик

    drawCircle(ball.x, ball.y, ball.radius, ball.color)
}

// коллизия

function collision(b, p) {
    b.top = b.y - b.radius
    b.bottom = b.y + b.radius
    b.left = b.x - b.radius
    b.right = b.x + b.radius

    p.top = p.y
    p.bottom = p.y + p.height
    p.left = p.x
    p.right = p.x + p.width

    return b.right > p.left && p.bottom > p.top && b.left < p.right && b.top < p.bottom
}

// управление игроком

canvas.addEventListener("mousemove", movePaddle) 

function movePaddle(evt){
    let rect = canvas.getBoundingClientRect()
    //if (player % 2 != 0){
    user1.y = evt.clientY - rect.top - user1.height/2;
    user2.y = evt.clientY - rect.top - user2.height/2;
    //}
}

// canvas.addEventListener('mousemove', function (event, user1) {
//     socket.emit('mousemove', { 
//         y: event.clientY,
//         user1: user1,
//         height: user1.height
//     });
// });

// обновление всего

function update() {
    ball.x += ball.velocityX
    ball.y += ball.velocityY

    let computerLevel = 0.1
    //user2.y += (ball.y - (user2.y + user2.height/2)) * user2puterLevel

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY
    }

    let player = (ball.x < canvas.width / 2) ? user1 : user2

    // ДОБАВИТЬ счетчик очков + обновления поля после гола

    if (collision(ball, player)) {
        ball.velocityX = -ball.velocityX
    }
}


// инициализируем игру 

function game() {
    update()
    render()
}

// loop
const framePerSecond = 50
setInterval(game, 1000 / framePerSecond)

socket.emit('new player');
socket.emit('move');

socket.on('waiting', () => {
    console.log('Waiting for second player');
});

socket.on('startGame', () => {
    console.log('Game started');
    response.sendFile(path.join(__dirname, 'index.html'));
});
