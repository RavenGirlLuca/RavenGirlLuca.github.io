async function loadBattle(battleJSON) {
  enemyName   = battleJSON.name;
  enemySprite = imageLookupTable[battleJSON.sprite];
  enemyMusic  = battleJSON.music;
  enemyBG     = battleJSON.background;
}

function updateBattle(battleJSON) {
  if (currentAttackFrame >= battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].framesPerLoop) {
    for (let i = 0; i < battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets.length; i++) {
      spawnBullets(
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].bulletType,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].type,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].amount,
        imageLookupTable[battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].image],
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].x1,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].y1,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].x2,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].y2,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].sdist,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].vel,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].minAng,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].maxAng,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].siz,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].curve,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].paramater1,
        battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].bullets[i].paramater2,
        currentAttackLoop
      );
    }

    if (currentAttackLoop % 2 === 0) {
      for (let i = 0; i < battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets.length; i++) {
        spawnBullets(
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].alrBullets[i].bulletType,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].type,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].amount,
          imageLookupTable[battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].image],
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].x1,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].y1,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].x2,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].y2,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].sdist,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].vel,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].minAng,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].maxAng,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].siz,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].curve,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].paramater1,
          battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].altBullets[i].paramater2,
          currentAttackLoop
        );
      }
    }

    if (currentAttackLoop + 1 >= battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].totalLoops) currentAttackIndex++;
    currentAttackLoop++;
    currentAttackFrame = 0;
  }
  currentAttackFrame++;
}