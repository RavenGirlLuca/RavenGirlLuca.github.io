// Insert Cool Demo Name
let x  = 0;
let y  = 0;
let w  = 100;
let h  = 200;
let s  = 20;
let state = "right";

async function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  updateSquare();
  drawSquare();
}

function updateSquare() {
  if (state === "right") {
    x += s;
    if (x + w >= width) {
      state = "down";
    }
  }

  if (state === "down") {
    y += s;
    if (y + h >= height) {
      state = "left";
    }
  }

  if (state === "left") {
    x -= s;
    if (x < 0) {
      state = "up";
    }
  }

  if (state === "up") {
    y -= s;
    if (y < 0) {
      state = "right";
    }
  }
}

function drawSquare() {
  rect(x,y,w,h);
}