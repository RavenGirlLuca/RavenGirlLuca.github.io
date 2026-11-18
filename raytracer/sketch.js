// Raycaster
// Luca
// Iono
//
// Extra for Experts:
// Made a working 3d raycaster

let state = 'START';

async function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textAlign(CENTER);
  textSize(96);
  loadPathfindingGrid();
  testImage = await loadImage('/raytracer/assets/bee-bees.gif');
  finder = new PF.AStarFinder({ allowDiagonal: true, dontCrossCorners: true });

  for (let i = 0; i < 100; i++) {
    loadEnemy(testImage, 'melee', 250, 250, random(0.2,1), 60, random(24, 86), 1, 75);
  }
}

function draw() {
  if (state === 'GAME') {
    background(147, 168, 172);
    updateEnemies();
    player.update();

    player.draw();
    billboards = [];
  }
  else if (state === 'START') {
    background(0, 0, 0);
    fill('WHITE');
    text('CLICK TO SPAWN', width/2, height/2);
  }
  else if (state === 'DEAD') {
    background(0, 0, 0);
    fill('WHITE');
    text('CLICK TO RESPAWN', width/2, height/2);
  }
}

function mouseClicked() {
  if (state === 'GAME') {
    shootAtEnemies();
  }
  else if (state === 'START') {
    state = 'GAME';
    player = new Player(100,100);
  }
  else if (state === 'DEAD') {
    state = 'GAME';
    player = new Player(100,100);
  }
}
