const board = document.getElementById('board');
const stop = document.getElementById('stop');
const rightSide = [19,39,59,79,99,119,139,159,179,199,219,239,259,279,299,319,339,359,379,399];
const leftSide = [0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340,360,380];
let directionUp, directionDown, directionLeft, directionRight;
let array = [], snakeBody = [];
let positon = 53, fruit, x, score = 0, gameOver = false; // ' x ' ---> is the interval so I can stop it;

document.onkeydown = movement;
window.onload = createGame();

function createGame() { // create 400 squares for snake game 
  for (let i = 0; i < 400; ++i) {
    let square = document.createElement('div');
    square.setAttribute('id', i);
    square.setAttribute('class', 'square');
    array.push(square);
    board.appendChild(square);
  }
  updateScore();
  startGame();
}

function startGame() { // set the snake on board and fruit
  let element = document.getElementById('53');
  element.setAttribute('snake', 'headLeft');
  fruit = random();
  array[fruit].setAttribute('fruit', 'on');
  snakeBody.push(element);
}

function movement(e) { // direction for the snake movement
  if(gameOver) return;
  clearInterval(x);
  if (directionRight != 1) {
    if (e.keyCode == 39) {
      x = setInterval(moveRight, 100);
      directionUp = 0;
      directionDown = 0;
      directionLeft = 1;
      directionRight = 0;
    }
  }
  if (directionLeft != 1) {
    if (e.keyCode == 37) {
      x = setInterval(moveLeft, 100);
      directionUp = 0;
      directionDown = 0;
      directionLeft = 0;
      directionRight = 1;
    }
  }
  if (directionUp != 1) {
    if (e.keyCode == 38) {
      x = setInterval(moveUp, 100);
      directionUp = 0;
      directionDown = 1;
      directionLeft = 0;
      directionRight = 0;
    }
  }
  if (directionDown != 1) {
    if (e.keyCode == 40) {
      x = setInterval(moveDown, 100);
      directionUp = 1;
      directionDown = 0;
      directionLeft = 0;
      directionRight = 0;
    }
  } 
}

function updateScore() {
  let elementScore = document.getElementById('score');
    elementScore.innerHTML = '🍎 ' + score;
}

function checkSnake() { // check for fruit
  let positionFruit;
  if (positon == fruit) {
    array[positon].setAttribute('snake','head');
    snakeBody.push(array[positon]);
    array[fruit].setAttribute('fruit', 'off');
    positionFruit = array[fruit].id;
    array[fruit].innerHTML = "";
    fruit = random();
    array[fruit].setAttribute('fruit', 'on');
    ++score;
    updateScore();
  }

  if (snakeBody.length > 3) { // after checking for fruit, then check for colision
    let snakeHead = snakeBody[snakeBody.length - 1].id;
    for (let i = 0; i < snakeBody.length - 1; ++i) {
      if (snakeBody[i].id == snakeHead && snakeBody[i].id != positionFruit) {
        stopGame();
      }
    }
  }
}

function moveLeft() { // movement left of snake
  if (checkLeft(positon) == true ) { stopGame(); return; } 
  --positon;
  snakeBody.push(array[positon]);
  for (let i = 0; i < snakeBody.length - 1; ++i) {
    snakeBody[0].setAttribute('snake','none');
    if (i != 0) {
      snakeBody[i].setAttribute('snake','body');
    }
  }
  snakeBody[snakeBody.length - 1].setAttribute('snake', 'headLeft');
  snakeBody.shift(); 
  checkSnake();
}

function moveUp() { // movement up of snake
  if (positon < 20) { stopGame(); return; } 
  positon -= 20;
  snakeBody.push(array[positon]);
  
  for (let i = 0; i < snakeBody.length - 1; ++i) {
    snakeBody[0].setAttribute('snake','none');
    if (i != 0) {
      snakeBody[i].setAttribute('snake','body');
    }
  }
  snakeBody[snakeBody.length - 1].setAttribute('snake', 'headUp');
  snakeBody.shift(); 
  checkSnake();
}

function moveRight() { // movement right of snake
  if (checkRight(positon) == true ) { stopGame(); return; } 
  ++positon;
  snakeBody.push(array[positon]);
  for (let i = 0; i < snakeBody.length - 1; ++i) {
    snakeBody[0].setAttribute('snake','none');
    if (i != 0) {
      snakeBody[i].setAttribute('snake','body');
    }
  }
  snakeBody[snakeBody.length - 1].setAttribute('snake', 'headRight');
  snakeBody.shift();
  checkSnake();
}

function moveDown() { // movement down of snake
  if (positon > 379) { stopGame(); return; } 
  positon += 20;
  snakeBody.push(array[positon]);
  for (let i = 0; i < snakeBody.length - 1; ++i) {
    snakeBody[0].setAttribute('snake','none');
    if (i != 0) {
      snakeBody[i].setAttribute('snake','body');
    }
  }
  snakeBody[snakeBody.length - 1].setAttribute('snake', 'headDown');
  snakeBody.shift(); 
  checkSnake();
}

function checkLeft(positon) { // check if hit left wall
  for (let i = 0; i < leftSide.length; ++i) {
    if (positon == leftSide[i]) {
      return true;
    }
  }
  return false;
}

function checkRight(positon) { // check if hit right wall
  for (let i = 0; i < rightSide.length; ++i) {
    if (positon == rightSide[i]) {
      return true;
    }
  }
  return false;
}

function random() { // returns a random number between 0 and 399, to position fruit randomly
  return Math.floor(Math.random() * 399) + 0;
}

function stopGame() {
  clearInterval(x);
  gameOver = true;
  stop.setAttribute('class', 'stop');
  stop.innerHTML = 'GAME-OVER';
  stop.onclick = restart;
  return;
}

function restart() {
  window.location.reload();
}