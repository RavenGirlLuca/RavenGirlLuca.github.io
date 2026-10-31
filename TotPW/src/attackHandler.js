async function loadBattle(battleJSON) {
  enemyName   = battleJSON.name;
  enemySprite = imageLookupTable[battleJSON.sprite];
  enemyMusic  = musicLookupTable[battleJSON.music];
  enemyBG     = battleJSON.background;
  if (battleJSON.hasDialog) {
    isDialogEndBattle = false;
    activeDialog = true;
    currentDialog = battleJSON.startDialog;
    currentDialogName = battleJSON.textName;
    currentDialogProfile = imageLookupTable[battleJSON.faceSprite];
  }
  else {
    activeDialog = false;
  }
}

function updateBattle(battleJSON) {
  if (!activeDialog) {
    if (currentAttackFrame >= battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].framesPerLoop) {
      if (currentAttackLoop + 1 <= battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].totalLoops) {
        for (let i = 0; i < battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets.length; i++) {
          spawnBullets(
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].bulletType,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].type,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].amount,
            imageLookupTable[battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].image],
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].x1,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].y1,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].x2,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].y2,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].sdist,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].vel,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].minAng,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].maxAng,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].siz,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].curve,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].paramater1,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].paramater2,
            battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].bullets[i].paramater3,
            currentAttackLoop
          );
        }

        if (currentAttackLoop % 2 === 0) {
          for (let i = 0; i < battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets.length; i++) {
            spawnBullets(
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].bulletType,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].type,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].amount,
              imageLookupTable[battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].image],
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].x1,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].y1,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].x2,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].y2,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].sdist,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].vel,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].minAng,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].maxAng,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].siz,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].curve,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].paramater1,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].paramater2,
              battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].altBullets[i].paramater3,
              currentAttackLoop
            );
          }
        }
      }

      if (currentAttackLoop + 1 >= battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].totalLoops + battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].emptyLoops ) {
        if (battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].clearBullets) {
          bullets = [];
        }
        currentAttackIndex++;
        currentAttackLoop = 0;
      }
      else currentAttackLoop++;

      currentAttackFrame = 0;

      if (currentAttackIndex >= battleJSON.difs[currentBattleDif].attacks.length) {
        endBattle(battleJSON);
        return;
      }
    }
    if ((!(currentAttackLoop + 1 <= battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].totalLoops))) {
      drawIndicatorGrid(battleJSON.difs[currentBattleDif].attacks[currentAttackIndex].indicators);
    }
    
    currentAttackFrame++;
  }
}

function endBattle(battleJSON) {
  isDialogEndBattle = true;
  activeDialog = true;
  currentDialog = battleJSON.endDialog;
  currentDialogName = battleJSON.textName;
  currentDialogProfile = imageLookupTable[battleJSON.faceSprite];
}

function endBattle2() {
  player.reset();
  state = 'MAINMENU';

  currentAttackFrame   = 0;
  currentAttackIndex   = 0;
  currentAttackLoop    = 0;

  bullets = [];
  enemyMusic.stop();
  menuMusic.start();
}