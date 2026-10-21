// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let tiles = [];
const SIZE = 1;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  theTile = spawnTile(width/2,height/2,400);
  for (let x = 0; x < width; x += SIZE) {
    for (let y = 0; y < height; y += SIZE) {
      let someTile = spawnTile(x,y,SIZE);
      tiles.push(someTile);
    }
  }
}

function draw() {
  background(220);
  for (let theTile of tiles) {
    line(theTile.x1, theTile.y1, theTile.x2, theTile.y2);
  }
}

function spawnTile(x, y, size) {
  let choice = random(100);
  let tile;
  if (choice < 50) {
    tile = {
      x1: x + size/2,
      y1: y - size/2,
      x2: x - size/2,
      y2: y + size/2
    };
  }
  else {
    tile = {
      x1: x - size/2,
      y1: y - size/2,
      x2: x + size/2,
      y2: y + size/2
    };
  }
  return tile;
}