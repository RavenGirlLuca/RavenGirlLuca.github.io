// Traffic Light Starter Code
// Your Name Here
// The Date Here

// GOAL: make a 'traffic light' simulator. For now, just have the light
// changing according to time. You may want to investigate the millis()
// function at https://p5js.org/reference/#/p5/millis

let state = "GREEN";

let startMillis = 0;
let currentMillis = 0;
let endMillis = 3000;

async function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(255);
  drawOutlineOfLights();
  updateLights();
  drawLights();
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width/2, height/2, 75, 200, 10);

  //lights
  fill("GREY");
  ellipse(width/2, height/2 - 65, 50, 50); //top
  ellipse(width/2, height/2, 50, 50); //middle
  ellipse(width/2, height/2 + 65, 50, 50); //bottom
}

function updateLights() {
  if (currentMillis >= endMillis) {
    startMillis = millis();
    currentMillis = 0;

    if (state === "GREEN") {
      state = "YELLOW";
      endMillis = 2000;
    }
    else if (state === "YELLOW") {
      state = "RED";
      endMillis = 4000;
    }
    else if (state === "RED") {
      state = "GREEN";
      endMillis = 3000;
    }
  }
  currentMillis = millis() - startMillis;
  console.log(currentMillis);
}

function drawLights() {
  if (state === "GREEN") {
    fill("GREEN");
    ellipse(width/2, height/2 + 65, 50, 50); //bottom
  }

  if (state === "YELLOW") {
    fill("YELLOW");
    ellipse(width/2, height/2, 50, 50); //middle
  }

  if (state === "RED") {
    fill("RED");
    ellipse(width/2, height/2 - 65, 50, 50); //top
  }
}