// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

const CELLSIZE = 50;
let rows;
let cols;
let grid = [];
let mouseClick = false;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  rows = floor(windowHeight/CELLSIZE);
  cols = floor(windowWidth/CELLSIZE);
  grid = genGrid(rows,cols,grid);
}

function draw() {
  background(220);
  updateGrid(grid);
  drawGrid(grid);
  mouseClick = false;
}

function mouseClicked() {
  mouseClick = true;
}

function genGrid(rows,cols,aGrid) {
  for(let y = 0; y < rows; y++) {
    aGrid.push([]);
    for(let x = 0; x < cols; x++) {
      aGrid[y].push(0);
    }
  }
  return(aGrid);
}

function updateGrid(aGrid) {
  for (let y = 0; y < aGrid.length; y++) {
    for (let x = 0; x < aGrid[y].length; x++) {
      if (mouseX >= windowWidth*(x/aGrid[x].length) && mouseX <= (windowWidth*(x/aGrid[x].length)) + (windowWidth/aGrid[x].length) &&
          mouseY >= windowHeight*(y/aGrid.length)   && mouseY <= (windowHeight*(y/aGrid.length))   + windowHeight/aGrid.length) {
        if (mouseClick) {
          if (aGrid[x][y] === 0) aGrid[x][y] = 1;
          else aGrid[x][y] = 0;
        }
      }
    }
  }
}

function drawGrid(aGrid) {
  for (let y = 0; y < aGrid.length; y++) {
    for (let x = 0; x < aGrid[y].length; x++) {
      fill('white');
      if(aGrid[x][y] === 1) fill('black');
      rect(windowWidth*(x/aGrid[x].length),windowHeight*(y/aGrid.length),windowWidth/aGrid[x].length,windowHeight/aGrid.length);
    }
  }
}