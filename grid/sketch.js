/* eslint-disable indent */
// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// let grid = [[1,0,1,1,0,1],
//             [1,1,0,1,0,1],
//             [0,0,1,1,0,1],
//             [1,0,1,1,0,1],
//             [1,1,0,1,0,1],
//             [0,0,1,1,0,1]];

let grid;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = ranGrid(10,10);
}

function draw() {
  background(220);
  drawGrid(grid);
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

function ranGrid(cols,rows) {
  let newGrid = [];
  for(let y = 0; y < rows; y++) {
    newGrid.push([]);
    for(let x = 0; x < cols; x++) {
      newGrid[y].push(floor((random(0,100))/50));
    }
  }
  return(newGrid);
}