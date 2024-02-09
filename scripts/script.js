// Exercício 01 - Variáveis globais do jogo.
// A)
let canvas = document.getElementById("snake");
// B)
let context = canvas.getContext("2d");
// C)
let box = 32;
// D)
let snake = [
    {
    x : 8 * box,
    y : 8 * box,
    }
];
// E)
let direction =  "right";
// F)
let food = {
    x : Math.floor(Math.random() * 15 + 1) * box,
    y : Math.floor(Math.random() * 15 + 1) * box,
};

// Exercício 02 - O fundo do jogo.
function createBG() {
    context.fillStyle = "white";
    context.fillRect(0, 0, 16 * box, 16 * box);
};

// Exercício 03 - Função que gera a cobra.
function createSnake() {
    for (let i in snake) {
      context.fillStyle = "green";
      context.fillRect(snake[i].x, snake[i].y, box, box);
    }
};

// Exercício 04 - A cobra precisa de alimentos.
function createFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Exercício 05 - A mecânica do movimento.
// Define a direção que a cobra vai se movimentar.
function update(event) {
    if (event.keyCode == 37 && direction != 'right') direction = 'left';
    if (event.keyCode == 38 && direction != 'down') direction = 'up';
    if (event.keyCode == 39 && direction != 'left') direction = 'right';
    if (event.keyCode == 40 && direction != 'up') direction = 'down';
}

// Exercício 06 - Algoritmo principal: primeira parte.
function startGame() {
    //Fazer a cobra atravessar a tela pro outro lado ao chegar nas bordas.
    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    //Verificar se a cobra bateu nela mesma.
    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert("Game Over :(");
            restart();
        }
    }

    //Invocar as funções do jogo.
    createBG();
    createSnake();
    createFood();
    snakeSlithersAndEats();

};

// Exercício 07 - Algoritmo principal: segunda parte.
function snakeSlithersAndEats() { //Experimentei segmentar esse bloco de código numa nova função.
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    // Exercício 08 - Algoritmo principal: terceira parte.
    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    snake.unshift(newHead);
};

// Exercício 09 - "Startando" o jogo.
document.addEventListener('keydown', update);
let game = setInterval(startGame, 100);


// EXTRA: criei uma função para reiniciar o jogo. Invoquei ela ali em cima no Game Over.
function restart() {
    snake = [{x: 8 * box, y: 8 * box}];
    direction = "right";
    food = {
        x: Math.floor(Math.random() * 15 + 1) * box, 
        y: Math.floor(Math.random() * 15 + 1) * box
    };
    game = setInterval(startGame, 100);
};