const CELL_SIZE = 50;
const RENDER_ON_MULTIPLES_OF = 1;

const OPEN_TILE = 0;
const WALL_TILE = 1;
const PLAYER    = 9;

let player = {x: 0, y: 0};
let rows;
let cols;
let grid;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateEmptyGrid(cols, rows);
  grid[player.x][player.y] = PLAYER
}

function draw() {
  background(220);
  displayGrid();
}

function movePlayer(x,y) {
  if (grid[y][x] === OPEN_TILE && x >= 0 && y >= 0 && x < grid[y].length && y < grid.length) {
    if (grid[y + 1][x] === OPEN_TILE || grid[y + 1][x] === PLAYER) {
      y++;
    }
    grid[player.y][player.x] = OPEN_TILE;
    
    player.x = x;
    player.y = y;

    grid[y][x] = PLAYER;

  }
}

function jumpPlayer() {
  let x = player.x;
  let y = player.y - 2;
  console.log(grid[player.y+1][x]);
  if (grid[player.y+1][x] !== OPEN_TILE) {
    grid[player.y][player.x] = OPEN_TILE;
    player.x = x;
    player.y = y;
    grid[y][x] = PLAYER;
  }
}

function keyPressed() {
  if (key === 'r') {
    grid = generateRandomGrid(cols, rows);
  }
  else if (key === 'e') {
    grid = generateEmptyGrid(cols, rows);
  }
  else if (key === RIGHT_ARROW) {
    movePlayer(player.x + 1, player.y);
  }
  else if (key === LEFT_ARROW) {
    movePlayer(player.x - 1, player.y);
  }
  else if (key === DOWN_ARROW) {
    movePlayer(player.x, player.y + 1);
  }
  else if (key === UP_ARROW) {
    jumpPlayer();
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x, y);
}

function toggleCell(x, y) {
  //make sure you're in the grid
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === OPEN_TILE) {
      grid[y][x] = WALL_TILE;
    }
    else if (grid[y][x] === WALL_TILE) {
      grid[y][x] = OPEN_TILE;
    }
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === OPEN_TILE) {
        fill('white');
      }
      else if (grid[y][x] === WALL_TILE) {
        fill('black');
      }
      else if (grid[y][x] === PLAYER) {
        fill('red');
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      if (random(100) < 50) {
        newGrid[y].push(OPEN_TILE);
      }
      else {
        newGrid[y].push(WALL_TILE);
      }
    }
  }
  return newGrid;
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(OPEN_TILE);
    }
  }
  return newGrid;
}