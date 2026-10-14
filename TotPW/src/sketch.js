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

  loadData();
}

function draw() {
  background(0);

  if (state === 'START') {
    startMenu();
  }

  else if (state === 'DATAINPUT') {
    dataMenu();
  }

  else if (state === 'MAINMENU') {
    mainMenu();
  }

  else if (state === 'DIFMENU') {
    diffMenu();
  }
  
  else if (state === 'BONUSMENU') {
    
  }

  else if (state === 'OPTIONSMENU') {
    
  }

  else if (state === 'LEVELMENU') {
    
  }

  else if (state === 'MASLEVELMENU') {
    
  }

  else if (state === 'GAME') {
    attack();
    updateBullets();
    player.update();

    drawGameBox();
    drawStatMenu();
    drawEnemy();
    drawBullets();
    player.draw();
  }

  else if (state === 'DEAD') {
    deadMenu();
  }

  else {
    state = 'MAINMENU';
  }

  mouseIsClicked = false;
}

function mouseClicked() {
  mouseIsClicked = true;
}

function keyTyped() {
  if (state === 'DATAINPUT') {
    if (keyCode === 8) {
      currentInputName = currentInputName.pop();
      console.log('WORKING');
    } 

    else if (key.length === 1) {
      currentInputName += key;
    }
  }
}

