// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let t1 = 0;
let t2 = 0;

let dt = 0.01;

async function setup() {
  createCanvas(windowWidth, windowHeight);
  t1 = random(1000);
  t2 = random(1000);
}

function draw() {
  background(220);

  let x = noise(t1)*width;
  let y = noise(t2)*height;

  circle(x,y,50);

  t1 += dt;
  t2 += dt;
}
