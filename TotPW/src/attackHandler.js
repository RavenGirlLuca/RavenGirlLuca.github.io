let currentAttackIndex = 0;
let currentAttackLoop  = 0;
let currentAttackFrame = 0;

async function loadBattle(battleJSON) {
  enemyName   = battleJSON.name;
  enemySprite = await loadImage(battleJSON.sprite);
  enemyMusic  = battleJSON.music;
  enemyBG     = battleJSON.background;
}

function updateBattle(battleJSON) {
  if (currentAttackFrame >= battleJSON.difs[player.dif - 1].attacks[currentAttackIndex].framesPerLoop) {
    console.log("WORKING");
    currentAttackFrame = 0;
  }
  currentAttackFrame++;
}