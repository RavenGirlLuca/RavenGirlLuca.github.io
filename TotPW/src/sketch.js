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
  await loadJSONs();

  loadData();
  buildLookupTable()
}

function draw() {
  background(0);

  if (state === 'START') {
    startMenu();
  }

  else if (state === 'DATAINPUT') {
    dataMenu();
  }

  else if (state === 'NAMEINPUT') {
    nameMenu();
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
    settingsMenu();
  }

  else if (state === 'LEVELMENU') {
    
  }

  else if (state === 'GAME') {
    updateBullets();
    player.update();

    drawGameBox();
    updateBattle(currentBattle);
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

  if (activeDialog) {
    drawDialog();
  }

  mouseIsClicked = false;
}

function mouseClicked() {
  mouseIsClicked = true;
}

function keyPressed() {
  if (state === 'DATAINPUT' || state === 'NAMEINPUT') {
    if (key === 'Backspace') {
      currentInputName = currentInputName.slice(0, -1);
    } 

    else if (key.length === 1) {
      currentInputName += key;
      currentInputName = currentInputName.toUpperCase();
    }
  }
  else if (!(state === 'START')){
    if (key === 'Escape') {
      state = 'MAINMENU';
      player.reset();
      bullets = [];
    }
  }

  if (activeDialog) {
    if (key === 'Enter') {
      updateDialog();
    }
  }
}

