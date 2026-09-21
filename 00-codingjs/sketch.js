// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for(let i = 0; i < 100; i++) {
    fill(color(random(255),random(255),random(255)))
    circle(random(width),random(height),random(20));
  }
}
