// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELL_SIZE = 50;
const RENDER_ON_MULTIPLES_OF = 1;

const OPEN_TILE = 0;

let rows;
let cols;
let grid;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = Math.floor(height/CELL_SIZE);
  cols = Math.floor(width/CELL_SIZE);
  grid = generateEmptyGrid(cols, rows);
}

function draw() {
  background(220);
  displayGrid();
}

class Tile {
  constructor(type, dir) {
    this.type = type;
    this.dir = dir;
  }

  update() {
    
  }
}

function keyPressed() {
  if (key === 'e') {
    grid = generateEmptyGrid(cols, rows);
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  //self
  toggleCell(x, y);
}

function toggleCell(x, y) {
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
