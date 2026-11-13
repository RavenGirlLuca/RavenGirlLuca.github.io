// Project Title
// Your Name
// Date
//
// Extra for Experts:
// Made a working 3d raycaster

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  loadPathfindingGrid();
  await testAddBillboard();

  player = new Player(100,100);
}

function draw() {
  background(147, 168, 172);
  player.update();

  player.draw();

  let fps = Math.floor(frameRate());
  text(fps, 50, 50);
}
