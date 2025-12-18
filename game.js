const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const gridSize = 20;
let snake = [{x: 5, y: 5}];
let food = {x: 10, y: 10};
let dx = 1, dy = 0;

function drawCell(x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
}

function draw() {
  ctx.clearRect(0,0,400,400);

  // Snake
  snake.forEach(s => drawCell(s.x, s.y, "lime"));

  // Food
  drawCell(food.x, food.y, "red");

  // AI Path
  let path = findPath(snake, food);
  if(path){
    path.forEach(p => drawCell(p.x, p.y, "green"));
  }
}

function update() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);

  if(head.x === food.x && head.y === food.y){
    food = {
      x: Math.floor(Math.random()*20),
      y: Math.floor(Math.random()*20)
    };
  } else {
    snake.pop();
  }
}

document.addEventListener("keydown", e => {
  if(e.key === "ArrowUp") {dx=0; dy=-1;}
  if(e.key === "ArrowDown") {dx=0; dy=1;}
  if(e.key === "ArrowLeft") {dx=-1; dy=0;}
  if(e.key === "ArrowRight") {dx=1; dy=0;}
});

setInterval(() => {
  update();
  draw();
}, 150);
