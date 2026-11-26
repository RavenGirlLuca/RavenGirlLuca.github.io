// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let fireworks = [];
let sparks = [];

class Firework {
  constructor(x, y, speed, dist) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.dist = dist;
    this.currentDist = 0;
  }

  update() {
    this.y -= this.speed;
    this.currentDist += this.speed;
  }

  isExploded() {
    if (this.currentDist >= this.dist) {
      let r = random(0, 255);
      let g = random(0, 255);
      let b = random(0, 255);

      for (let i = 0; i < 100; i++) {
        sparks.push(new Spark(this.x, this.y, i * 3.6, random(1,3), r, g, b));
      }
      return true;
    }
    return false;
  }

  draw() {
    fill(127,127,127);
    circle(this.x, this.y, 10);
  }
}

class Spark {
  constructor(x, y, angle, speed, r, g, b) {
    this.x = x;
    this.y = y;
    this.angle = radians(angle);
    this.speed = speed;
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = 255;
    this.vy = 0;
  }

  destroy() {
    if (this.a <= 0) {
      return true;
    }
    return false;
  }

  update() {
    this.x += cos(this.angle) * this.speed;
    this.y += (sin(this.angle) * this.speed) + this.vy;
    this.a -= 1;
    this.vy += 0.03;
    this.speed *= 0.98;
  }

  draw() {
    fill(this.r, this.g, this.b, this.a);
    circle(this.x, this.y, 3);
  }
}

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  background(0);

  if (mouseIsPressed) {
    fireworks.push(new Firework(mouseX,mouseY,10, 300));
  }

  for (let i = fireworks.length-1; i > 0; i--) {
    fireworks[i].update();
    if (fireworks[i].isExploded()) {
      fireworks.splice(i, 1);
      continue;
    }
    fireworks[i].draw();
  }
  
  for (let i = sparks.length-1; i > 0; i--) {
    sparks[i].update();
    if (sparks[i].destroy()) {
      sparks.splice(i, 1);
      continue;
    }
    sparks[i].draw();
  }
}

function mouseClicked() {
  
}