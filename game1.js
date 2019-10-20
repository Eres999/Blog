const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/bg.jpg";

const foodImg = new Image();
foodImg.src = "img/food.jpg";

let box = 40;

let score = 0;

let food = {
	x: Math.floor((Math.random() * 15 + 1)) * box,
	y: Math.floor((Math.random() * 15 + 1)) * box,
};	

let snake = [];
snake[0] = {
	x: 8 * box,
	y: 8 * box,
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
	if(event.keyCode == 83 && dir != "up")
		dir = "down";
	if(event.keyCode == 87 && dir != "down")
		dir = "up";
	if(event.keyCode == 65 && dir != "right")
		dir = "left";
	if(event.keyCode == 68 && dir != "left")
		dir = "right";
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
    	if (head.x == arr[i].x && head.y == arr[i].y) 
    		clearInterval(game);
    }
}

function drawGame() {
	
	ctx.drawImage(ground, 0, 0);
    ctx.drawImage(foodImg, food.x, food.y);

    ctx.fillStyle = "black";
    drawBoard();

    for(let i = 0; i < snake.length; i++) {
	  ctx.fillStyle = "green";
	  ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "black";
    ctx.font = "70px Georgia";
    ctx.fillText("Snake ^_^", 850, 120);
    ctx.font = "50px Georgia";
    ctx.fillText("Счет: " + score, 900, 200);
    ctx.font = "40px Georgia";
    ctx.fillText("Управление - WASD", 800, 300);
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
    	score++;
    	food = {
	      x: Math.floor((Math.random() * 15 + 1)) * box,
	      y: Math.floor((Math.random() * 15 + 1)) * box,
         };

    }
    else { 
    	snake.pop();
    }

    if (snakeX < box || snakeX > 16 * box || snakeY < 40 || snakeY > 16 * box)
    	clearInterval(game);

    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;

    let NewHead = {
    	x: snakeX,
    	y: snakeY
    };

    eatTail(NewHead, snake);

    snake.unshift(NewHead);
}

function drawBoard() {
	for(let i = 1; i < 18; i++) {
		ctx.fillRect(40, 40 * i, 640, 1);
		ctx.fillRect(40 * i, 40, 1, 640);
	}
}

let game = setInterval(drawGame, 100);	