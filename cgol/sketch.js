// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [];
let mouseClick = false;
let newGrid;
let running = true;

async function setup() {
  createCanvas(windowWidth, windowHeight);

  grid = genGrid(width/10,height/10);
}

function draw() {
  background(220);
  updateGrid(grid);
  drawGrid(grid);
  mouseClick = false;
}

function drawGrid(aGrid) {
  for(let y = 0; y < aGrid.length; y++) {
    for(let x = 0; x < aGrid[y].length; x++) {
      if (aGrid[y][x] === 1) fill('black');
      else                   fill('white');

      rect(
        x * (width/aGrid[y].length),
        y * (height/aGrid.length),
        width/aGrid[y].length,
        height/aGrid.length
      );
    }
  }
}

function updateGrid(aGrid) {
  newGrid = [...aGrid];
  for (let y = 0; y < aGrid.length; y++) {
    for (let x = 0; x < aGrid[y].length; x++) {
      let population = 0;
      if (
        mouseX > x * (width/aGrid[y].length) &&
        mouseX < (x * (width/aGrid[y].length)) + width/aGrid[y].length  &&
        mouseY > y * (height/aGrid.length) &&
        mouseY < (y * (height/aGrid.length)) + height/aGrid.length
      ) {
        if (mouseClick) {
          if (aGrid[y][x] === 0) aGrid[y][x] = 1;
          else aGrid[y][x] = 0;
        }
      }

      //CONWAY RULES
      if (running) {
        for (let ny = y - 1; ny <= y + 1; ny++) {
          for (let nx = x - 1; nx <= x + 1; nx++) {
            if ((nx !== x || ny !== y) && aGrid[ny]?.[nx] !== undefined) {
              if (aGrid[ny][nx] === 1) {
                population++;
              }
            }
          }
        }
        
        if (aGrid[y][x] === 0) {
          if (population === 3) {
            newGrid[y][x] = 1;
          }
        }
        else {
          if (population < 2 || population > 3) {
            newGrid[y][x] = 0;
          }
        }
      }
    }
  }
  aGrid = newGrid;
}

function genGrid(rows,cols) {
  let aGrid = [];
  for(let y = 0; y < cols; y++) {
    aGrid.push([]);
    for(let x = 0; x < rows; x++) {
      //aGrid[y].push(floor((random(0,100))/50));
      aGrid[y].push(0);
    }
  }
  return aGrid;
}

function mouseClicked() {
  mouseClick = true;
}

function keyPressed() {
  if (key === 'p') {
    running = !running;
  }
}