let gav = 0.5

let ballCount = 999
let bouncerCount = 999

class Bouncer {
  constructor(vx, vy, x, y) {
    this.vx   = vx
    this.vy   = vy
    this.x    = x
    this.y    = y
    this.r    = 50
  }

  applyPhysics() {
    if (this.x >= width - this.r) {
      this.vx *= -1;
      this.x = width - this.r;
    }
    
    if (this.x <= 0 + this.r) {
      this.vx *= -1;
      this.x = 0 + this.r;
    }
    
    if (this.y >= height - this.r) {
      this.vy *= -1;
      this.y = height - this.r;
    }
  
    if (this.y <= 0 + this.r) {
      this.vy *= -1;
      this.v = 0 + this.r;
    }

    this.x += this.vx
    this.y += this.vy
  }
}

class Ball {
  constructor(vx, vy, x, y) {
    this.vx   = vx
    this.vy   = vy
    this.x    = x
    this.y    = y
    this.r    = 30
  }

  applyPhysics() {
    if (this.x >= width - this.r) {
      this.vx *= -.75;
      this.x = width - this.r;
    }
    
    if (this.x <= 0 + this.r) {
      this.vx *= -.75;
      this.x = 0 + this.r;
    }
    
    if (this.y >= height - this.r) {
      this.vy *= -.8;
      this.y = height - this.r;
    }
  
    if (this.y <= 0 + this.r) {
      this.vy *= -.8;
      this.v = 0 + this.r;
    }
    
    this.vy += gav
    this.x += this.vx
    this.y += this.vy
  }
}

const ballArray = [];
const bouncerArray = [];

for (let i = 0; i < ballCount; i++) {
  let multiplier = (i+1)/ballCount;
  ballArray.push(new Ball(-100*multiplier,100*multiplier,399,1));
}

for (let i = 0; i < bouncerCount; i++) {
  let multiplier = (i+1)/bouncerCount;
  bouncerArray.push(new Bouncer(-13*multiplier,10*multiplier,399,400*multiplier));
}

async function setup() {
  createCanvas(800, 600);
  ballImg = await loadImage('gaster.webp');
  bgImg = await loadImage('gasterbg.jpg');
  bouncerImg = await loadImage('gasterCar.jpg');
  imageMode(CENTER);
}

function draw() {
  image(bgImg,width/2,height/2,width,height);

  for (const ball of ballArray) {
    ball.applyPhysics();
    image(ballImg,ball.x,ball.y,ball.r*2,ball.r*2)
  }

  for (const bouncer of bouncerArray) {
    bouncer.applyPhysics();
    image(bouncerImg,bouncer.x,bouncer.y,bouncer.r*2,bouncer.r*2)
  }
}