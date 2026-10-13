// Tower of the Prismatic Witch
// Luca Kuin :3
// Sept 27, 26
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

async function setup() {
  let { w, h } = calculateCanvasSize();
  createCanvas(w, h);

  noSmooth();

  await loadImages();
  await loadGIFs();
  await loadAudio();
  await loadFonts();
}

function draw() {
  background(0);

  if (state === 'START') {
    startMenu();
  }

  if (state === 'MAINMENU') {
    mainMenu();
  }

  if (state === 'DIFMENU') {
    diffMenu();
  }
  
  if (state === 'BONUSMENU') {
    
  }

  if (state === 'OPTIONSMENU') {
    
  }

  if (state === 'LEVELMENU') {
    
  }

  if (state === 'MASLEVELMENU') {
    
  }

  if (state === 'GAME') {
    attack();
    updateBullets();
    player.update();

    drawGameBox();
    drawStatMenu();
    drawEnemy();
    drawBullets();
    player.draw();
  }

  if (state === 'DEAD') {
    deadMenu();
  }

  mouseIsClicked = false;
}

function mouseClicked() {
  mouseIsClicked = true;
}
