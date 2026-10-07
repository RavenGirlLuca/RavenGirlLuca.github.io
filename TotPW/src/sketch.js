// Tower of the Prismatic Witch
// Luca Kuin :3
// Sept 27, 26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

async function setup() {
  let { w, h } = calculateCanvasSize();
  createCanvas(w, h);

  loadImages();
}

function draw() {
  background('black');

  image(felosBulletBlank,50,50)
}
