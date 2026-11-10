// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(220);
  player.update();

  player.raycast();
  let fps = Math.floor(frameRate());
  text(fps, 50, 50);
}
