// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let FLOOR_COLOR_1;
let FLOOR_COLOR_2;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  FLOOR_COLOR_1 = color(0, 0, 0);
  FLOOR_COLOR_2 = color(255, 255, 255);
}

function draw() {
  background(220);
  player.update();

  drawFloor()
  player.raycast();
  let fps = Math.floor(frameRate());
  text(fps, 50, 50);
}

function drawFloor() {

  for (let y = height; y > height/2; y--) {
    let i = (1/(height/2)) * (y-(height/2));
    let c = lerpColor(FLOOR_COLOR_1, FLOOR_COLOR_2, i);
    push();
    stroke(c);
    line(0, y, width, y);
    pop();
  }
}
