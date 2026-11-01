// Tower of the Prismatic Witch
// Luca Kuin :3
// Sept 27, 26
//
// Extra for Experts:
// Full modding engine with a Open Database

async function setup() {
  let { w, h } = calculateCanvasSize();
  createCanvas(w, h);

  noSmooth();

  await loadImages();
  await loadGIFs();
  await loadAudio();
  await loadFonts();
  await loadJSONs();
  await loadObjects();

  await loadDatabase();

  loadData();
  buildLookupTable();
  player.getSprite();
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
    bonusMenu();
  }

  else if (state === 'OPTIONSMENU') {
    settingsMenu();
  }

  else if (state === 'LEVELMENU') {
    
  }

  else if (state === 'MODMENU') {
    modMenu();
  }

  else if (state === 'DATABASEMENU') {
    databaseMenu();
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
      fileInput.hide();
      bullets = [];
    }
  }

  if (activeDialog) {
    if (key === 'Enter') {
      updateDialog();
    }
  }
}

