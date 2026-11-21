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
  testImage = await loadImage('/raytracer/assets/bee-bees.gif');
  finder = new PF.AStarFinder({ allowDiagonal: true, dontCrossCorners: true });
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
    textSize(96);
    text('CLICK TO SPAWN', width/2, height/2);

    textSize(32);
    text('W/S TO MOVE', width/2, height/2 + 100);
    text('Q/E TO STRAFE', width/2, height/2 + 140);
    text('A/D TO TURN', width/2, height/2 + 180);
    text('LEFT MOUSE TO SHOOT', width/2, height/2 + 220);
    text('FIND THE PURPLE CUBE', width/2, height/2 + 260);
  }
  else if (state === 'DEAD') {
    background(0, 0, 0);
    fill('WHITE');
    textSize(96);
    text('CLICK TO RESPAWN', width/2, height/2);
  }
  else if (state === 'END') {
    background(0, 0, 0);
    fill('WHITE');
    textSize(96);
    text('YAY U WON!!!', width/2, height/2);
  }
}

function mouseClicked() {
  if (state === 'GAME') {
    shootAtEnemies();
  }
  else if (state === 'START') {
    player = new Player(0,0);
    player.loadLevel();
    state = 'GAME';
  }
  else if (state === 'DEAD') {
    player = new Player(0,0);
    player.loadLevel();
    state = 'GAME';
  }
}
