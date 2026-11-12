// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let FLOOR_COLOR_1;
let FLOOR_COLOR_2;
let ROOF_COLOR_1;
let ROOF_COLOR_2;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  FLOOR_COLOR_1 = color(6,6,15);
  FLOOR_COLOR_2 = color(76, 87, 96);
  ROOF_COLOR_1  = color(12,12,30);;
  ROOF_COLOR_2  = color(147, 168, 172);;
}

function draw() {
  background(147, 168, 172);
  player.update();

  drawRoof();
  drawFloor();
  player.raycast();
  let fps = Math.floor(frameRate());
  text(fps, 50, 50);
}

function drawFloor() {
  push();
  noStroke();
  let horizon = Math.floor(height / 2);

  for (let y = height; y >= horizon; y--) {
    let i = map(y, horizon, height, 0, 1);
    fill(lerpColor(FLOOR_COLOR_1, FLOOR_COLOR_2, i));
    rect(0, y, width, 1);
  }
  pop();
}

function drawRoof() {
  push();
  noStroke();
  let horizon = Math.floor(height / 2);

  for (let y = 0; y <= horizon; y++) {
    let i = map(horizon, y, height, 0, 1);
    fill(lerpColor(ROOF_COLOR_1, ROOF_COLOR_2, i));
    rect(0, y, width, 1);
  }
  pop();
}
