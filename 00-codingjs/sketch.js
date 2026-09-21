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
  for(let i = 0; i < 10; i++) {
    fill(color(random(255),random(255),random(255)));
    circle(random(width),random(height),random(50));
  }
}
