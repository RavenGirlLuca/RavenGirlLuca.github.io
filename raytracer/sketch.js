// Raycaster
// Luca
// Iono
//
// Extra for Experts:
// Made a working 3d raycaster

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  loadPathfindingGrid();
  testImage = await loadImage('/TotPW/src/assets/felos.gif');
  finder = new PF.AStarFinder({ allowDiagonal: true, dontCrossCorners: true });

  loadEnemy(testImage, 'melee', 160, 160, 0.75, 60, 48, 15, 75);
  loadEnemy(testImage, 'ranged', 160, 160, 0.75, 120, 48, 10, 50);

  player = new Player(100,100);
}

function draw() {
  background(147, 168, 172);
  updateEnemies();
  player.update();

  player.draw();
  billboards = [];

  let fps = Math.floor(frameRate());
  text(fps, 50, 50);
}
