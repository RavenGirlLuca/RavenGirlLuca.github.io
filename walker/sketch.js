// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let walkers = [];

class Walker {
  constructor(x,y,speed,size) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size  = size;
    this.color = color(random(0,255),random(0,255),random(0,255));
  }

  update() {
    this.x += random(-this.speed, this.speed);
    this.y += random(-this.speed, this.speed);
  }

  draw() {
    fill(this.color);
    circle(this.x, this.y, this.size);
  }
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for (let i = 0; i < 50; i++) {
    walkers.push(new Walker(width/2, height/2, 10, 5));
  }
}

function draw() {
  //background(220);
  for (let walker of walkers) {
    walker.update();
    walker.draw();
  }
}
