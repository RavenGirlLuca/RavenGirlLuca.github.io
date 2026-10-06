// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let bouncyCircle = [];

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  bouncyCircle = {
    x:       random(width),
    y:       random(height),
    dx:      random(-15,15),
    dy:      random(-15,15),
    radius:  random(10,50),
    r:       random(255),
    g:       random(255),
    b:       random(255),
  };
}

function draw() {
  background(220);

  bouncyCircle.x += bouncyCircle.dx;
  bouncyCircle.y += bouncyCircle.dy;

  if (bouncyCircle.x >= width - bouncyCircle.radius || bouncyCircle.x  <= 0 + bouncyCircle.radius ) {
    bouncyCircle.dx * -1;
  }

  if (bouncyCircle.y >= height - bouncyCircle.radius || bouncyCircle.y  <= 0 + bouncyCircle.radius ) {
    bouncyCircle.dy * -1;
  }
  
  fill(color(bouncyCircle.r,bouncyCircle.g,bouncyCircle.b));
  circle(bouncyCircle.x,bouncyCircle.y,bouncyCircle.radius *2);
}
