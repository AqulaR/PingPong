
let canvas = document.getElementById("canvas");

let ctx = canvas.getContext('2d');

function circle (pos_x, pos_y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(pos_x, pos_y, radius, 0, Math.PI*2, true); 
    ctx.fill();
}

function block (pos_x, pos_y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(pos_x, pos_y, width, height);
}

let x_circle = 30, y_circle = 250;
let move_right = true, move_top = true;

let y_block = 200, height_block = 100;

let score = 0;

document.addEventListener('keydown', function(event) {
    console.log(event.code);
    if (event.code == "ArrowDown" && y_block + height_block !== 500) {
        y_block += 5;
    } else if (event.code == "ArrowUp" && y_block != 0) {
        y_block -= 5;
    }
});

let playGame = setInterval(function () {
    ctx.clearRect(0, 0, 800, 500);

    if (y_circle >= y_block && y_circle <= y_block + height_block && x_circle == 725) {
        move_right = false;
        score++;
    }

    if (y_circle - 25 == 0) {
        move_top = false;
    } else if (y_circle + 25 == 500) {
        move_top = true;
    }

    if (x_circle - 25 == 0) {
        move_right = true;
    } else if (x_circle + 25 == 800) {
        move_right = false;
    }

    if (move_right == true) {
        x_circle++ * 10;
    } else {
        x_circle-- * 10;
    }

    if (move_top == true) {
        y_circle-- * 10;
    } else {
        y_circle++ * 10 ;
    }

    circle(x_circle, y_circle, 25, "red");
    block(750, y_block, 25, height_block, "green");

    if ((y_circle <= y_block || y_circle >= y_block + height_block) && x_circle > 725) {
        clearInterval(playGame);
        alert("Ваш счёт: " + score);
    }
}, 10);


